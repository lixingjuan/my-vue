<template>
  <div id="pageContrainer">
    <!-- 页面头部 -->
    <base-top-nav ref="nav">部分滚动-全能tab页面</base-top-nav>
    <!-- 全局loading -->
    <van-loading id="pageLoading" v-show="pageLoading" />
    <!-- 页面tab -->
    <div id="pageBody">
      <ul id="tabTitleWrap">
        <li
          @click="changeTab('TODO')"
          :class="{ currentTabTitle: this.currentTabComponent === 'TODO' }"
        >
          TODO
        </li>
        <li
          @click="changeTab('DONE')"
          :class="{ currentTabTitle: this.currentTabComponent === 'DONE' }"
        >
          DONE
        </li>
      </ul>
      <base-scroll-container></base-scroll-container>
      <!-- <div id="tabListWrap" class="bscroll" ref="bscroll">
        <div
          ref="bscrollContainer"
          :class="{ 'bscroll-container': true, innerShorterOuter: innerShorterOuter }"
        >
          <p id="drop-down" v-show="dataStatusShowObj.showPullingDown">
            <van-loading color="#1989fa" size="24">松手刷新数据</van-loading>
          </p>

          <data-list
            class="tab"
            ref="bscrollListComponent"
            :ListDataProps="todoListData"
            v-show="currentTabComponent === 'TODO'"
          />

          <data-list
            class="tab"
            ref="bscrollListComponent"
            :ListDataProps="doneListData"
            v-show="currentTabComponent === 'DONE'"
          />

          <p id="drop-up" v-show="dataStatusShowObj.showPullingUp">
            <van-loading color="#1989fa" size="24">加载更多</van-loading>
          </p>

          <p id="noMoreData" v-show="dataStatusShowObj.showNoMoreData">我是有底线的...</p>
        </div>
      </div> -->
    </div>

    <!-- 页面底部 -->
  </div>
</template>

<script>
// import BScroll from "better-scroll";

