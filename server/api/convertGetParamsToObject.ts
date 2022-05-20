import type { IncomingMessage, ServerResponse } from "http";
import { useQuery } from "h3";
/**
 * @openapi
 * /convertGetParamsToObject:
 *    get:
 *      summary: Returns a query parametrs as object.
 *      description: Convert GET params to object!
 *      security:
 *        - BearerAuth: [admin]
 *      parameters:
 *        - name: q
 *          in: query
 *          description: pass any GET parametrs.
 *          schema:
 *            type: string
 *            example: You can use many parametrs with any names
 *      responses:
 *        200:
 *          description: Returns GET parametrs as object.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  query:
 *                    type: object
 *                    example:
 *                      q: You can use many parametrs with any names
 */
export default /* async */ (req: IncomingMessage, _res: ServerResponse) => {
  return {
    query: useQuery(req),
  };
};
