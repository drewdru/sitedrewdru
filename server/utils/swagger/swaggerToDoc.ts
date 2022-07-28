import * as yupToOpenAPIPkg from "@rudi23/yup-to-openapi";
import { BaseSchema } from "yup";
import { prettifyTagName } from "./formatters";
import { ENDPOINTS } from "./swagger";

const yupToOpenAPI = yupToOpenAPIPkg.default.default;

enum ParametsIn {
  PATH = "path",
  QUERY = "query",
}

// TODO: add interface ISwaggerOptions
export const generateJSONDoc = (options: any) => {
  const paths = {};
  for (const endpoint of ENDPOINTS) {
    const path = `${options.prefix}${endpoint.path}`;
    let parameters = [];
    let requestBody = {};
    // TODO: add security parameters
    const responses = getResponses(endpoint.schema?.responses || []);
    if (endpoint.schema?.validate?.path) {
      const queryParametrs = getQueryParametrs(
        endpoint.schema.validate.path,
        ParametsIn.PATH
      );
      parameters = [...parameters, ...queryParametrs];
    }
    if (endpoint.schema?.validate?.query) {
      const queryParametrs = getQueryParametrs(
        endpoint.schema.validate.query,
        ParametsIn.QUERY
      );
      parameters = [...parameters, ...queryParametrs];
    }
    if (endpoint.schema?.validate?.body) {
      requestBody = getBodyParametrs(endpoint.schema.validate.body);
    }
    if (!(path in paths)) {
      paths[path] = {};
    }

    paths[path][endpoint.schema.method] = {
      parameters,
      responses,
      summary: endpoint.schema.summary,
      description: endpoint.schema.description,
      tags: [prettifyTagName(endpoint.tag)],
    };

    if (Object.keys(requestBody).length !== 0) {
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
  const swaggerDefinition = yupToOpenAPI(schema);
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

const fixPropertiesPatern = (properties: any) => {
  const result: { [k: string]: any } = {};
  for (const [key, data] of Object.entries(properties)) {
    const schema = data as any;
    if (schema.pattern) {
      schema.pattern = schema.pattern.slice(1, -1);
    }
    result[key] = schema;
  }
  return result;
};

const getBodyParametrs = (schema: BaseSchema) => {
  const swaggerDefinition = yupToOpenAPI(schema);
  let properties: { [k: string]: any } | null = null;
  if (swaggerDefinition.properties) {
    properties = fixPropertiesPatern(swaggerDefinition.properties);
  }
  const items = swaggerDefinition.items;
  if (items) {
    items.properties = fixPropertiesPatern(swaggerDefinition.items.properties);
  }
  const result = {
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

const getResponses = (schema: { status: number; schema: BaseSchema }[]) => {
  const responses = {};
  for (const response of schema) {
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
