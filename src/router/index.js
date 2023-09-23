import { createRouter, createWebHistory } from "vue-router";
import WeatherPage from "../views/WeatherPage";
import ErrPage from "../views/ErrPage.vue";
const routes = [
  {
    path: "/",
    name: "WeatherPage",
    component: WeatherPage,
  },
 {
    path: "/:pathMatch(.*)*",
    name: "ErrPage",
    component: ErrPage,
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
