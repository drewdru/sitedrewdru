import swaggerJSDoc from "swagger-jsdoc";
// import IHandler from "../helpers/handler";

// function getAllSubclasses(baseClass) {
//   // eslint-disable-next-line no-new-func
//   const globalObject = Function("return this")();
//   const allVars = Object.keys(globalObject);
//   const classes = allVars.filter(function (key) {
//     try {
//       const obj = globalObject[key];
//       return obj.prototype instanceof baseClass;
//     } catch (e) {
//       return false;
//     }
//   });
//   return classes;
// }

export default defineEventHandler(() => {
  // console.log(getAllSubclasses(Handler));
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
});
