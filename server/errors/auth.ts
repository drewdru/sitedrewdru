import { H3Error } from "h3";
import { StatusCode } from "status-code-enum";
import { getErrorSchema } from "@/server/helpers/schemas";

const UNAUTHORIZED = "Unauthorized";
// const WRONG_CREDENTIALS = "Your email or password is incorrect";

export class UnauthorizedError extends H3Error {
  static swaggerError = {
    status: StatusCode.ClientErrorUnauthorized,
    schema: getErrorSchema(
      UNAUTHORIZED,
      UNAUTHORIZED,
      StatusCode.ClientErrorUnauthorized
    ),
  };

  constructor(databaseMessage = UNAUTHORIZED) {
    super(UNAUTHORIZED);
    this.statusMessage = UNAUTHORIZED;
    this.statusCode = StatusCode.ClientErrorUnauthorized;
    this.data = { errors: [databaseMessage] };
  }
}
