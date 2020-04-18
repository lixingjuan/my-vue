<template>
  <div id="pageContainer">
    <base-top-nav>登陆</base-top-nav>

    <van-form @submit="onSubmit" id="formContainer">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;" id="submitButton">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import BaseTopNav from "@/components/BaseComponents/BaseTopNav.vue";

import { loginApi } from "@/request";
import { docCookies } from "@/utils/index.js";

export default {
  name: "",
  components: {
    BaseTopNav
  },
  props: {},
  data() {
    return {
      username: "",
      password: ""
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    async onSubmit() {
      // const params = {
      //   username: this.username,
      //   password: this.password
      // };
      const params = {
        username: "lixingjuan",
        password: "guagua"
      };
      const res = await loginApi(params);
      const { token, success, errorMessage } = res;
      if (success) {
        docCookies.setItem("token", token);
        this.$router.push({
          path: "/HomePage"
        });
      } else {
        this.$Toast(errorMessage);
      }
    }
  }
};
</script>

<style scoped lang="scss">
#pageContainer {
  height: 100%;
  #formContainer {
    position: relative;
    top: 10rem;
    #submitButton {
      position: relative;
      top: 10rem;
    }
  }
}
</style>
