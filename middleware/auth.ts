export default defineNuxtRouteMiddleware((_to, _from) => {
  // TODO: check user permissions
  console.log("auth middleware");
});
