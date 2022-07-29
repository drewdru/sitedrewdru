import type { SchemaObject } from "openapi3-ts";

export const capitalize = (text: string) =>
  (text && text[0].toUpperCase() + text.slice(1)) || "";

export const camelcaseToText = (text: string) =>
  text.replace(/([A-Z])/g, " $1");

export const prettifyTagName = (tag: string) =>
  capitalize(camelcaseToText(tag.replace("Handler", "")));

export const formatSchemaPattern = (schema: any) => {
  if (schema.pattern) {
    schema.pattern = schema.pattern.slice(1, -1);
  }
  return schema;
};

export const fixPropertiesPattern = (properties: SchemaObject) => {
  const result: SchemaObject = {};
  for (const [key, data] of Object.entries(properties)) {
    result[key] = formatSchemaPattern(data);
  }
  return result;
};

export const normolizeSwaggerContent = (
  swaggerDefinition: SchemaObject,
  properties: SchemaObject,
  items: any
) => {
  return {
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
  };
};

export const normolizeSchemaObject = (swaggerDefinition: SchemaObject) => {
  let properties: SchemaObject | null = null;
  if (swaggerDefinition.properties) {
    properties = fixPropertiesPattern(swaggerDefinition.properties);
  }
  const items: any = swaggerDefinition.items;
  if (items) {
    items.properties = fixPropertiesPattern(items.properties);
  }
  return { properties, items };
};
