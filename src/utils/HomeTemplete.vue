<template>
  <div id="pageContrainer">
    <base-top-nav :showBackArrowLeft="true"></base-top-nav>
    <ul id="page_body">
      HOME_CONTRAINER
    </ul>
    <base-bottom-nav></base-bottom-nav>
  </div>
</template>

<script>
import BaseTopNav from "@/components/BaseComponents/BaseTopNav.vue";
import BaseBottomNav from "@/components/BaseComponents/BaseBottomNav.vue";

export default {
  name: "",
  components: {
    BaseTopNav,
    BaseBottomNav
  },
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {}
};
</script>

<style scoped lang="scss">
#pageContrainer {
  height: 100%;
  background-color: #f7f7f7;
}
#page_body {
  li {
    width: 95%;
    height: 3rem;
    margin: 0.5rem auto;
    border: 0.1rem solid #b2abe4;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
  }
}
</style>
