import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import DebouncePage from "@/views/DebouncePage.vue";
import DemoPage from "@/views/DemoPage.vue";
import HomePage from "@/views/HomePage.vue";
import PartScrollPage from "@/views/PartScrollPage.vue";
import ScrollPage from "@/views/ScrollPage.vue";
import ThrottlePage from "@/views/ThrottlePage.vue";
import TodoPage from "@/views/TodoPage.vue";

const routes = [
  {
    path: "/",
    name: "homepage",
    component: HomePage
  },
  {
    path: "/DebouncePage",
    name: "debouncepage",
    component: DebouncePage
  },
  {
    path: "/DemoPage",
    name: "demopage",
    component: DemoPage
  },
  {
    path: "/HomePage",
    name: "homepage",
    component: HomePage
  },
  {
    path: "/PartScrollPage",
    name: "partscrollpage",
    component: PartScrollPage
  },
  {
    path: "/ScrollPage",
    name: "scrollpage",
    component: ScrollPage
  },
  {
    path: "/ThrottlePage",
    name: "throttlepage",
    component: ThrottlePage
  },
  {
    path: "/TodoPage",
    name: "todopage",
    component: TodoPage
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
