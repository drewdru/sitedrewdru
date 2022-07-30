import * as yupToOpenAPIPkg from "@rudi23/yup-to-openapi";
import type { SchemaObject } from "openapi3-ts";
import type { BaseSchema } from "yup";
import {
  prettifyTagName,
  normolizeSwaggerContent,
  normolizeSchemaObject,
  formatSchemaPattern,
} from "./formatters";
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

const yupToOpenAPI = yupToOpenAPIPkg.default;

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
    parameters.push({
      in: parametsIn,
      name: key,
      schema: formatSchemaPattern(data),
      required: (swaggerDefinition.required || []).includes(key),
    });
  }
  return parameters;
};

const getBodyParametrs = (schema: BaseSchema) => {
  if (!schema) {
    return;
  }
  const swaggerDefinition: SchemaObject = yupToOpenAPI(schema);
  const { properties, items } = normolizeSchemaObject(swaggerDefinition);
  const result: ISwaggerRequestBody = {
    description: swaggerDefinition.description,
    content: normolizeSwaggerContent(swaggerDefinition, properties, items),
  };
  return result;
};

const getResponses = (validatorResponses: ISwaggerSchemaResponse[]) => {
  const responses: ISwaggerResponses = {};
  if (!validatorResponses) {
    return responses;
  }
  for (const response of validatorResponses) {
    if (response.schema === null) {
      responses[response.status] = {
        description: "Empty body",
        content: { "application/json": {} },
      };
      continue;
    }
    const swaggerDefinition: SchemaObject = yupToOpenAPI(response.schema);
    const { properties, items } = normolizeSchemaObject(swaggerDefinition);
    responses[response.status] = {
      description: swaggerDefinition.description,
      content: normolizeSwaggerContent(swaggerDefinition, properties, items),
    };
  }
  return responses;
};
