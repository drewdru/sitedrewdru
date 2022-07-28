// eslint-disable-next-line import/named
import { BaseSchema } from "yup";

interface ISwaggerSchemaValidate {
  body?: BaseSchema;
  query?: BaseSchema;
  path?: BaseSchema;
  abortEarly?: boolean;
  roles?: Array<string>;
}

interface ISwaggerSchemaResponse {
  status: number;
  schema: BaseSchema;
  cast?: boolean;
  stripUnknown?: boolean;
}

export interface ISwaggerSchema {
  route: string;
  method: string;
  validate: ISwaggerSchemaValidate;
  summary?: string;
  description?: string;
  responses?: Array<ISwaggerSchemaResponse>;
  // security?: Array<any>;
  roles?: Array<string>;
}
