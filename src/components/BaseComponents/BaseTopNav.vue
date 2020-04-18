<template>
  <div id="top-nav-wrap">
    <p id="backArrowLeft"><van-icon name="arrow-left" /></p>
    <p id="backTitle"><slot>头部</slot></p>
    <p id="backArrowRight" :class="{ showArrowRight: showArrowRight }">
      <van-icon name="arrow " />
    </p>
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
        backText: "",
        showArrowRight: this.arrowArrowRight === "" ? false : this.arrowArrowRight
      },
      title: "hahah"
    };
  },
  props: {
    arrowArrowRight: {
      type: Boolean
    }
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
  justify-content: space-between;
  p {
    height: 100%;
    display: flex;
    align-items: center;
  }
  #backArrowLeft {
    padding-left: 1rem;
  }
  // #backArrow {
  // }
  #backArrowRight {
    padding-right: 1rem;
    visibility: hidden;
  }
  // .this.arrowTitleRight {
  //   visibility: show;
  // }
}
</style>
