import type { IncomingMessage, ServerResponse } from "http";
import swaggerJSDoc from "swagger-jsdoc";

export default (_req: IncomingMessage, _res: ServerResponse) => {
  const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Drew Dru",
      version: "1.0.0",
    },
    servers: [{ url: "/api" }],
    schemes:
      process.env.SWAGGER_SCHEMA_HTTPS === "true"
        ? ["https"]
        : ["http", "https"],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "apiKey",
          name: "Authorization",
          in: "header",
        },
      },
    },
    security: {
      BasicAuth: [],
    },
  };

  const options = {
    swaggerDefinition,
    apis: ["server/api/**/*.ts"],
  };

  return swaggerJSDoc(options);
};
