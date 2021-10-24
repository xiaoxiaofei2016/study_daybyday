import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
const home = () => import('@/views/home/Home.vue')

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: home,
    meta: {
      title: '内聘系统',
      lever: 1
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
