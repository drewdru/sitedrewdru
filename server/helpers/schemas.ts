import { array, object, string, number } from "yup";

// accepts a valid UUID v4 string as id
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

export const atLeastOneKey = () => {
  return {
    name: "atLeastOneKey",
    // eslint-disable-next-line no-template-curly-in-string
    message: "${path} object must have at least one key",
    exclusive: true,
    test: (value, data) => {
      return (
        value == null ||
        Object.keys(data.originalValue).some((key) => value[key] != null)
      );
    },
  };
};

export const getErrorSchema = (title, description, statusCode) => {
  return object({
    statusCode: number().default(statusCode),
    statusMessage: string().default(title),
    data: object({ errors: array().of(string()) }),
  }).meta({
    title,
    description,
  });
};
