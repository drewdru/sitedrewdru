import { CompatibilityEvent } from "h3";
import { swaggerRegister, yupValidator } from "../../utils/swagger";
import { createUserSchema, responseUserSchema } from "./users.schemas";
import User from "./users.model";

@swaggerRegister("/users")
class CreateUser {
  @yupValidator({
    route: "/",
    method: "post",
    validate: { body: createUserSchema },
    // TODO: add Responses
    // TODO: add security
    /*
     *      responses:
     *        200:
     *          description: Returns is validated.
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  user:
     *                    type: object
     *        400:
     *          description: Validation error.
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  statusCode:
     *                    type: integer
     *                    example: 400
     *                  statusMessage:
     *                    type: string
     *                    example: Validation error
     *                  data:
     *                    type: object
     *                    properties:
     *                      errors:
     *                        type: array
     *                        items:
     *                          type: string
     */
  })
  static async handler(event: CompatibilityEvent) {
    const body = await useBody(event.req);

    let user = await User.findOne({ email: body.email });
    if (!user) {
      body.username = body.username || body.email;
      user = await User.create(body);
    }

    return responseUserSchema.cast(user, { stripUnknown: true });
  }
}

export default defineEventHandler(CreateUser.handler);
