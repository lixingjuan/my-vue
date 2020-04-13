/* 函数防抖 */
<template>
  <div>
    <div>
      <h2>函数防抖</h2>
      <p>未防抖</p>
      <input v-model="notDebounce" />
      <p>已防抖</p>
      <input v-model="isDebounce" />
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      notDebounce: "",
      isDebounce: ""
    };
  },
  computed: {},
  watch: {
    notDebounce: function() {
      /* 监听 */
    },
    isDebounce: function() {}
  },
  created() {},
  methods: {}
};
</script>

<style scoped></style>
