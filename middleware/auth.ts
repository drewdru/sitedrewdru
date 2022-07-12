export default defineNuxtRouteMiddleware((_to, _from) => {
  // TODO: check user permissions
  // https://auth0.com/blog/how-to-make-secure-http-requests-with-vue-and-express/
  // https://github.com/auth0-blog/vue-express-auth
  // https://javascript.plainenglish.io/nuxt-3-auth0-authentication-70e86a98a3b3
  // https://github.com/ashansurkar/nuxt3-auth
  // https://www.permit.io/blog/custom-auth0-universal-login

  // https://www.keycloak.org/getting-started/getting-started-docker
  console.log("auth middleware");
});