import BaseTopNav from "@/components/BaseComponents/BaseTopNav.vue";
import { BaseScrollContainer } from "@/components/PartScrollComponents";

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
      innerShorterOuter: true, // 内层高度小于等于外层
      currentTabComponent: "TODO", // 当前展示的组件名称
      dataStatusShowObj: {
        showPullingUp: false, // 用户正在上拉 && 高度大于设定值
        showPullingDown: false, // 用户正在下拉 && 高度大于设定值
        showNoMoreData: false, // 没有更多数据
        showPageloading: false, // 页面全局loading
        maxScrollLength: 0 // 页面最大下拉高度
      }
    };
  },
  created() {
    this.queryData();
  },
  mounted() {
    this.scrollFn();
  },
  updated() {
    console.log("触发了更新");
    // 页面每次渲染之后，都去计算高度，计算内部的高度是否小于等于外部

    const bscrollHeight = this.$refs.bscroll.offsetHeight;
    const bscrollListComponentHeight = this.$refs.bscrollListComponent.$refs.bscrollDataList
      .offsetHeight;
    console.log(bscrollHeight);
    console.log(bscrollListComponentHeight);
    // TODO: 这里获取的 this.$refs.bscrollListComponent.$refs.bscrollDataList 为什么没有子DOM节点？？？
    this.innerShorterOuter = bscrollListComponentHeight <= bscrollHeight;
  },
  watch: {},
  components: {
    // DataList,
    BaseTopNav,
    BaseScrollContainer
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
      } finally {
        // 设置页面全局loading 为false
        this.pageLoading = false;
      }
      const { length } = res;

      // 3. 若返回数据长度为0 && , 则 显示 ‘没有更多数据’ && 提示无更多数据
      this.dataStatusShowObj.showNoMoreData = length === 0 && this.maxScrollLength;
      this.dataStatusShowObj.showNoMoreData && this.$Toast("没有更多数据了！");

      // 4. 查询对应tab 的列表数据
      if (this.currentTabComponent === "TODO") {
        this.todoListData = [...this.todoListData, ...res];
      } else {
        this.doneListData = [...this.doneListData, ...res];
      }
    }, 1000),

    // scrollFn() {
    //   this.$nextTick(() => {
    //     if (!this.scroll) {
    //       this.scroll = new BScroll(this.$refs.bscroll, {
    //         click: true, // better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
    //         probeType: 2, // 这个属性设置之后可以监听得到了
    //         mouseWheel: true
    //       });
    //     } else {
    //       this.scroll.refresh();
    //     }

    //     /* 滚动事件 */
    //     this.scroll.on("scroll", pos => {
    //       // 最大滚动长度
    //       this.maxScrollLength = this.scroll.maxScrollY;

    //       if (pos.y > 50) {
    //         console.log("此时显示下拉箭头");
    //         this.dataStatusShowObj.showPullingDown = true;
    //       } else {
    //         this.dataStatusShowObj.showPullingDown = false;
    //       }

    //       // 显示加载更多
    //       // 当前 ‘最大滚动高度’ 为真 && ‘我是有底线的’为假
    //       if (pos.y - this.scroll.maxScrollY < 20 && !this.showNoMoreData && this.maxScrollLength) {
    //         this.dataStatusShowObj.showPullingUp = true;
    //       } else {
    //         this.dataStatusShowObj.showPullingUp = false;
    //       }
    //     });

    //     /* 滑动结束事件 */
    //     this.scroll.on("touchEnd", pos => {
    //       // 若用户【下拉】大于某高度，则触发重新请求动作
    //       if (pos.y > 50) {
    //         console.log("此时触发刷新动作");
    //         // 刷新请求步骤
    //         // 1. 置1分页参数
    //         this.currentPage = 1;
    //         // 2. 清空当前 '显示组件' 数据源
    //         this.currentTabComponent === "TODO"
    //           ? (this.todoListData = [])
    //           : (this.doneListData = []);
    //         // 3. 隐藏 ‘上拉加载更多’ 提示
    //         this.dataStatusShowObj.showPullingDown = false;
    //         // 4. 默认显示全页面loading
    //         this.pageLoading = true;
    //         // 5. 调用请求数据接口
    //         this.queryData();
    //       }

    //       // 【上拉加载更多】：用户【上拉】高度大于最大滑动高度20 && 当前未显示没有更多数据 则请求更多数据
    //       if (pos.y - this.scroll.maxScrollY < 20 && !this.showNoMoreData) {
    //         // 请求更多数据 步骤
    //         // 1. 设置当前分页参数+1
    //         this.currentPage = this.currentPage + 1;
    //         // 2. 默认显示全页面loading
    //         this.pageLoading = true;
    //         // 3. 调用查询接口
    //         this.queryData();
    //         // 4. 隐藏加载更多loading
    //         this.dataStatusShowObj.showPullingUp = false;
    //       } else {
    //         console.log("不满足请求条件");
    //       }
    //     });

    //     console.log(this.scroll.maxScrollY);
    //   });
    // },

    changeTab(todoOrDoneComponent) {
      // 1. 显示全局loading
      this.pageLoading = true;

      // 2. 改变 正在显示组件名称
      this.currentTabComponent = todoOrDoneComponent;
      console.log("当前tab", this.currentTabComponent);
      // 3. 立刻改变当前的分页页数
      this.currentPage = 1;

      // 4. 清空 '当前显示组件的数据列表'
      this.currentTabComponent === "TODO" ? (this.todoListData = []) : (this.doneListData = []);

      // 5. 再次初始化 ‘下拉刷新’ ‘上拉加载’ ‘我是有底线的’ '可合并' 的 真假
      this.dataStatusShowObj = {
        ...this.dataStatusShowObj, // 以防后来又为该对象加入数据
        showPullingUp: false, // 用户正在上拉 && 高度大于设定值
        showPullingDown: false, // 用户正在下拉 && 高度大于设定值
        showNoMoreData: false, // 没有更多数据
        showPageloading: false, // 页面全局loading
        maxScrollLength: 0 // 页面最大下拉高度
      };

      // 6. 默认显示全页面loading
      this.pageLoading = true;
      // 7.设置防抖，重新发起请求
      this.queryData();
    }
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
  #pageBody {
    height: 92%;
  }
  #tabTitleWrap {
    height: 8%;
    display: flex;
    align-items: center;
  }
  #tabListWrap {
    height: 92%;
    // display: flex;
    // flex-direction: column;
    // .bscroll {
    //   height: 100%;
    // }
    .innerShorterOuter {
      height: 101%;
    }
    #noMoreData {
      height: 10%;
    }
  }
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
#tabTitleWrap {
  width: 100;
  height: 2rem;
  display: flex;
  padding: 0rem;
  list-style: none;
  line-height: 2rem;
  background-color: #fff;
  justify-content: space-around;
  z-index: 3;
  .currentTabTitle {
    color: red;
  }
}

#drop-up {
  position: relative;
  top: 2rem;
}
</style>
