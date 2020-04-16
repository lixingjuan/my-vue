<template>
  <div id="tabListWrap" class="bscroll" ref="bscroll">
    <div
      ref="bscrollContainer"
      :class="{ 'bscroll-container': true, innerShorterOuter: innerShorterOuter }"
    >
      <p id="drop-down" v-show="showPullingDown">
        <van-loading color="#1989fa" size="24">松手刷新数据</van-loading>
      </p>
      <slot></slot>

      <p id="drop-up" v-show="showPullingUp">
        <van-loading color="#1989fa" size="24">加载更多</van-loading>
      </p>

      <p id="noMoreData" v-show="showNoMoreData">我是有底线的...</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";

export default {
  name: "",
  components: {
    // DataList
  },
  props: {},
  data() {
    return {
      showPullingUp: false, // 用户正在上拉 && 高度大于设定值
      showPullingDown: false, // 用户正在下拉 && 高度大于设定值
      showNoMoreData: false, // 没有更多数据
      showPageloading: false, // 页面全局loading
      innerShorterOuter: true // 列表的高度是否大于滚动外层的高度
    };
  },
  computed: {},
  watch: {},
  props: {},
  created() {},
  mounted() {
    this.scrollFn();
  },

  computed: mapState({
    currentPage: state => state.ModulePartScroll.currentPage,
    pageLoading: state => state.ModulePartScroll.pageLoading,
    currentTabComponent: state => state.ModulePartScroll.currentTabComponent
  }),

  methods: {
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

        /* 滚动开始之前 */
        this.scroll.on("beforeScrollStart", () => {
          // TODO: 解决内部若小于外层时，无法下拉的问题
          // 计算内层高度是否小于外层高度;
          const bscrollHeight = this.$refs.bscroll.offsetHeight;
          const bscrollInnerContainer = this.$refs.bscrollContainer.offsetHeight;
          // TODO: 这里获取的 this.$refs.bscrollListComponent.$refs.bscrollDataList 为什么没有子DOM节点？？？
          this.innerShorterOuter = bscrollInnerContainer <= bscrollHeight;
          console.log(this.innerShorterOuter);
        });

        /* 滚动事件 */
        this.scroll.on("scroll", pos => {
          // 最大滚动长度
          if (pos.y > 50) {
            console.log("此时显示下拉箭头");
            this.showPullingDown = true;
          } else {
            this.showPullingDown = false;
          }

          // 显示加载更多
          // 当前 ‘最大滚动高度’ 为真 && ‘我是有底线的’为假
          if (pos.y - this.scroll.maxScrollY < 20 && !this.showNoMoreData && this.maxScrollLength) {
            this.showPullingUp = true;
          } else {
            this.showPullingUp = false;
          }
        });

        /* 滑动结束事件 */
        this.scroll.on("touchEnd", pos => {
          // 【下拉刷新】
          // 若用户【下拉】大于某高度，则触发重新请求动作
          if (pos.y > 50) {
            console.log("此时触发刷新动作");
            // 刷新请求步骤
            // 1. 置1分页参数
            // this.currentPage = 1;
            this.$store.commit("setCurrentPage", 1);

            // 2. 清空数据源
            this.$store.commit("clearListData");

            // 3. 隐藏 ‘上拉加载更多’ 提示
            this.showPullingDown = false;

            // 4. 默认显示全页面loading
            this.$store.commit("setPageLoading", true);

            // 5. 调用请求数据接口
            this.$store.dispatch("queryDataAction");
          }

          // 【上拉加载】
          //  用户【上拉】高度大于最大滑动高度20 && 当前未显示没有更多数据 则请求更多数据
          if (pos.y && pos.y - this.scroll.maxScrollY < 20 && !this.showNoMoreData) {
            console.log(pos.y);
            console.log(this.scroll.maxScrollY);
            console.log("pos.y - this.scroll.maxScrollY", pos.y - this.scroll.maxScrollY);
            console.log("触发了上拉加载");
            // 请求更多数据 步骤
            // 1. 设置当前分页参数+1
            this.$store.commit("setCurrentPage", this.currentPage + 1);

            // 2. 默认显示全页面loading
            this.$store.commit("setPageLoading", true);

            // 3. 调用查询接口
            this.$store.dispatch("queryDataAction");

            // this.queryData();
            // 4. 隐藏加载更多loading
            this.showPullingUp = false;
          } else {
            console.log("不满足请求条件");
          }
        });

        console.log(this.scroll.maxScrollY);
      });
    }
  }
};
</script>

<style scoped lang="scss">
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
</style>
