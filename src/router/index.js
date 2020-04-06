
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import DemoPage from "@/views/DemoPage.vue"
import HomePage from "@/views/HomePage.vue"


const routes = [
  {
    path: "/DemoPage",
    name: 'demopage',
    component: DemoPage,
  }
,{
    path: "/HomePage",
    name: 'homepage',
    component: HomePage,
  }

]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
