<template>
  <div id="pageContrainer">
    <base-top-nav ref="nav" :showBackArrowLeft="true">文件上传示例</base-top-nav>

    <div id="pageBody">
      <input
        class="file"
        name="file"
        type="file"
        accept="image/png,image/gif,image/jpeg"
        @change="getFile"
      />
      <button @click="updateFile">点击确认上传</button>
    </div>
    <ul>
      <li v-for="item in fileList" :key="item.id">{{ item.file }}</li>
    </ul>
  </div>
</template>

<script>
import BaseTopNav from "@/components/BaseComponents/BaseTopNav.vue";

import { uploadFileApi, queryFilesApi } from "@/request";

export default {
  name: "",
  components: {
    BaseTopNav
  },
  props: {},
  data() {
    return {
      file: "",
      fileList: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.queryData();
  },
  methods: {
    async queryData() {
      let res = await queryFilesApi();
      console.log("请求文件的参数", res);
      // res = res.map(item => ({ ...item, file: item.file }));
      this.fileList = res;
    },
    getFile(e) {
      this.file = e.target.files[0];
    },
    updateFile() {
      if (!this.file) {
        this.$Toast("请先上传文件");
      }
      let params = new FormData(); // 创建form对象
      params.append("file", this.file); // 通过append向form对象添加数据
      console.log(params.get("file")); // FormData私有类对象，访问不到，可以通过get判断值是否传进去

      uploadFileApi(params);
      // this.$http.post("http://127.0.0.1:8081/upload", param, config).then(response => {
      //   console.log(response.data);
      // });
    }
  }
};
</script>

<style scoped lang="scss">
#pageBody {
  width: 100%;
  height: 20rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  input {
    border: 1px solid #ccc;
    width: 60%;
  }
  button {
    margin-top: 3rem;
    width: 40%;
    border: 1px solid #ccc;
  }
}
</style>
