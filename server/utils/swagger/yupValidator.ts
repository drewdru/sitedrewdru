import { sendError } from "h3";
import { ValidationError } from "./errors";
import { ISwaggerSchema, DescriptorMethodType } from "./swagger.types";

export const yupValidator = (schema: ISwaggerSchema) => {
  return (
    _target: any,
    _propertyName: string,
    descriptor: TypedPropertyDescriptor<DescriptorMethodType>
  ) => {
    // Add parametrs for swagger register
    _target[schema.route] = _target[schema.route] || [];
    _target[schema.route].push({ schema, classMethodName: _propertyName });

    const method = descriptor.value!;
    const abortEarly = schema.validate.abortEarly
      ? schema.validate.abortEarly
      : false;

    descriptor.value = async function (...args: any[]) {
      try {
        // TODO: validate security
        // console.log(args[0].req.user);
        // if (schema.validate.roles) {
        //   schema.validate.roles.contains(args[0].req.user.role)
        // }
        await validatePath(schema, args[0].req, abortEarly);

        const body = await validateBody(schema, args[0].req, abortEarly);
        if (body) {
          args[0].req.context.body = body;
        }

        const query = await validateQuery(schema, args[0].req, abortEarly);
        if (query) {
          args[0].req.context.query = query;
        }
      } catch (error) {
        return sendError(
          args[0],
          error.statusCode ? error : new ValidationError(error.errors)
        );
      }
      return await applyMethod(method, this, args, schema);
    };
  };
};

const applyMethod = async (
  method: DescriptorMethodType,
  context: any,
  args: any[],
  schema: ISwaggerSchema
) => {
  const responseCast = (schema?.responses || []).find(
    (item) => item.cast === true
  );
  if (responseCast) {
    const response = await method.apply(context, args);
    // TODO: set status
    // event.res.statusCode = responseCast.status;
    return responseCast.schema.cast(response, {
      stripUnknown: responseCast.stripUnknown ?? true,
    });
  }
  return method.apply(context, args);
};

const validatePath = async (
  schema: ISwaggerSchema,
  req: any,
  abortEarly: boolean
) => {
  if (!schema?.validate?.path) {
    return;
  }
  const params = req.context.params;
  if (!params) {
    throw new ValidationError(["No path params found"]);
  }
  await schema.validate.path.validate(params, { abortEarly });
};

const validateBody = async (
  schema: ISwaggerSchema,
  req: any,
  abortEarly: boolean
) => {
  if (!schema?.validate?.body) {
    return;
  }
  const body = await useBody(req);
  if (!body) {
    throw new ValidationError(["No body found"]);
  }
  return await schema.validate.body.validate(body, { abortEarly });
};

const validateQuery = async (
  schema: ISwaggerSchema,
  req: any,
  abortEarly: boolean
) => {
  if (!schema?.validate?.query) {
    return;
  }
  const query = useQuery(req);
  if (!query) {
    return;
  }
  return await schema.validate.query.validate(query, { abortEarly });
};
