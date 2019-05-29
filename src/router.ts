import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About/About.vue'),
    },
    // {
    //   path: '*',
    //   name: 'error404',
    //   component: Error404
    // }
  ],
});
