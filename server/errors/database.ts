import { H3Error } from "h3";

export class DatabaseError extends H3Error {
  constructor(databaseMessage = null) {
    super("Database error");
    this.statusMessage = "Database error";
    this.statusCode = 500;
    this.data = { errors: [databaseMessage] };
  }
}

export class DatabaseNotFoundError extends H3Error {
  constructor(message = null) {
    super(message || "Data not found");
    this.statusMessage = message || "Data not found";
    this.statusCode = 404;
  }
}
