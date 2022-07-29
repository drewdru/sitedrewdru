import { generateJSONDoc } from "../utils/swagger";

export default defineEventHandler(() => {
  const options = {
    info: {
      title: "Drew Dru",
      version: "1.0.0",
    },
    servers: [{ url: "/" }],
    prefix: "/api",
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
  };

  return generateJSONDoc(options);
});
