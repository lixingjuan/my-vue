<template>
  <div id="top-nav-wrap">
    <slot>头部</slot>
  </div>
</template>

<script>
export default {
  name: "base-top-nav",
  data() {
    return {
      leftOptionsProps: {
        showBack: true,
        showMore: true,
        backText: ""
      },
      title: "hahah"
    };
  },
  components: {}
};
</script>

<style scoped lang="scss">
#top-nav-wrap {
  width: 100%;
  height: 8%;
  background-color: #1252b1;
  color: #fff;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  // position: fixed;
  // top: 0;
  //   line-height: 40px;
}
</style>
