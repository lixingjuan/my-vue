<template>
  <div>
    主页

    <button-tab>
      <button-tab-item>今天</button-tab-item>
      <button-tab-item selected>明天</button-tab-item>
      <button-tab-item>昨天</button-tab-item>
    </button-tab>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {
    console.log(this.$store.state.moduleTodo);
  },
  methods: {}
};
</script>

<style scoped></style>
