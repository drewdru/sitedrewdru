export default defineNuxtRouteMiddleware((to, _from) => {
  const nuxtApp = useNuxtApp();
  const config = useRuntimeConfig();
  const subdomain = useSubdomain();

  let host = "";
  if (process.server) {
    host = nuxtApp.ssrContext.req.headers.host;
  } else {
    host = window.location.host;
  }

  const parts = host.split(".");
  const isSubdomain = parts.length > 2;
  subdomain.value = isSubdomain ? parts[0] : "";

  if (
    isSubdomain &&
    !to.fullPath.startsWith(`/${subdomain.value}`) &&
    config.subdomains.some((item) => item.name === subdomain.value)
  ) {
    return navigateTo({ path: `/${subdomain.value}${to.fullPath}` });
  }

  if (
    !isSubdomain &&
    config.subdomains.some(
      (item) => item.name === to.path.slice(1).split("/")[0]
    )
  ) {
    return navigateTo({ path: "/" });
  }
});
