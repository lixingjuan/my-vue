import Vue from "vue";
import Vuex from "vuex";

import moduleTodo from "./moduleTodo";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    moduleTodo
  },
  state: {
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done);
    }
  },
  mutations: {
    delOne(state) {
      state.todos.pop();
    },
    addOne(state, payload) {
      state.todos.push(payload.newTodo);
    }
  },
  actions: {
    addOne({ commit }, payload) {
      commit("addOne", payload);
    }
  }
});

export default store;
