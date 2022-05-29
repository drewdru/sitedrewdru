// import "reflect-metadata";
import { sendError } from "h3";
import { BaseSchema } from "yup";
import { ValidationError } from "../errors/validation";

export const validate = (schema: { body?: BaseSchema; query?: BaseSchema }) => {
  return (
    _target: any,
    _propertyName: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => void>
  ) => {
    const method = descriptor.value!;
    descriptor.value = async function (...args) {
      // console.log(target, _propertyName, descriptor, method);
      // console.log(Reflect.ownKeys(method));
      try {
        if (schema.body) {
          const body = await useBody(args[0].req);
          if (!body) {
            throw new ValidationError(["No body found"]);
          }
          args.push(await schema.body.validate(body, { abortEarly: false }));
        }
        if (schema.query) {
          const query = useQuery(args[0].req);
          if (!query) {
            return;
          }
          await schema.query.validate(query);
        }
      } catch (error) {
        sendError(
          args[0],
          error.statusCode ? error : new ValidationError(error.errors)
        );
      }
      return method.apply(this, args);
    };
  };
};
