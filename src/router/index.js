import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';

import LoginView from '@/views/auth/LoginView.vue';
import RegisterView from '@/views/auth/RegisterView.vue';

import ServicesView from '@/views/common/ServicesView.vue';
import ReservationsView from '@/views/common/ReservationsView.vue';

import ProfileView from '@/views/client/ProfileView.vue';


const isAuthenticated = () => {
    return !!localStorage.getItem('token'); 
};

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false, title: 'Prijava' }
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { requiresAuth: false, title: 'Registracija' }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true, title: 'Početna' }
  },
  {
    path: '/services',
    name: 'Services',
    component: ServicesView,
    meta: { requiresAuth: false, title: 'Usluge' }
  },
  {
    path: '/reservations',
    name: 'Reservations',
    component: ReservationsView,
    meta: { requiresAuth: true, title: 'Rezervacije' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: { requiresAuth: true, title: 'Moj Profil' }
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
  const isLoggedIn = isAuthenticated();
  
  if (to.meta.title) {
    document.title = `${to.meta.title} | AutoClean`;
  }

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' });
  } 
  else if ((to.name === 'Login' || to.name === 'Register') && isLoggedIn) {
    next({ name: 'Home' });
  }
  else {
    next();
  }
});

export default router;
