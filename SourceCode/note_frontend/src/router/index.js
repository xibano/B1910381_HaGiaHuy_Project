import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("./../components/HomePage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./../components/Auth/LoginForm.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("./../components/Auth/SignupForm.vue"),
  },
  {
    path: "/board",
    name: "board",
    component: () => import("./../components/Board/BoardPage.vue"),
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("./../components/Calendar/CalendarPage.vue"),
  },
  {
    path: "/schedule",
    name: "schedule",
    component: () => import("./../components/Schedule/SchedulePage.vue"),
  },

  {
    path: "/quizes",
    name: "quizes",
    component: () => import("./../components/views/QuizesView.vue"),
  },

  {
    path: "/quiz/:id",
    name: "quiz",
    component: () => import("./../components/views/QuizView.vue"),
  },

  {
    path: "/user_account",
    name: "user_account",
    component: () => import("./../components/UserAccount/UserAccountPage.vue"),
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
