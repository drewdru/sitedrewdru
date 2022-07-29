import * as yupToOpenAPIPkg from "@rudi23/yup-to-openapi";
import type { SchemaObject } from "openapi3-ts";
import type { BaseSchema } from "yup";
import { prettifyTagName } from "./formatters";
import { ENDPOINTS } from "./swagger";
import {
  ParametsIn,
  SwaggerVersions,
  ISwaggerOptions,
  ISwaggerOptionsPaths,
  ISwaggerRequestBody,
  ISwaggerResponses,
  ISwaggerSchemaResponse,
} from "./swagger.types";

const yupToOpenAPI = yupToOpenAPIPkg.default.default;

export const generateJSONDoc = (options: ISwaggerOptions) => {
  options.openapi = SwaggerVersions.latest;
  const paths: ISwaggerOptionsPaths = {};
  for (const endpoint of ENDPOINTS) {
    const path = `${options.prefix}${endpoint.path}`;
    if (!(path in paths)) {
      paths[path] = {};
    }

    // TODO: get security parameters
    const responses = getResponses(endpoint.schema.responses);
    const requestBody = getBodyParametrs(endpoint.schema.validate?.body);
    const pathParametrs = getQueryParametrs(
      endpoint.schema.validate?.path,
      ParametsIn.PATH
    );
    const queryParametrs = getQueryParametrs(
      endpoint.schema.validate?.query,
      ParametsIn.QUERY
    );
    const parameters = [...pathParametrs, ...queryParametrs];

    paths[path][endpoint.schema.method] = {
      parameters,
      responses,
      summary: endpoint.schema.summary,
      description: endpoint.schema.description,
      tags: [prettifyTagName(endpoint.tag)],
    };

    if (requestBody) {
      paths[path][endpoint.schema.method].requestBody = requestBody;
    }
    if (endpoint.schema?.validate?.roles?.length > 0) {
      paths[path][endpoint.schema.method].security = [
        { BearerAuth: endpoint.schema.validate.roles },
      ];
    }
  }
  options.paths = paths;
  return options;
};

const getQueryParametrs = (schema: BaseSchema, parametsIn: ParametsIn) => {
  if (!schema) {
    return [];
  }
  const swaggerDefinition: SchemaObject = yupToOpenAPI(schema);
  const parameters = [];
  for (const [key, data] of Object.entries(swaggerDefinition.properties)) {
    const schema = data as any;
    if (schema.pattern) {
      schema.pattern = schema.pattern.slice(1, -1);
    }
    parameters.push({
      in: parametsIn,
      name: key,
      schema,
      required: (swaggerDefinition.required || []).includes(key),
    });
  }
  return parameters;
};

const fixPropertiesPattern = (properties: SchemaObject) => {
  const result: SchemaObject = {};
  for (const [key, data] of Object.entries(properties)) {
    const schema = data;
    if (schema.pattern) {
      schema.pattern = schema.pattern.slice(1, -1);
    }
    result[key] = schema;
  }
  return result;
};

const getBodyParametrs = (schema: BaseSchema) => {
  if (!schema) {
    return;
  }
  const swaggerDefinition: SchemaObject = yupToOpenAPI(schema);
  let properties: SchemaObject | null = null;
  if (swaggerDefinition.properties) {
    properties = fixPropertiesPattern(swaggerDefinition.properties);
  }
  const items: any = swaggerDefinition.items;
  if (items) {
    items.properties = fixPropertiesPattern(items.properties);
  }
  const result: ISwaggerRequestBody = {
    content: {
      "application/json": {
        schema: {
          title: swaggerDefinition.title,
          description: swaggerDefinition.description,
          properties,
          items,
          type: swaggerDefinition.type,
          minItems: swaggerDefinition.minItems ?? null,
          maxItems: swaggerDefinition.maxItems ?? null,
          uniqueItems: swaggerDefinition.uniqueItems ?? null,
        },
      },
    },
  };
  return result;
};

const getResponses = (validatorResponses: ISwaggerSchemaResponse[]) => {
  const responses: ISwaggerResponses = {};
  if (!validatorResponses) {
    return responses;
  }
  for (const response of validatorResponses) {
    const swaggerDefinition = yupToOpenAPI(response.schema);
    responses[response.status] = {
      content: {
        "application/json": {
          title: swaggerDefinition.title,
          description: swaggerDefinition.description,
          schema: swaggerDefinition,
        },
      },
    };
  }
  return responses;
};
