import { queryTodoItemsAPI } from "@/request";
// import { debounce } from "@/utils/index.js";

const ModulePartScroll = {
  state: {
    listData: [], // 列表所有数据
    pageLoading: true, // 页面loading
    currentPage: 1, //
    currentTabComponent: "TODO" // 当前显示组件
  },

  actions: {
    async queryDataAction({ commit, state }) {
      const isTodo = state.currentTabComponent === "TODO"; // 当前显示组件是否是 ‘TodoListWrap’
      // 1. 根据当前显示组件设置请求参数
      const params = {
        isTodo,
        page: state.currentPage,
        pageSize: 10
      };
      let res;
      // 2. 进行接口调用并捕获结果，隐藏页面全局loading
      try {
        res = await queryTodoItemsAPI(params);
      } catch (err) {
        this.$Toast(err || "请求出错");
      } finally {
        // 设置页面全局loading 为false
        commit("setPageLoading", false);
      }
      commit("setListData", res);
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
    },
    setPageLoading(state, pageLoading) {
      console.log("触发了state", pageLoading);
      state.pageLoading = pageLoading;
      console.log("state.pageLoading", state.pageLoading);
    },
    setCurrentPage(state, currentPage) {
      console.log("触发了state", currentPage);
      state.currentPage = currentPage;
      console.log("state.currentPage", state.currentPage);
    }
  }
};

export default ModulePartScroll;
