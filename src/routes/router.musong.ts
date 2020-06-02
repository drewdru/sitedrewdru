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
      path: '/about',
      name: 'about',
      component: () => import('@/views/musong/WebAudio/WebAudio.vue'),
    },
    {
      path: '/about/second',
      name: 'about211111111 111111111111',
      component: () => import('@/views/musong/WebAudio/WebAudio.vue'),
    },
    {
      path: '/about/second/fourth',
      name: 'about4',
      component: () => import('@/views/musong/WebAudio/WebAudio.vue'),
    },
    {
      path: '/new',
      name: 'new',
      component: () => import('@/views/musong/WebAudio/WebAudio.vue'),
    },
    {
      path: '/about/third',
      name: 'about3',
      component: () => import('@/views/musong/WebAudio/WebAudio.vue'),
    },
    {
      path: '*',
      name: 'error404',
      component: () => import('@/views/errors/Error404/Error404.vue'),
    },
  ],
});
