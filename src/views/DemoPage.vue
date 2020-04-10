<template>
  <div>
    <base-top-nav></base-top-nav>
    <div id="demo"></div>
    <van-loading color="#1989fa" size="24">1111</van-loading>

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
#demo {
  width: 10px;
}
</style>
