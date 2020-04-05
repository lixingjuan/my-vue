import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home/index.vue";
// import FilePrview from "../views/FilePrview";
// import AntdDemo from "../views/AntdDemo/index.vue";
import ScrollDemo from "@/views/ScrollDemo/index.vue";
// import TodoListPage from "../views/TodoListPage/index.vue";

Vue.use(VueRouter);

const routes = [
  // 进入到 / 路由时就直接进入到/app/approve路由
  // { path: "/", redirect: "/app/approve" },
  {
    path: "/",
    name: "home",
    component: Home
  },
  // 意向金
  /* {
    // path: "/FilePrview",
    path: "/",
    name: "FilePrview",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: FilePrview
  }, */
  // {
  //   // path: "/FilePrview",
  //   path: "/AntdDemo",
  //   name: "AntdDemo",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: AntdDemo
  // },
  // {
  //   path: "/TodoListPage",
  //   name: "TodoListPage",
  //   component: TodoListPage
  // },
  // /* 收款情况统计 */
  {
    path: "/ScrollDemo",
    name: "ScrollDemo",
    component: ScrollDemo
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
