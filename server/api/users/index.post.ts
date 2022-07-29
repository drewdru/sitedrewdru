import { CompatibilityEvent } from "h3";
import { createUserSchema, responseUserSchema } from "./users.schemas";
import User from "./users.model";
import { swaggerRegister, yupValidator } from "@/server/utils/swagger";

@swaggerRegister("/users")
class CreateUser {
  @yupValidator({
    route: "/",
    method: "post",
    validate: { body: createUserSchema },
    responses: [
      { status: 200, schema: responseUserSchema, cast: true },
      // validationErrorResponse, // status: 400
    ],
    // TODO: add security
  })
  static async handler(event: CompatibilityEvent) {
    const body = event.req.context.body;

    let user = await User.findOne({ email: body.email });
    if (!user) {
      body.username = body.username || body.email;
      user = await User.create(body);
    }

    return user;
  }
}

export default defineEventHandler(CreateUser.handler);
