import Router from 'vue-router';

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Web Piano',
      component: () => import('@/views/musong/WebPiano/WebPiano.vue'),
    },
    {
      path: '/guitartuner',
      name: 'Guitar Tuner',
      component: () => import('@/views/musong/GuitarTuner/GuitarTuner.vue'),
    },
    {
      path: '*',
      name: 'error404',
      component: () => import('@/views/errors/Error404/Error404.vue'),
    },
  ],
});
