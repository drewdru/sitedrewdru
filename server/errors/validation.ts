import { H3Error } from "h3";

export class ValidationError extends H3Error {
  constructor(errors) {
    super("Validation error");
    this.statusMessage = "Validation error";
    this.statusCode = 400;
    this.data = { errors };
  }
}
