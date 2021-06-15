import { createWebHistory, createRouter } from "vue-router";
import CustomersData from '@/components/customer/CustomersData.vue'
import Example from '@/components/charlie-table/Example.vue'
import CardGame from '@/components/card-game/CardGame.vue'
import Practice from '@/components/practice/Practice.vue'

const routes = [
  {
    path: "/",
    component: CustomersData,
  },
  {
    path: "/table",
    component: Example,
  },
  {
    path: "/card-game",
    component: CardGame,
  },
  {
    path: "/practice",
    component: Practice,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
