import Vue from "vue";
import Vuex from "vuex";

import ModuleTodo from "./ModuleTodo";
import ModulePartScroll from "./ModulePartScroll";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    ModuleTodo,
    ModulePartScroll
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
