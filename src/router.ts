import Vue from 'vue';
import Router from 'vue-router';

import routerIndex from '@/routes/router.index';
import routerCareer from '@/routes/router.career';
import routerMusong from '@/routes/router.musong';
import routerImaging from '@/routes/router.imaging';
import routerWebgl from '@/routes/router.webgl';
import routerError from '@/routes/router.error';

Vue.use(Router);

const host = window.location.host;
const parts = host.split('.');

export const subdomains = [
  {name: 'index', path: `//${process.env.VUE_APP_DOMAIN_NAME}`},
  {name: 'career', path: `//career.${process.env.VUE_APP_DOMAIN_NAME}`},
  {name: 'musong', path: `//musong.${process.env.VUE_APP_DOMAIN_NAME}`},
  {name: 'imaging', path: `//imaging.${process.env.VUE_APP_DOMAIN_NAME}`},
  {name: 'webgl', path: `//webgl.${process.env.VUE_APP_DOMAIN_NAME}`},
];

export const routers = () => {
  let routes;
  let subdomain = 'index';
  // if (parts.length === 2 || parts[0] === 'www') {
  //   routes = routerIndex;
  // } else
  if (parts.length === 3) {
    switch (parts[0]) {
      case 'career':
        routes = routerCareer;
        subdomain = parts[0];
        break;
      case 'musong':
        routes = routerMusong;
        subdomain = parts[0];
        break;
      case 'imaging':
        routes = routerImaging;
        subdomain = parts[0];
        break;
      case 'webgl':
        routes = routerWebgl;
        subdomain = parts[0];
        break;
      default:
        routes = routerError;
        break;
    }
  } else {
    routes = routerIndex;
  }
  return {routes, subdomain};
};
