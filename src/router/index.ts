import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/reyes"
    },
    {
      path: "/reyes",
      name: "Reyes",
      component: () => import("../pages/ReyesView.vue")
    }
  ]
});
