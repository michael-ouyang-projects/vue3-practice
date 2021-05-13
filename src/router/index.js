import { createWebHistory, createRouter } from "vue-router";
import Product from '../components/Product.vue'
import Practice from '../components/Practice.vue'

const routes = [
  {
    path: "/",
    name: "Product",
    component: Product,
  },
  {
    path: "/practice",
    name: "Practice",
    component: Practice,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;