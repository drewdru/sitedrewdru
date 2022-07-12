import * as yupToOpenAPIPkg from "@rudi23/yup-to-openapi";
const yupToOpenAPI = yupToOpenAPIPkg.default.default;

export const REGISTRY: { [name: string]: any } = {};

export const swaggerRegister = (basePath) => {
  return (constructor) => {
    REGISTRY[constructor.name] = { basePath, constructor };
  };
};

const capitalize = (text) =>
  (text && text[0].toUpperCase() + text.slice(1)) || "";
const camelcaseToText = (text) => text.replace(/([A-Z])/g, " $1");
const prettifyTagName = (tag) =>
  capitalize(camelcaseToText(tag.replace("Handler", "")));

// TODO: add interface ISwaggerOptions
// TODO: Refactoring: Ugly nested loops
export const generateJSONDoc = (options: any) => {
  const paths = {};
  for (const [tag, data] of Object.entries(REGISTRY)) {
    for (const [pathPostfix, classMethods] of Object.entries(
      data.constructor
    )) {
      const path = `${options.prefix}${data.basePath}${pathPostfix}`.replace(
        /\/$/,
        ""
      );
      const httpMethods = {};
      // TODO: use parametrs.schema.summury and parametrs.schema.description
      for (const [httpMethod, parametrs] of Object.entries(classMethods)) {
        httpMethods[httpMethod] = {
          tags: [prettifyTagName(tag)],
        };
        if (parametrs.schema?.validate?.path) {
          // TODO: FIX parameters OpenAPI 3.0.0
          const swaggerDefinition = yupToOpenAPI(
            parametrs.schema.validate.path
          );
          httpMethods[httpMethod].title = swaggerDefinition.title;
          httpMethods[httpMethod].description = swaggerDefinition.description;
          httpMethods[httpMethod].parameters =
            swaggerDefinition.properties || {};
          for (const [key] of Object.entries(
            httpMethods[httpMethod].parameters
          )) {
            httpMethods[httpMethod].parameters[key].in = "path";
          }
        }
        if (parametrs.schema.validate?.query) {
          // TODO: FIX parameters OpenAPI 3.0.0
          const swaggerDefinition = yupToOpenAPI(
            parametrs.schema.validate.query
          );
          httpMethods[httpMethod].title = swaggerDefinition.title;
          httpMethods[httpMethod].description = swaggerDefinition.description;
          const parameters = swaggerDefinition.properties || {};
          for (const [key] of Object.entries(parameters)) {
            parameters[key].in = "query";
          }
          httpMethods[httpMethod].parameters = {
            ...httpMethods[httpMethod].parameters,
            ...parameters,
          };
        }
        if (parametrs.schema.validate?.body) {
          const swaggerDefinition = yupToOpenAPI(
            parametrs.schema.validate.body
          );
          httpMethods[httpMethod].summary = swaggerDefinition.title;
          httpMethods[httpMethod].description = swaggerDefinition.description;
          httpMethods[httpMethod].requestBody = {
            content: {
              "application/json": {
                schema: {
                  type: swaggerDefinition.type,
                  properties: swaggerDefinition.properties,
                },
              },
            },
          };
        }
        httpMethods[httpMethod].responses = {};
        for (const response of parametrs.schema.responses || []) {
          const swaggerDefinition = yupToOpenAPI(response.schema);
          httpMethods[httpMethod].responses[response.status] = {
            content: {
              "application/json": {
                schema: swaggerDefinition,
              },
            },
          };
        }
      }
      paths[path] = { ...paths[path], ...httpMethods };
    }
  }
  options.paths = paths;
  return options;
};
