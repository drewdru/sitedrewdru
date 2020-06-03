import Router from 'vue-router';

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/musong/WebAudio/WebAudio.vue'),
    },
    {
      path: '*',
      name: 'error404',
      component: () => import('@/views/errors/Error404/Error404.vue'),
    },
  ],
});
