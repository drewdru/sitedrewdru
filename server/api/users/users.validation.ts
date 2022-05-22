import { object, string, number, date } from "yup";
import { sendError } from "h3";
import { ValidationError } from "../../errors/validation";

export const userSchema = object({
  name: string().required(),
  age: number().required().positive().integer(),
  email: string().email(),
  website: string().url().nullable(),
  createdOn: date().default(() => new Date()),
});

export const validateUserSchema = async (event) => {
  try {
    const body = await useBody(event.req);
    if (!body) {
      throw new ValidationError(["No body found"]);
    }
    return await userSchema.validate(body);
  } catch (error) {
    sendError(
      event,
      error.statusCode ? error : new ValidationError(error.errors)
    );
  }
};
