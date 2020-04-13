/* 函数防抖 */
<template>
  <div>
    <base-top-nav>函数防抖和节流</base-top-nav>
    <div @click="isDebounceEvent">已防抖</div>
    <!-- <div>
      <label for="notDebounce">未防抖</label>
      <input id="notDebounce" v-model="notDebounce" @change="notDebounceEvent" />
      <div>{{ notDebounce }}</div>
    </div>
    <div>
      <label for="isDebounce">已防抖</label>
      <input id="isDebounce" v-model="isDebounce" />
      <div>{{ isDebounce }}</div>
    </div> -->
  </div>
</template>

<script>
import BaseTopNav from "@/components/BaseComponents/BaseTopNav.vue";

export default {
  name: "",
  components: {
    BaseTopNav
  },
  props: {},
  data() {
    return {
      notDebounce: "未防抖",
      isDebounce: "已防抖"
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    notDebounceEvent() {
      console.log(1);
      console.log(this.notDebounce);
    },
    isDebounceEvent() {},
    debounce(fun, delay) {
      return function(args) {
        let that = this;
        let _args = args;
        clearTimeout(fun.id);
        fun.id = setTimeout(function() {
          fun.call(that, _args);
        }, delay);
      };
    }
  }
};
</script>

<style scoped></style>
