// TODO: fix types
export const ENDPOINTS: Array<{ [name: string]: any }> = [];

export const swaggerRegister = (basePath: string) => {
  return (constructor) => {
    for (const [pathPostfix, classEndpoints] of Object.entries(
      constructor as { [name: string]: any[] }
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
