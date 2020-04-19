<template>
  <div id="pageContrainer">
    <!-- 页面头部 -->
    <base-top-nav ref="nav" :showBackArrowLeft="true">部分滚动-全能tab页面</base-top-nav>
    <!-- 全局loading -->
    <van-loading id="pageLoading" v-show="pageLoading" />
    <!-- 页面tab -->
    <page-body></page-body>

    <!-- 页面底部 -->
  </div>
</template>

<script>
import { mapState } from "vuex";

import BaseTopNav from "@/components/BaseComponents/BaseTopNav.vue";
import { PageBody } from "@/components/PartScrollComponents";

// import { queryTodoItemsAPI } from "@/request";
// import { debounce } from "@/utils/index.js";

export default {
  data() {
    return {
      // isTodo: true, // 当前是 TODO tab
      pageSize: 10, // 分页大小
      currentPage: 1, // 当前数据 页数
      // pageLoading: true, // 全页面loading, 默认显示
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
    this.$store.dispatch("queryDataAction");
  },

  computed: mapState({
    currentTabComponent: state => state.ModulePartScroll.currentTabComponent,
    pageLoading: state => state.ModulePartScroll.pageLoading
  }),

  updated() {},
  watch: {},
  components: {
    // DataList,
    PageBody,
    BaseTopNav
  },
  methods: {}
};
</script>

<style scoped lang="scss">
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
#pageLoading {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
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
