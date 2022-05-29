import { object, string, number } from "yup";

// // accepts a valid UUID v4 string as id
export const ObjectId = string().matches(/^[0-9a-fA-F]{24}$/);

export const objectIdSchema = object({
  id: ObjectId.required(),
});

export const paginateValidationSchema = object({
  sort: string().default("-createdAt").optional(),
  page: number().moreThan(0).default(1).positive().optional(),
  limit: number().moreThan(0).default(25).positive().optional(),
  filter: string().optional(),
});
