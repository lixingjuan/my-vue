const ModulePartScroll = {
  state: {
    listData: [], // 列表所有数据
    currentTabComponent: "TODO" // 当前显示组件
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
    setCurrentTabComponent(state, currentTabComponent) {
      console.log("触发了state", currentTabComponent);
      state.currentTabComponent = currentTabComponent;
    },
    setListData(state, listData) {
      console.log("触发了state", listData);
      state.listData = listData;
    }
  }
};

export default ModulePartScroll;
