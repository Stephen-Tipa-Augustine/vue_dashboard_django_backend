import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Home,
      meta: {
      requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
      meta: {
      requiresAuth: false,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
      meta: {
      requiresAuth: false,
      },
    },
    {
      path: "/calender",
      name: "calender",
      component: () => import("../views/Calender.vue"),
      meta: {
      requiresAuth: true,
      },
    },
    {
      path: "/maps",
      name: "maps",
      component: () => import("../views/Maps.vue"),
      meta: {
      requiresAuth: true,
      },
    },
    {
      path: "/reports",
      name: "reports",
      component: () => import("../views/Reports.vue"),
      meta: {
      requiresAuth: true,
      },
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/Settings.vue"),
      meta: {
      requiresAuth: true,
      },
    },
    {
      path: "/statistics",
      name: "statistics",
      component: () => import("../views/Statistics.vue"),
      meta: {
      requiresAuth: true,
      },
    },
    {
      path: "/notifications",
      name: "notifications",
      component: () => import("../views/Notifications.vue"),
      meta: {
      requiresAuth: true,
      },
    },
  ],
});

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  if (requiresAuth && localStorage.getItem('user')) {
    const token = JSON.parse(localStorage.getItem('user')).access;
    axios.get(
        'http://localhost:8000/auth/is-user-authenticated/',
        {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              })
      .then((response) => {
        if ( response.data.active) {
          next();
        }  else {
          next('/login');
        }
      })
      .catch(() => {
        next('/login');
      });
  } else if (requiresAuth && !localStorage.getItem('user')) {
    next('/login');
  } else {
    next();
  }
});

export default router;
