import { H3Error } from "h3";
import { array, object, string, number } from "yup";
import { StatusCode } from "status-code-enum";

const DATABASE_ERROR = "Database error";
const DATA_NOT_FOUND = "Data not found";

export const DatabaseErrorSchema = object({
  statusCode: number().default(StatusCode.ServerErrorBandwidthLimitExceeded),
  statusMessage: string().default(DATABASE_ERROR),
  data: object({ errors: array().of(string()) }),
}).meta({
  title: DATABASE_ERROR,
  description: DATABASE_ERROR,
});

export class DatabaseError extends H3Error {
  static swaggerError = {
    status: StatusCode.ClientErrorBadRequest,
    schema: DatabaseErrorSchema,
  };

  constructor(databaseMessage = null) {
    super(DATABASE_ERROR);
    this.statusMessage = DATABASE_ERROR;
    this.statusCode = StatusCode.ServerErrorBandwidthLimitExceeded;
    this.data = { errors: [databaseMessage] };
  }
}

export const DatabaseNotFoundErrorSchema = object({
  statusCode: number().default(StatusCode.ClientErrorBadRequest),
  statusMessage: string().default(DATA_NOT_FOUND),
  data: object({ errors: array().of(string()) }),
}).meta({
  title: DATA_NOT_FOUND,
  description: DATA_NOT_FOUND,
});

export class DatabaseNotFoundError extends H3Error {
  static swaggerError = {
    status: StatusCode.ClientErrorNotFound,
    schema: DatabaseNotFoundErrorSchema,
  };

  constructor(message = null) {
    super(message || DATA_NOT_FOUND);
    this.statusMessage = message || DATA_NOT_FOUND;
    this.statusCode = StatusCode.ClientErrorNotFound;
  }
}
