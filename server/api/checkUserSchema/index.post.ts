import { validateUserSchema } from "../users/users.validation";
/**
 * @openapi
 * /checkUserSchema:
 *    post:
 *      summary: Returns user object validation.
 *      description: Validate POST body as user object.
 *      security:
 *        - BearerAuth: [admin]
 *      requestBody:
 *        description: Validate POST body as user object.
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: [name, age, email]
 *              properties:
 *                name:
 *                 type: string
 *                 example: John Doe
 *                age:
 *                  type: number
 *                  example: 25
 *                email:
 *                  type: string
 *                  format: email
 *                  example: example@example.com
 *                website:
 *                  type: string
 *                  format: url
 *                  example: https://example.com
 *                createdOn:
 *                  type: string
 *                  format: date
 *                  example: 2020-01-01
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
export default defineEventHandler(async (event) => {
  const userBody = await validateUserSchema(event);
  return { user: userBody };
});
