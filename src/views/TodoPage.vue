<template>
  <div>
    <base-top-nav />
    <div id="addWrap">
      <input id="addInput" v-model="inputTodo" />
      <p id="addButton" @click="addItem">ADD</p>
    </div>
    <div>
      <p>未完成</p>
      <todo-list :doneOrNot="'notDone'" @click="testClick"></todo-list>
      <todo-list @click="testClick">todoItem</todo-list>
      <p>已完成</p>
      <todo-list :doneOrNot="'done'"></todo-list>
    </div>
    <base-bottom-nav />
  </div>
</template>

<script>
import uuid from "uuid";

import BaseTopNav from "@/components/BaseComponents/BaseTopNav.vue";
import BaseBottomNav from "@/components/BaseComponents/BaseBottomNav.vue";
import { TodoList } from "@/components/TodoListComponents";

import { queryTodoItemsAPI, addTodoItemApi } from "@/request";

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
      listData: [],
      inputTodo: ""
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
    },
    addItem() {
      const params = {
        todoText: this.inputTodo,
        uuid: uuid(),
        isDone: 0
      };

      addTodoItemApi(params);
    }
  }
};
</script>

<style scoped lang="scss">
#addWrap {
  display: flex;
  height: 3rem;
  background-color: #666;
  line-height: 3rem;
  #addInput {
    width: 70%;
    border: 1px #000 solid;
  }
  #addButton {
    width: 28%;
  }
}
</style>
