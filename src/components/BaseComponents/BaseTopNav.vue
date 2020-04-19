<template>
  <ul id="top-nav-wrap">
    <li id="backArrowLeft" @click="goBack" v-show="showBackArrowLeft">
      <van-icon name="arrow-left" />
    </li>
    <li id="navBarTitle">
      <slot>头部</slot>
    </li>
    <li id="backArrowRight" class="showArrowRight">
      菜单
    </li>
  </ul>
</template>

<script>
export default {
  name: "base-top-nav",
  data() {
    return {
      /*  leftOptionsProps: {
        showBack: true,
        showMore: true,
        backText: "",
        showArrowRight: this.arrowArrowRight === "" ? false : this.arrowArrowRight
      },
      title: "hahah" */
    };
  },
  props: {
    showBackArrowLeft: {
      type: Boolean
    }
  },
  created() {
    console.log(this.showBackArrowLeft);
  },
  mounted() {
    console.log(this.showBackArrowLeft);
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
#top-nav-wrap {
  width: 100%;
  height: 3rem;
  background-color: #22a2c3;
  color: #fff;
  display: flex;
  align-items: center;
  text-align: center;
  p {
    height: 100%;
    display: flex;
    align-items: center;
  }
  #backArrowLeft {
    padding-left: 1rem;
    position: absolute;
  }
  #navBarTitle {
    max-width: 60%;
    margin: 0 auto;
    color: #323233;
    font-weight: 500;
    font-size: 16px;
  }
  #backArrowRight {
    padding-right: 1rem;
    visibility: hidden;
    position: absolute;
  }
  // .this.arrowTitleRight {
  //   visibility: show;
  // }
}
</style>
