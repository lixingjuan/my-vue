<template>
  <div class="pageContrainer">
    <!-- 页面头部 -->
    <base-top-nav></base-top-nav>

    <!-- 页面tab -->
    <div id="pageBody">
      <ul id="tabTitleWrap">
        <li
          @click="changeTab('TodoListWrap')"
          :class="{ currentTabTitle: this.currentTabComponent === 'TodoListWrap' }"
        >
          TODO
        </li>
        <li
          @click="changeTab('DoneListWrap')"
          :class="{ currentTabTitle: this.currentTabComponent === 'DoneListWrap' }"
        >
          DONE
        </li>
      </ul>

      <div id="tabListWrap" class="bscroll" ref="bscroll">
        <div class="bscroll-container" ref="bscrollContainer">
          <p id="drop-down" v-show="showDropDown">
            <van-loading color="#1989fa" size="24">松手刷新数据</van-loading>
          </p>

          <component
            class="tab"
            v-bind:is="currentTabComponent"
            :todoListDataProps="todoListData"
            :doneListDataProps="doneListData"
          />

          <p id="drop-up" v-show="showDropUp">
            <van-loading color="#1989fa" size="24">加载更多</van-loading>
          </p>

          <p class="noMoreData" v-show="showNoMoreData">我是有底线的...</p>
        </div>
      </div>
    </div>

    <!-- 页面底部 -->
  </div>
</template>

<script>
import BScroll from "better-scroll";

import BaseTopNav from "@/components/BaseComponents/BaseTopNav.vue";
import { TodoListWrap, DoneListWrap } from "@/components/PartScrollComponents/index.js";

import { queryTodoItemsAPI } from "@/request";

export default {
  data() {
    return {
      isTodo: true,
      listData: [],
      todoListData: [], // TODO 列表数据
      doneListData: [], // DONE 列表数据
      showDropUp: false,
      showDropDown: false,
      showNoMoreData: false,
      maxScrollLength: false,
      currentTabComponent: "TodoListWrap", // 当前展示的组件名称
      // canConcat: true,
      // 页面上所有的的刷新、加载、参数列表
      pageSize: 10, // 分页大小
      currentPage: 1, // 当前数据 页数
      dataStatusShowObj: {
        showPullingUp: false, // 用户正在上拉高度大于设定值
        showPullingDown: false, // 用户正在下拉高度大于设定值
        showNoMoreData: false, // 没有更多数据
        showPageloading: false, // 页面全局loading
        maxScrollLength: 0 // 页面最大下拉高度
      }
    };
  },
  created() {
    console.log("partScroll");
    // this.listData.length = 30;
    this.queryData();
  },
  mounted() {
    console.log(1);
    console.log(this.$refs.bscrollContainer);
  },
  watch: {
    // isTodo: function() {
    // 若用户切换了tab,
    // 1. 立刻改变当前的分页页数
    // 2. 并清空当前数据列表
    // 3. 再次初始化 ‘下拉刷新’ ‘上拉加载’ ‘我是有底线的’ '可合并'
    // 4. 重新发起请求
    // this.currentPage = 1;
    // this.listData = [];
    // this.showDropUp = false;
    // this.showDropDown = false;
    // this.showNoMoreData = false;
    // this.canConcat = true;
    //   this.queryData();
    // }
  },
  mounted() {
    this.scrollFn();
    console.log("ce", this.$refs.bscrollContainer.style);
  },
  components: {
    BaseTopNav,
    TodoListWrap,
    DoneListWrap
  },
  methods: {
    async queryData() {
      // 根据当前显示类型，去查询对应类型数据
      const isTodo = this.currentTabComponent === "TodoListWrap"; // 当前显示组件是否是 ‘TodoListWrap’
      const params = {
        isTodo,
        page: this.currentPage,
        pageSize: 10
      };
      let res;
      try {
        res = await queryTodoItemsAPI(params);
      } finally {
        // 设置页面全局loading 为false
      }
      const { length } = res;

      // 若返回数据长度为0, 则 显示 ‘没有更多数据’
      this.showNoMoreData = length === 0 && this.maxScrollLength;
      // console.log("canConcat", this.canConcat);
      // 查询对应tab 的列表数据
      if (isTodo) {
        this.todoListData = [...this.todoListData, ...res];
      } else {
        this.doneListData = [...this.doneListData, ...res];
      }
    },

    scrollFn() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.bscroll, {
            click: true, // better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
            probeType: 2, // 这个属性设置之后可以监听得到了
            mouseWheel: true
          });
        } else {
          this.scroll.refresh();
        }

        /* 滚动事件 */
        this.scroll.on("scroll", pos => {
          // 最大滚动长度
          const maxScrollLength = this.scroll.maxScrollY;
          this.maxScrollLength = maxScrollLength;

          console.log(pos.y, this.showDropDown);
          if (pos.y > 50) {
            this.showDropDown = true;
          } else {
            this.showDropDown = false;
          }
          // 显示加载更多
          // 当前 ‘最大滚动高度’ 为真&& ‘我是有底线的’为假
          if (pos.y - this.scroll.maxScrollY < 20 && !this.showNoMoreData && this.maxScrollLength) {
            this.showDropUp = true;
          } else {
            this.showDropUp = false;
          }
        });

        /* 滑动结束事件 */
        this.scroll.on("touchEnd", pos => {
          // 下拉动作
          if (pos.y > 50) {
            console.log("此时，调用查询接口，并设置当前页变量为0");
            this.showDropDown = false;
            this.queryData();
          }

          if (pos.y - this.scroll.maxScrollY < 20 && !this.showNoMoreData) {
            console.log("此时，调用加载更多接口");
            this.currentPage = this.currentPage + 1;
            this.queryData();
          } else {
            console.log("不满足请求条件");
          }
        });

        console.log(this.scroll.maxScrollY);
      });
    },

    /* 若用户点击了上方的tab */
    changeTab(todoOrDoneComponent) {
      console.log(todoOrDoneComponent);
      // 1. 改变 正在显示组件
      this.currentTabComponent = todoOrDoneComponent;
      // 若用户切换了tab,
      // 2. 立刻改变当前的分页页数
      this.currentPage = 1;
      // 3. 并清空当前数据列表
      this.todoListData = [];
      this.doneListData = [];
      // 4. 再次初始化 ‘下拉刷新’ ‘上拉加载’ ‘我是有底线的’ '可合并'
      // 5. 重新发起请求
      this.showDropUp = false;
      this.showDropDown = false;
      this.showNoMoreData = false;
      this.queryData();
    }
  }
};
</script>

<style scoped lang="scss">
.pageContrainer {
  height: 100%;
  background-color: #f7f7f7;
  #pageBody {
    height: 92%;
  }
  #tabTitleWrap {
    height: 8%;
  }
  #tabListWrap {
    height: 92%;
    // display: flex;
    // flex-direction: column;
    .bscroll {
      height: 100%;
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
