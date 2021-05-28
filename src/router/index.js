import { createWebHistory, createRouter } from "vue-router";
import User from '@/components/User.vue'
import Practice from '@/components/Practice.vue'
import Game from '@/components/Game.vue'

const routes = [
  {
    path: "/",
    component: User,
  },
  {
    path: "/practice",
    component: Practice,
  },
  {
    path: "/game",
    component: Game,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;