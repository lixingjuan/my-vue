<template>
  <div>
    <base-top-nav></base-top-nav>
    <p>未完成</p>
    <todo-list :doneOrNot="'notDone'" @click="testClick"></todo-list>
    <todo-list @click="testClick">todoItem</todo-list>
    <p>已完成</p>
    <todo-list :doneOrNot="'done'"></todo-list>
    <base-bottom-nav></base-bottom-nav>
  </div>
</template>

<script>
import TodoList from "./TodoList.vue";
import BaseTopNav from "@/components/BaseTopNav.vue";
import BaseBottomNav from "@/components/BaseBottomNav.vue";

import { queryTodoItemsAPI } from "@/request";

export default {
  name: "",
  components: {
    TodoList,
    BaseTopNav,
    BaseBottomNav
  },
  props: {},
  data() {
    return {
      listData: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.queryData();
  },
  methods: {
    async queryData() {
      const res = await queryTodoItemsAPI({ isDone: true });
      console.log(res);
      this.$store.commit("getListData", res);
      this.listData = res;
    },
    toHomePage() {
      this.$router.push("/");
    },
    testClick() {
      console.log(1);
    }
  }
};
</script>

<style scoped></style>
