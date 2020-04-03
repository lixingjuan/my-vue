import Vue from "vue";
import Vuex from "vuex";

import App from "./App.vue";
import store from "./store";
import router from "./router";

Vue.use(Vuex);

// antd
import { Button, message, notification } from "ant-design-vue";
Vue.component(Button.name, Button);

// vux
import { Tab, TabItem } from "vux";
Vue.component("tab", Tab);
Vue.component("tab-item", TabItem);

// 全局配置
notification.config({
  placement: "topRight",
  bottom: "50px",
  duration: 3
});

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
