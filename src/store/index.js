import Vue from "vue";
import Vuex from "vuex";

import moduleTodo from "./moduleTodo";
import modulePartScroll from "./modulePartScroll";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    moduleTodo,
    modulePartScroll
  },
  state: {
    todos: []
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
