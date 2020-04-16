<template>
  <div id="pageContrainer">
    <!-- 页面头部 -->
    <base-top-nav ref="nav">部分滚动-全能tab页面</base-top-nav>
    <!-- 全局loading -->
    <van-loading id="pageLoading" v-show="pageLoading" />
    <!-- 页面tab -->
    <page-body @queryDataEvent="queryData"></page-body>

    <!-- 页面底部 -->
  </div>
</template>

<script>
// import BScroll from "better-scroll";

import BaseTopNav from "@/components/BaseComponents/BaseTopNav.vue";
import { PageBody } from "@/components/PartScrollComponents";

import { queryTodoItemsAPI } from "@/request";
import { debounce } from "@/utils/index.js";

export default {
  data() {
    return {
      // isTodo: true, // 当前是 TODO tab
      pageSize: 10, // 分页大小
      currentPage: 1, // 当前数据 页数
      pageLoading: true, // 全页面loading, 默认显示
      todoListData: [], // TODO 列表数据
      doneListData: [], // DONE 列表数据
      maxScrollLength: false,
      listData: []
      // innerShorterOuter: true, // 内层高度小于等于外层
      // currentTabComponent: "TODO", // 当前展示的组件名称
      // dataStatusShowObj: {
      //   showPullingUp: false, // 用户正在上拉 && 高度大于设定值
      //   showPullingDown: false, // 用户正在下拉 && 高度大于设定值
      //   showNoMoreData: false, // 没有更多数据
      //   showPageloading: false, // 页面全局loading
      //   maxScrollLength: 0 // 页面最大下拉高度
      // }
    };
  },
  created() {
    this.queryData();
  },

  computed: {
    currentTabComponent: function() {
      return this.$store.state.ModulePartScroll.currentTabComponent;
    }
  },

  updated() {
    // console.log("触发了更新");
    // // 页面每次渲染之后，都去计算高度，计算内部的高度是否小于等于外部
    // const bscrollHeight = this.$refs.bscroll.offsetHeight;
    // const bscrollListComponentHeight = this.$refs.bscrollListComponent.$refs.bscrollDataList
    //   .offsetHeight;
    // console.log(bscrollHeight);
    // console.log(bscrollListComponentHeight);
    // // TODO: 这里获取的 this.$refs.bscrollListComponent.$refs.bscrollDataList 为什么没有子DOM节点？？？
    // this.innerShorterOuter = bscrollListComponentHeight <= bscrollHeight;
  },
  watch: {},
  components: {
    // DataList,
    PageBody,
    BaseTopNav
    // BaseScrollContainer
  },
  methods: {
    queryData: debounce(async function() {
      // 根据当前显示类型，去查询对应类型数据
      const isTodo = this.currentTabComponent === "TODO"; // 当前显示组件是否是 ‘TodoListWrap’
      // 1. 根据当前显示组件设置请求参数
      const params = {
        isTodo,
        page: this.currentPage,
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
        this.pageLoading = false;
      }
      // const { length } = res || [];
      this.$store.commit("setListData", res);
      // this.$store.state.ModulePartScroll.listData = res;

      // 3. 若返回数据长度为0 && , 则 显示 ‘没有更多数据’ && 提示无更多数据
      // this.dataStatusShowObj.showNoMoreData = length === 0 && this.maxScrollLength;
      // this.dataStatusShowObj.showNoMoreData && this.$Toast("没有更多数据了！");

      // // 4. 查询对应tab 的列表数据
      // if (this.currentTabComponent === "TODO") {
      //   this.todoListData = [...this.todoListData, ...res];
      // } else {
      //   this.doneListData = [...this.doneListData, ...res];
      // }
    }, 1000)

    // changeTab(todoOrDoneComponent) {
    //   // 1. 显示全局loading
    //   this.pageLoading = true;

    //   // 2. 改变 正在显示组件名称
    //   this.$store.commit("setCurrentTabComponent", todoOrDoneComponent);

    //   // 3. 立刻改变当前的分页页数
    //   this.currentPage = 1;

    //   // 4. 清空 '当前显示组件的数据列表'
    //   this.currentTabComponent === "TODO" ? (this.todoListData = []) : (this.doneListData = []);

    //   // 5. 再次初始化 ‘下拉刷新’ ‘上拉加载’ ‘我是有底线的’ '可合并' 的 真假
    //   this.dataStatusShowObj = {
    //     ...this.dataStatusShowObj, // 以防后来又为该对象加入数据
    //     showPullingUp: false, // 用户正在上拉 && 高度大于设定值
    //     showPullingDown: false, // 用户正在下拉 && 高度大于设定值
    //     showNoMoreData: false, // 没有更多数据
    //     showPageloading: false, // 页面全局loading
    //     maxScrollLength: 0 // 页面最大下拉高度
    //   };

    //   // 6. 默认显示全页面loading
    //   this.pageLoading = true;
    //   // 7.设置防抖，重新发起请求
    //   this.queryData();
    // }
  }
};
</script>

<style scoped lang="scss">
#pageLoading {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

#pageContrainer {
  height: 100%;
  background-color: #f7f7f7;
  // #pageBody {
  //   height: 92%;
  // }
  // #tabTitleWrap {
  //   height: 8%;
  //   display: flex;
  //   align-items: center;
  // }
}

#drop-down {
  position: absolute;
  top: -3rem;
  left: 0px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 0.8rem;
  color: #ccc;
  z-index: 20000;
}
// #tabTitleWrap {
//   width: 100;
//   height: 2rem;
//   display: flex;
//   padding: 0rem;
//   list-style: none;
//   line-height: 2rem;
//   background-color: #fff;
//   justify-content: space-around;
//   z-index: 3;
//   .currentTabTitle {
//     color: red;
//   }
// }

#drop-up {
  position: relative;
  top: 2rem;
}
</style>
