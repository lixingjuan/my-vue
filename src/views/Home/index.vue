<template>
  <div>主页</div>
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
