const moduleTodo = {
  state: {
    testVal: "testVal",
    listData: []
  },
  getters: {
    // 对于模块内部的getter, 根结点状态作为第三个参数暴漏出来
    fromBGetRootState(state, getters, rootState) {
      window.console.log("在模块B getters 打印模块的参数列表3", arguments[3]);
      window.console.log("在模块B getters 打印根结点的state", state);
      window.console.log("在模块B getters 打印根结点的getters", getters);
      window.console.log("在模块B getters 打印根结点的rootState", rootState);
    },
    isDoneTodos: state => {
      console.log("state.listData", state.listData);
      return state.listData.filter(todo => todo.isdone === 1);
    },
    isorNotDoneTodos: state => isOrNotDone => {
      console.log("state.listData", state.listData);
      return state.listData.filter(todo => todo.isdone === isOrNotDone);
    },
    notDoneTodos: state => {
      return state.listData.filter(todo => todo.isdone === 0);
    }
  },
  actions: {
    // 在模块内部的action，局部状态通过context.state 暴漏出来, 根结点状态为context.rootState
    fromBGetRootState({ state, getters, rootState }) {
      window.console.log("在模块B action 打印根结点的state", state);
      window.console.log("在模块B action 打印根结点的getters", getters);
      window.console.log("在模块B action 打印根结点的rootState", rootState);
    }
  },
  mutations: {
    getListData(state, newListData) {
      state.listData = newListData;
    }
  }
};

export default moduleTodo;
