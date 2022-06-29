import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue';
import { useAuthStore } from "../stores/auth";
import DashboardView from "../views/DashboardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: RegisterView
    },
  ]
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore();
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.isAuthenticated) {
      next()
    } else {
      next({
        path: '/login',
      })
    }
  } else {
    next()
  }
});



export default router
