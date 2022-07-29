import { ISwaggerEndpoints, IRegisteredConstructor } from "./swagger.types";

export const ENDPOINTS: Array<ISwaggerEndpoints> = [];

export const swaggerRegister = (basePath: string) => {
  return (constructor) => {
    for (const [pathPostfix, classEndpoints] of Object.entries(
      constructor as IRegisteredConstructor
    )) {
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
