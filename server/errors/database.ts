import { H3Error } from "h3";
import { StatusCode } from "status-code-enum";
import { getErrorSchema } from "@/server/helpers/schemas";

const DATABASE_ERROR = "Database error";
const DATA_NOT_FOUND = "Data not found";

export class DatabaseError extends H3Error {
  static swaggerError = {
    status: StatusCode.ClientErrorBadRequest,
    schema: getErrorSchema(
      DATABASE_ERROR,
      DATABASE_ERROR,
      StatusCode.ServerErrorBandwidthLimitExceeded
    ),
  };

  constructor(databaseMessage = null) {
    super(DATABASE_ERROR);
    this.statusMessage = DATABASE_ERROR;
    this.statusCode = StatusCode.ServerErrorBandwidthLimitExceeded;
    this.data = { errors: [databaseMessage] };
  }
}

export class DatabaseNotFoundError extends H3Error {
  static swaggerError = {
    status: StatusCode.ClientErrorNotFound,
    schema: getErrorSchema(
      DATA_NOT_FOUND,
      DATA_NOT_FOUND,
      StatusCode.ClientErrorNotFound
    ),
  };

  constructor(message = null) {
    super(message || DATA_NOT_FOUND);
    this.statusMessage = message || DATA_NOT_FOUND;
    this.statusCode = StatusCode.ClientErrorNotFound;
  }
}
