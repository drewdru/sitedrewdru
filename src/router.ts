import Vue from 'vue';
import Router from 'vue-router';

import routerIndex from '@/routes/router.index';
import routerMusong from '@/routes/router.musong';
import routerWebgl from '@/routes/router.webgl';
import routerError from '@/routes/router.error';

Vue.use(Router);

const host = window.location.host;
const parts = host.split('.');
export const subdomains = ['index', 'musong', 'webgl'];
export const routers = () => {
  let routes;
  let subdomain = 'index';
  // if (parts.length === 2 || parts[0] === 'www') {
  //   routes = routerIndex;
  // } else
  if (parts.length === 3) {
    switch (parts[0]) {
      case 'webgl':
        routes = routerWebgl;
        subdomain = parts[0];
        break;
      case 'musong':
        routes = routerMusong;
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
