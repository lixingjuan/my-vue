<template>
  <div id="top-nav-wrap">
    <x-header
      :title="title"
      :leftOptions="leftOptionsProps"
      @header-background-color="
        'red';


      "
    ></x-header>
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
// #top-nav-wrap {
//   width: 100%;
//   height: 40px;
//   background-color: #888;
//   position: fixed;
//   top: 0;
//   line-height: 40px;
// }
</style>
