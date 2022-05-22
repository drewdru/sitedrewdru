import { validateUserSchema } from "../users/users.validation";
/**
 * @openapi
 * /checkUserSchema:
 *    get:
 *      summary: Returns user object validation.
 *      description: Validate POST body as user object.
 *      security:
 *        - BearerAuth: [admin]
 *      parameters:
 *       - in: query
 *         name: name
 *         schema:
 *          type: string
 *         example: John Doe
 *       - in: query
 *         name: age
 *         schema:
 *           type: number
 *         example: 25
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         format: email
 *         example: example@example.com
 *       - in: query
 *         name: website
 *         schema:
 *           type: string
 *         format: url
 *         example: https://example.com
 *       - in: query
 *         name: createdOn
 *         schema:
 *           type: string
 *         format: date
 *         example: 2020-01-01
 *      responses:
 *        200:
 *          description: Returns is validated.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  isValid:
 *                    type: boolean
 */
export default defineEventHandler(async (event) => {
  await validateUserSchema(event);
  return { isValid: true };
});
