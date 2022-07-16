import * as yupToOpenAPIPkg from "@rudi23/yup-to-openapi";
import { BaseSchema } from "yup";
const yupToOpenAPI = yupToOpenAPIPkg.default.default;
// TODO: fix types
export const ENDPOINTS: Array<{ [name: string]: any }> = [];

export const swaggerRegister = (basePath: string) => {
  return (constructor: { [name: string]: any[] }) => {
    for (const [pathPostfix, classEndpoints] of Object.entries(constructor)) {
      let path = `${basePath}${pathPostfix}`.replace(/\/$/, "");
      path = path.replace(/:([\W\w]*)/g, "{$1}");
      for (const parametrs of classEndpoints) {
        ENDPOINTS.push({
          path,
          schema: parametrs.schema,
          tag: constructor.name,
          methodTag: parametrs.classMethodName,
        });
      }
    }
  };
};

const capitalize = (text) =>
  (text && text[0].toUpperCase() + text.slice(1)) || "";

const camelcaseToText = (text) => text.replace(/([A-Z])/g, " $1");

const prettifyTagName = (tag) =>
  capitalize(camelcaseToText(tag.replace("Handler", "")));

enum ParametsIn {
  PATH = "path",
  QUERY = "query",
}

const getQueryParametrs = (schema: BaseSchema, parametsIn: ParametsIn) => {
  const swaggerDefinition = yupToOpenAPI(schema);
  // httpMethod.title = httpMethod.title || swaggerDefinition.title;
  // httpMethod.description =
  //   httpMethod.description || swaggerDefinition.description;
  const parameters = [];
  for (const [key] of Object.entries(swaggerDefinition.properties)) {
    const schema = swaggerDefinition.properties[key];
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

const getBodyParametrs = (schema: BaseSchema) => {
  const swaggerDefinition = yupToOpenAPI(schema);
  // httpMethod.title = httpMethod.title || swaggerDefinition.title;
  // httpMethod.description =
  //   httpMethod.description || swaggerDefinition.description;
  return {
    content: {
      "application/json": {
        schema: {
          type: swaggerDefinition.type,
          properties: swaggerDefinition.properties,
        },
      },
    },
  };
};

const getResponses = (schema: { status: number; schema: BaseSchema }[]) => {
  const responses = {};
  for (const response of schema) {
    const swaggerDefinition = yupToOpenAPI(response.schema);
    responses[response.status] = {
      content: {
        "application/json": {
          schema: swaggerDefinition,
        },
      },
    };
  }
  return responses;
};

// TODO: add interface ISwaggerOptions
// TODO: Refactoring: Ugly nested loops
export const generateJSONDoc = (options: any) => {
  // console.log(ENDPOINTS);
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
      requestBody,
      responses,
      title: endpoint.schema.summary,
      description: endpoint.schema.description,
      tags: [prettifyTagName(endpoint.tag)],
    };
  }
  options.paths = paths;
  return options;
};
