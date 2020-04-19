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
      // 1. 显示全局loading
      this.$store.commit("setPageLoading", true);

      // 2. 改变 正在显示组件名称
      this.$store.commit("setCurrentTabComponent", todoOrDoneComponent);

      // 3. 立刻改变当前的分页页数
      this.$store.commit("setCurrentPage", 1);

      // 4. 清空 '当前显示组件的数据列表'
      this.$store.commit("clearListData");

      // 5. 触发再次请求
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
    width: 100%;
    height: 3rem;
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
