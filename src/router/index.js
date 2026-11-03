import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Početna' }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: Home,
    meta: { title: 'Autopraonica Clean' }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | AutoClean`;
  }
  next();
});

export default router;
