import { createRouter, createWebHistory } from "vue-router";
import { HomeView, CreateTaskView } from "@/views";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/task/create",
    name: "task_create",
    component: CreateTaskView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
