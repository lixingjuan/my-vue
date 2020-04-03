<template>
  <div>
    <tab>
      <tab-item></tab-item>
    </tab>
  </div>
</template>

<script>
import Vue from "vue";

import { Tab, TabItem } from "vux";

Vue.use(Tab);
Vue.use(TabItem);

export default {
  name: "",
  components: {
    Tab,
    TabItem
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    handler() {
      console.log(1);
    }
  }
};
</script>

<style scoped></style>
