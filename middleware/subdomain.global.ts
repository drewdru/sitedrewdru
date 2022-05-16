const subdomains = [
  {name: 'index', /*path: `//${process.env.VITE_DOMAIN_NAME}`*/ },
  {name: 'career', /*path: `//career.${process.env.VITE_DOMAIN_NAME}`*/ },
  {name: 'musong', /*path: `//musong.${process.env.VITE_DOMAIN_NAME}`*/ },
  {name: 'imaging', /*path: `//imaging.${process.env.VITE_DOMAIN_NAME}`*/ },
  {name: 'webgl', /*path: `//webgl.${process.env.VITE_DOMAIN_NAME}`*/ },
];

export default defineNuxtRouteMiddleware((to: any, from: any) => {
  const nuxtApp = useNuxtApp()
  
  let host = ''
  if(process.server) {
    host = nuxtApp.ssrContext.req.headers.host
  } else {
    host = window.location.host
  }

  const parts = host.split('.');
  
  if (parts.length === 3
    && !to.fullPath.startsWith(`/${parts[0]}`) 
    && subdomains.some(e => e.name === parts[0])
  ) {
    return navigateTo({path: `/${parts[0]}${to.fullPath}`})
  }
})
