<template>
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
    <base-scroll-container>
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
    </base-scroll-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { DataList, BaseScrollContainer } from "@/components/PartScrollComponents";

export default {
  name: "",
  components: {
    DataList,
    BaseScrollContainer
  },
  props: {},
  data() {
    return {
      todoListData: [],
      doneListData: []
    };
  },
  computed: mapState({
    currentTabComponent: state => state.ModulePartScroll.currentTabComponent,
    listData: state => state.ModulePartScroll.listData
  }),

  watch: {
    listData: function() {
      switch (this.currentTabComponent) {
        case "TODO":
          this.todoListData = this.listData;
          break;
        case "DONE":
          this.doneListData = this.listData;
          break;
      }
    }
  },
  created() {},
  methods: {
    changeTab(todoOrDoneComponent) {
      console.log("this.currentTabComponent", this.currentTabComponent);
      // 1. 显示全局loading
      this.pageLoading = true;

      // 2. 改变 正在显示组件名称
      this.$store.commit("setCurrentTabComponent", todoOrDoneComponent);

      // 3. 立刻改变当前的分页页数
      this.$store.commit("setCurrentPage", 1);

      // 4. 清空 '当前显示组件的数据列表'
      this.$store.commit("clearListData");

      // // 5. 再次初始化 ‘下拉刷新’ ‘上拉加载’ ‘我是有底线的’ '可合并' 的 真假
      // this.dataStatusShowObj = {
      //   ...this.dataStatusShowObj, // 以防后来又为该对象加入数据
      //   showPullingUp: false, // 用户正在上拉 && 高度大于设定值
      //   showPullingDown: false, // 用户正在下拉 && 高度大于设定值
      //   showNoMoreData: false, // 没有更多数据
      //   showPageloading: false, // 页面全局loading
      //   maxScrollLength: 0 // 页面最大下拉高度
      // };

      // 6. 默认显示全页面loading
      // this.pageLoading = true;
      // 7.设置防抖，触发父组件重新发起请求
      // this.$emit("queryDataEvent");
      this.$store.dispatch("queryDataAction");
    }
  }
};
</script>

<style scoped lang="scss">
#pageBody {
  height: 92%;
  #tabTitleWrap {
    display: flex;
    align-items: center;
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
}
</style>
