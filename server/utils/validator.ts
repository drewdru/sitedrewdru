// import "reflect-metadata";
import { sendError } from "h3";
import { BaseSchema } from "yup";
import { ValidationError } from "../errors/validation";

export const validate = (schema: {
  body?: BaseSchema;
  query?: BaseSchema;
  path?: BaseSchema;
  abortEarly?: boolean;
}) => {
  return (
    _target: any,
    _propertyName: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => void>
  ) => {
    const method = descriptor.value!;
    const abortEarly = schema.abortEarly ? schema.abortEarly : false;
    descriptor.value = async function (...args) {
      try {
        if (schema.path) {
          const params = args[0].req.context.params;
          if (!params) {
            throw new ValidationError(["No path params found"]);
          }
          await schema.path.validate(params, { abortEarly });
        }
        if (schema.body) {
          const body = await useBody(args[0].req);
          if (!body) {
            throw new ValidationError(["No body found"]);
          }
          args[0].req.context.body = await schema.body.validate(body, {
            abortEarly,
          });
        }
        if (schema.query) {
          const query = useQuery(args[0].req);
          if (!query) {
            return;
          }
          args[0].req.context.query = await schema.query.validate(query);
        }
      } catch (error) {
        return sendError(
          args[0],
          error.statusCode ? error : new ValidationError(error.errors)
        );
      }
      return method.apply(this, args);
    };
  };
};
