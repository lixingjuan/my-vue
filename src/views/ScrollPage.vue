<template>
  <div class="pageContrainer">
    <base-top-nav></base-top-nav>
    <ul id="tabTitleWrap">
      <li @click="changeTab('TODO')">TODO</li>
      <li @click="changeTab('DONE')">DONE</li>
    </ul>
    <!-- <p class="drop-down" v-show="dropDown">松手刷新数据...</p> -->
    <p class="drop-down">松手刷新数据...</p>
    <div class="bscroll" ref="bscroll">
      <div class="bscroll-container">
        <ul>
          <li v-for="(item, index) in listData" :key="item.uuid" class="item">
            {{ index }}+{{ item.todoText }}
          </li>
        </ul>
      </div>
    </div>
    <p class="x">加载更多...</p>
  </div>
</template>

<script>
import BScroll from "better-scroll";

import BaseTopNav from "@/components/BaseComponents/BaseTopNav.vue";

import { queryTodoItemsAPI } from "@/request";

export default {
  data() {
    return {
      dropDown: false,
      listData: [],
      isTodo: true,
      currentPage: 0
    };
  },
  created() {
    // this.listData.length = 30;
    this.queryData();
  },
  watch: {
    isTodo: function() {
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
        isComplete: !this.isTodo
      };
      console.log(params);
      const res = await queryTodoItemsAPI(params);
      console.log(res);
      this.listData = res;
    },
    scrollFn() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.bscroll, {
            click: false, //better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件，我们会给派发的 event 参数加一个私有属性 _constructed，值为 true。
            probeType: 2, //这个属性设置之后可以监听得到了
            mouseWheel: true
          });
        } else {
          this.scroll.refresh();
        }

        this.scroll.on("scroll", pos => {
          console.log(pos.y, this.dropDown);

          //如果下拉超过50px 就显示下拉刷新的文字
          if (pos.y > 50) {
            this.dropDown = true;
          } else {
            this.dropDown = false;
          }
        });

        //touchEnd（手指离开以后触发） 通过这个方法来监听下拉刷新
        this.scroll.on("touchEnd", pos => {
          console.log("纵向最大高度maxScrollY", this.scroll.maxScrollY);

          // 下拉动作
          if (pos.y > 50) {
            console.log("下拉刷新成功");
            this.dropDown = false;
          }

          if (this.scroll.maxScrollY > pos.y) {
            console.log("加载更多的时机");
          }
        });

        this.scroll.on("scrollEnd", pos => {
          console.log("pos", pos);
          console.log("scrollEnd");
        });
        console.log(this.scroll.maxScrollY);
      });
    },
    changeTab(todoOrDone) {
      console.log(todoOrDone);
      this.isTodo = todoOrDone === "TODO";
      //
      // 如果用户改变了tab, 则再
    }
  }
};
</script>

<style scoped>
.pageContrainer {
  height: 100%;
}
.bscroll {
  width: 100%;
  height: 90%;
  overflow: hidden;
}
.bscroll-container {
  background: grey;
}
.drop-down {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 0.8rem;
  color: #ccc;
}
#tabTitleWrap {
  width: 100;
  height: 2rem;
  display: flex;
  padding: 0rem;
  list-style: none;
  line-height: 2rem;
  justify-content: space-around;
}
.item {
  list-style: none;
  padding-top: 2rem;
  margin-top: 1rem;
  line-height: 1rem;
  background: green;
}
</style>
