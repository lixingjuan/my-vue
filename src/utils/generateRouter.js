const fs = require("fs");
const path = require("path");
const projectRootPath = path.join(__dirname, "../..");
const viewsPath = path.join(projectRootPath, "/src/views");
const routerPath = path.join(projectRootPath, "/src/router/index.js");
const HomePagePath = path.join(projectRootPath, "/src/views/HomePage.vue");
const HomePageTempletePath = path.join(projectRootPath, "/src/utils/HomeTemplete.vue");

const pagesArr = fs.readdirSync(viewsPath).filter(item => path.extname(item) === ".vue");

/**
 * @des 生成router的脚本
 * @remark 直接本地运行即可
 * @param {type}
 * @return:
 */
const generateRouter = function generateRouter() {
  /**
   * 1. 读取views下面的所有页面
   * 2. 获取名字，放在数组里面
   */

  const importArr = pagesArr.reduce(
    (tol, item) =>
      (tol += `import ${path.basename(item, ".vue")} from "@/views/${item}"
`),
    ""
  );

  const routes = pagesArr.map(item => {
    return `{
    path: "/${path.basename(item, ".vue")}",
    name: '${path.basename(item, ".vue").toLowerCase()}',
    component: ${path.basename(item, ".vue")},
  }
`;
  });

  const targetRouteString = `
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

${importArr}

const routes = [
  {
    path: "/",
    name: 'LoginPage',
    component: LoginPage,
  },
  ${routes}
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
`;
  console.log("taretRoute", targetRouteString);
  fs.writeFileSync(routerPath, targetRouteString);
  // return pagesArr;
};

const generateHome = function generateRouter() {
  const HomePageTemplete = fs.readFileSync(HomePageTempletePath).toString();

  const HOME_CONTRAINER = pagesArr
    .map(
      item =>
        `<li><a href="/${path.basename(item, ".vue")}">${path.basename(item, ".vue")}</a></li>`
    )
    .join(" \n ");

  const targetRouteString = HomePageTemplete.replace("HOME_CONTRAINER", HOME_CONTRAINER);

  fs.writeFileSync(HomePagePath, targetRouteString);
};

/* 写入router */
generateRouter();
/* 写入主页路由 */
generateHome();

// export { generateRouter };
