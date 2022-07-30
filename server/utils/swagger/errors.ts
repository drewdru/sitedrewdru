import { H3Error } from "h3";
import { array, object, string, number } from "yup";
import { StatusCode } from "status-code-enum";

const VALIDATION_ERROR = "Validation error";

export class ValidationError extends H3Error {
  static swaggerError = {
    status: StatusCode.ClientErrorBadRequest,
    schema: object({
      statusCode: number().default(StatusCode.ClientErrorBadRequest),
      statusMessage: string().default(VALIDATION_ERROR),
      data: object({ errors: array().of(string()) }),
    }).meta({
      title: VALIDATION_ERROR,
      description: VALIDATION_ERROR,
    }),
  };

  constructor(errors) {
    super(VALIDATION_ERROR);
    this.statusMessage = VALIDATION_ERROR;
    this.statusCode = StatusCode.ClientErrorBadRequest;
    this.data = { errors };
  }
}
