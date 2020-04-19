import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import AntdDemoPage from "@/views/AntdDemoPage.vue";
import DebounceThrottlePage from "@/views/DebounceThrottlePage.vue";
import FileUploadPage from "@/views/FileUploadPage.vue";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import PartScrollPage from "@/views/PartScrollPage.vue";
import ScrollPage from "@/views/ScrollPage.vue";
import TodoPage from "@/views/TodoPage.vue";

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage
  },
  {
    path: "/AntdDemoPage",
    name: "antddemopage",
    component: AntdDemoPage
  },
  {
    path: "/DebounceThrottlePage",
    name: "debouncethrottlepage",
    component: DebounceThrottlePage
  },
  {
    path: "/FileUploadPage",
    name: "fileuploadpage",
    component: FileUploadPage
  },
  {
    path: "/HomePage",
    name: "homepage",
    component: HomePage
  },
  {
    path: "/LoginPage",
    name: "loginpage",
    component: LoginPage
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
