import type { BaseSchema } from "yup";
import type { SchemaObject } from "openapi3-ts";
import { StatusCode } from "status-code-enum";

export enum ParametsIn {
  PATH = "path",
  QUERY = "query",
}

export enum SwaggerVersions {
  latest = "3.0.0",
}

export enum HttpMethods {
  get = "get",
  head = "head",
  connect = "connect",
  options = "options",
  trace = "trace",
  post = "post",
  put = "put",
  patch = "patch",
  delete = "delete",
}

export type DescriptorMethodType = (...args: any[]) => void;

export interface ISwaggerSchemaValidate {
  body?: BaseSchema;
  query?: BaseSchema;
  path?: BaseSchema;
  abortEarly?: boolean;
  roles?: string[];
}

export interface ISwaggerSchemaResponse {
  status: number;
  schema: BaseSchema;
  cast?: boolean;
  stripUnknown?: boolean;
}

export interface ISwaggerSchema {
  route: string;
  method: HttpMethods | string;
  validate?: ISwaggerSchemaValidate;
  summary?: string;
  description?: string;
  responses?: ISwaggerSchemaResponse[];
  // security?: any[];
  roles?: string[];
}

export interface ISwaggerEndpoints {
  path: string;
  schema: ISwaggerSchema;
  tag: string;
  methodTag: string;
}

export interface IRegisteredConstructor {
  [name: string]: any[];
}

export interface ISwaggerParameters {
  in: ParametsIn;
  name: string;
  schema: BaseSchema;
  required: boolean;
}

export interface ISwaggerRequestBodySchema {
  title: string;
  description: string;
  properties: SchemaObject;
  items: SchemaObject;
  type: string;
  minItems: number | null;
  maxItems: number | null;
  uniqueItems: boolean | null;
}

export interface ISwaggerRequestBody {
  description: string;
  content: {
    "application/json": {
      schema: ISwaggerRequestBodySchema;
    };
  };
}

export interface ISwaggerResponse {
  content: {
    "application/json": {
      title: string;
      description: string;
      schema: SchemaObject;
    };
  };
}

export type ISwaggerResponses = {
  [key in StatusCode]?: ISwaggerResponse;
};

export interface ISwaggerOptionsEndpointData {
  parameters?: ISwaggerParameters[];
  responses?: ISwaggerResponses;
  summary?: string;
  description?: string;
  tags?: string[];
  requestBody?: ISwaggerRequestBody;
  security?: [{ [key: string]: string[] }];
}

export interface ISwaggerApiServers {
  url: string;
  description?: string;
  variables?: any; // https://swagger.io/specification/#server-variable-object
}

export type ISwaggerOptionsPaths = {
  [key in HttpMethods]?: ISwaggerOptionsEndpointData;
};

export interface ISwaggerOptions {
  info: any; // https://swagger.io/specification/#info-object
  paths?: ISwaggerOptionsPaths;
  openapi?: SwaggerVersions;
  servers?: ISwaggerApiServers[];
  prefix?: string;
  schemes?: string[];
  components?: {
    securitySchemes: {
      [key: string]: {
        type: string;
        name: string;
        in: string;
        scheme?: string;
        bearerFormat?: string;
        flows?: any; // https://swagger.io/specification/#oauth-flows-object
        openIdConnectUrl?: string;
        description?: string;
      };
    };
  };
  security?: any[]; // https://swagger.io/specification/#security-requirement-object
  externalDocs?: {
    url: string;
    description?: string;
  };
  tags?: any[];
}
