import { CompatibilityEvent } from "h3";
import { validate } from "../../utils/validator";
import { createUserSchema, responseUserSchema } from "./users.schemas";
import User from "./users.model";

class CreateUser {
  @validate({ body: createUserSchema })
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

/**
 * @openapi
 * /users:
 *    post:
 *      summary: Create User.
 *      description: Create new User.
 *      security:
 *        - BearerAuth: [admin]
 *      requestBody:
 *        description: User object.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [firstName, lastName, email]
 *              properties:
 *                firstName:
 *                 type: string
 *                 example: John Doe
 *                lastName:
 *                 type: string
 *                 example: John Doe
 *                email:
 *                  type: string
 *                  format: email
 *                  example: example@example.com
 *                website:
 *                  type: string
 *                  format: url
 *                  example: https://example.com
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
export default defineEventHandler(CreateUser.handler);
