<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <li v-for="(item, index) in data" :key="index" class="item">{{ item.todo_text }}</li>
    </ul>
    <div class="loading-wrapper"></div>
  </div>
</template>

<script>
// import Vue from "vue";
import BScroll from "better-scroll";

import { queryTodoItemsAPI } from "@/request";

// Vue.use(new BScroll());

export default {
  data() {
    return {
      data: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const res = await queryTodoItemsAPI();
      console.log(res);

      this.data = [...res, ...this.data];
      this.$nextTick(() => {
        if (!this.scroll) {
          // const Bscroll = Bscroll;
          this.scroll = new BScroll(this.$refs.wrapper, {
            bounce: false
          });
          this.scroll.on("touchend", pos => {
            console.log(1);
            console.log("pos", pos);
            // 下拉动作
            if (pos.y > 50) {
              this.loadData();
            } else {
              this.loadData();
            }
          });
          this.scroll.on("scrollStart", res => {
            console.log(1);
            console.log(res);
          });
          this.scroll.on("pullingUp", () => {
            console.log(22);
          });
        } else {
          console.log("refresh");
          this.scroll.refresh();
        }
      });
    }
  }
};
</script>

<style>
.item {
  height: 1000px;
  background-color: aquamarine;
  margin: 20px auto;
}
.wrapper {
  height: 300px;
  overflow: scroll;
  border: 2px red solid;
}
</style>
