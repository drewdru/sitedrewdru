import { CompatibilityEvent } from "h3";
import { responseUsersSchema } from "./users.schemas";
import User from "./users.model";
import { paginateValidationSchema } from "@/server/helpers/schemas";
import { swaggerRegister, yupValidator } from "@/server/utils/swagger";

@swaggerRegister("/users")
class GetUsers {
  @yupValidator({
    route: "/",
    method: "get",
    summary: "Get Users",
    description: "Get Users",
    //   security: [{ BearerAuth: ["admin"] }],
    validate: { query: paginateValidationSchema, roles: ["admin"] },
    responses: [
      { status: 200, schema: responseUsersSchema, cast: true },
      // validationErrorResponse, // status: 400
      // notFoundErrorResponse, // status: 404
    ],
  })
  static async handler(event: CompatibilityEvent) {
    const query = event.req.context.query;

    const { filter, skip, limit, sort } = query;
    return await User.paginate({
      query: filter || {},
      page: skip || 1,
      limit: limit || 25,
      sort: sort || "-createdAt",
    });
  }
}

export default defineEventHandler(GetUsers.handler);
