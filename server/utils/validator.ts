// import "reflect-metadata";
import { sendError } from "h3";
import { BaseSchema } from "yup";
import { ValidationError } from "../errors/validation";

export const validate = (schema: {
  route: string;
  method: string;
  validate: {
    body?: BaseSchema;
    query?: BaseSchema;
    path?: BaseSchema;
    abortEarly?: boolean;
  };
  summary?: string;
  description?: string;
  responses?: Array<any>;
  security?: Array<any>;
}) => {
  return (
    _target: any,
    _propertyName: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => void>
  ) => {
    _target[schema.route] = _target[schema.route] || [];
    _target[schema.route].push({ schema, classMethodName: _propertyName });

    const method = descriptor.value!;
    const abortEarly = schema.validate.abortEarly
      ? schema.validate.abortEarly
      : false;
    descriptor.value = async function (...args) {
      try {
        // TODO: validate security
        if (schema.validate.path) {
          const params = args[0].req.context.params;
          if (!params) {
            throw new ValidationError(["No path params found"]);
          }
          await schema.validate.path.validate(params, { abortEarly });
        }
        if (schema.validate.body) {
          const body = await useBody(args[0].req);
          if (!body) {
            throw new ValidationError(["No body found"]);
          }
          args[0].req.context.body = await schema.validate.body.validate(body, {
            abortEarly,
          });
        }
        if (schema.validate.query) {
          const query = useQuery(args[0].req);
          if (!query) {
            return;
          }
          args[0].req.context.query = await schema.validate.query.validate(
            query
          );
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
