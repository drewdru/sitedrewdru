import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'test',
    //   component: () => import('./views/Home/Home.vue'),
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('./views/About/About.vue'),
    // },
    {
      path: '*',
      name: 'error404',
      component: () => import('./views/errors/Error404/Error404.vue'),
    },
  ],
});
