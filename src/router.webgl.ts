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
      component: () => import('./views/webgl/Home/Home.vue'),
    },
    {
      path: '*',
      name: 'error404',
      component: () => import('./views/errors/Error404/Error404.vue'),
    },
  ],
});
