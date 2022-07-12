import { CompatibilityEvent } from "h3";
import { validate } from "../../utils/validator";
import { swaggerRegister } from "../../utils/swagger";
import { paginateValidationSchema } from "../../helpers/schemas";
import IHandler from "../../helpers/handler";
import { responseUsersSchema } from "./users.schemas";
import User from "./users.model";

// TODO:  @Handler.register ?
@swaggerRegister("/users")
class GetUsers implements IHandler {
  // TODO: add decorator with swagger generation
  // @yup_swagger_validator({
  //   summary: "Get Users",
  //   description: "Get Users",
  //   security: [{ BearerAuth: ["admin"] }],
  //   validate: { query: paginateValidationSchema },
  //   responses: [
  //     { status: 200, schema: responseUsersSchema },
  //     validationErrorResponse,
  //     notFoundErrorResponse,
  //   ],
  // })
  @validate({
    route: "/",
    method: "get",
    validate: { query: paginateValidationSchema },
    summary: "Get Users",
    description: "Get Users",
    security: [{ BearerAuth: ["admin"] }],
    responses: [
      { status: 200, schema: responseUsersSchema },
      // validationErrorResponse,
      // notFoundErrorResponse,
    ],
  })
  static async handler(event: CompatibilityEvent) {
    const query = useQuery(event.req);

    const { filter, skip, limit, sort } = query;
    const users = await User.paginate({
      query: filter || {},
      page: skip || 1,
      limit: limit || 25,
      sort: sort || "-createdAt",
    });

    return responseUsersSchema.cast(users, { stripUnknown: true });
  }
}

/**
 * @openapi
 * /users:
 *    get:
 *      summary: Get Users.
 *      description: Get Users.
 *      security:
 *        - BearerAuth: [admin]
 *      parameters:
 *       - in: query
 *         name: page
 *         schema:
 *          type: number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         example: 25
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         example: -createdAt
 *      responses:
 *        200:
 *          description: Returns Paginated Users list.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  isValid:
 *                    type: boolean
 */
export default defineEventHandler(GetUsers.handler);
