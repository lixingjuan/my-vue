<template>
  <div>
    <base-top-nav></base-top-nav>
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
    <base-bottom-nav></base-bottom-nav>
  </div>
</template>

<script>
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
        id: "11",
        todo_text: this.inputTodo,
        name: null,
        is_exist: 1,
        isdone: 0
      };

      addTodoItemApi(params);
    }
  }
};
</script>

<style scoped lang="scss">
#addWrap {
  display: flex;
  #addInput {
    background-color: #666;
  }
  #addButton {
    width: 30px;
    height: 20px;
    background-color: coral;
  }
}
</style>
