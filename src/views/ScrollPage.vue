<template>
  <div class="pageContrainer bscroll" ref="bscroll">
    <div class="bscroll-container">
      <p id="drop-down" v-show="showDropDown">
        <van-loading color="#1989fa" size="24">松手刷新数据</van-loading>
      </p>

      <base-top-nav></base-top-nav>

      <ul id="tabTitleWrap">
        <li @click="changeTab('TODO')">TODO</li>
        <li @click="changeTab('DONE')">DONE</li>
      </ul>

      <ul id="tabListWrap">
        <li v-for="item in listData" :key="item.id" class="item">
          {{ item.id }}+{{ item.todoText }}
        </li>
      </ul>

      <p id="drop-up" v-show="showDropUp">
        <van-loading color="#1989fa" size="24">加载更多</van-loading>
      </p>
      <p class="noMoreData" v-show="showNoMoreData">我是有底线的...</p>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import BaseTopNav from "@/components/BaseComponents/BaseTopNav.vue";

import { queryTodoItemsAPI } from "@/request";

export default {
  data() {
    return {
      isTodo: true,
      listData: [],
      currentPage: 1,
      showDropUp: false,
      showDropDown: false,
      showNoMoreData: false,
      maxScrollLength: false,
      // canConcat: true,
      pageSize: 10
    };
  },
  created() {
    // this.listData.length = 30;
    this.queryData();
  },
  watch: {
    isTodo: function() {
      // 若用户切换了tab,
      // 1. 立刻改变当前的分页页数
      // 2. 并清空当前数据列表
      // 3. 再次初始化 ‘下拉刷新’ ‘上拉加载’ ‘我是有底线的’ '可合并'
      // 4. 重新发起请求
      this.currentPage = 1;
      this.listData = [];

      this.showDropUp = false;
      this.showDropDown = false;
      this.showNoMoreData = false;
      // this.canConcat = true;

      this.queryData();
    }
  },
  mounted() {
    this.scrollFn();
  },
  components: {
    BaseTopNav
  },
  methods: {
    async queryData() {
      console.log(this.isTodo);
      const params = {
        isComplete: !this.isTodo,
        page: this.currentPage,
        pageSize: 10
      };
      const res = await queryTodoItemsAPI(params);
      const { length } = res;
      // 请求成功后，设置 ‘刷新’和‘加载更多’为false
      console.log("maxScrollLength", this.maxScrollLength);

      this.showNoMoreData = length === 0 && this.maxScrollLength;
      // console.log("canConcat", this.canConcat);
      this.listData = [...this.listData, ...res];
      // 若某次返回的数据长度小于分页参数，则下次请求不需要合并返回数据与原来数据
      // this.canConcat = length === this.pageSize;
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

    changeTab(todoOrDone) {
      console.log(todoOrDone);
      this.isTodo = todoOrDone === "TODO";
    }
  }
};
</script>

<style scoped lang="scss">
.pageContrainer {
  height: 100%;
  background-color: #f7f7f7;
}

.bscroll-container {
  // height: 100%;
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
}
#tabListWrap {
  background-color: #f7f7f7;
  .item {
    width: 95%;
    height: 4rem;
    margin: 0.5rem auto;
    border: 0.1rem solid #fff;
    border-radius: 0.5rem;
    list-style: none;
    margin-top: 0.5rem;
    background: #fff;
    // background: green;
    // padding-top: 2rem;
    line-height: 4rem;
  }
}
#drop-up {
  position: relative;
  top: 2rem;
}
</style>
