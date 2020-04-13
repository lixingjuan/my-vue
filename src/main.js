import Vue from "vue";

import App from "./App.vue";
import store from "./store";
import router from "./router";

import "reset-css";

/* START：vant设置 */
import { Loading, Toast } from "vant";
Vue.use(Loading);

Vue.prototype.$Toast = Toast;
/*  END：vant设置 */

/* antd设置 */
import { Button, message, notification } from "ant-design-vue";
Vue.component(Button.name, Button);

// START：全局配置
notification.config({
  placement: "topRight",
  bottom: "50px",
  duration: 3
});

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
/* END：antd设置 */

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
