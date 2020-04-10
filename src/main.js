import Vue from "vue";
import vuexI18n from "vuex-i18n";

import App from "./App.vue";
import store from "./store";
import router from "./router";

import "reset-css";

Vue.use(vuexI18n.plugin, store);

// vant
import { Loading } from "vant";
Vue.use(Loading);

// antd
import { Button, message, notification } from "ant-design-vue";
Vue.component(Button.name, Button);

// vux
import { Tab, TabItem, ButtonTab, ButtonTabItem, XHeader } from "vux";
Vue.component("tab", Tab);
Vue.component("tab-item", TabItem);
Vue.component("x-header", XHeader);
Vue.component("button-tab", ButtonTab);
Vue.component("button-tab-item", ButtonTabItem);

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
