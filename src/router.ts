import Vue from 'vue';
import Router from 'vue-router';

import routerTest from '@/routes/router.test';
import routerWebgl from '@/routes/router.webgl';
import routerError from '@/routes/router.error';

Vue.use(Router);

const routerIndex = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/index/Home/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/index/About/About.vue'),
    },
    {
      path: '*',
      name: 'error404',
      component: () => import('@/views/errors/Error404/Error404.vue'),
    },
  ],
});


const host = window.location.host;
const parts = host.split('.');

export default () => {
  let routes;
  if (parts.length === 2 || parts[0] === 'www') {
    routes = routerIndex;
  } else if (parts.length === 3) {
    switch (parts[0]) {
      case 'webgl':
        routes = routerWebgl;
        break;
      case 'test':
        routes = routerTest;
        break;
      default:
        routes = routerError;
        break;
    }
  } else {
    // If you want to do something else just comment the line below
    routes = routerIndex; // router_error;
  }
  return routes;
};
