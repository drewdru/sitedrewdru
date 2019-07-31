import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/index/Home/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/index/About/About.vue'),
    },
    {
      path: '*',
      name: 'error404',
      component: () => import('./views/errors/Error404/Error404.vue'),
    },
  ],
});
