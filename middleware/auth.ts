export default defineNuxtRouteMiddleware((to, from) => {
  // TODO: check user permissions
  console.log('auth middleware')
})
