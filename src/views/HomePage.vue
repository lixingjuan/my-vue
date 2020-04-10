<template>
  <div>
    <base-top-nav></base-top-nav>
    <div id="page_body">
      <div><a href="/DemoPage">DemoPage</a></div>
      <div><a href="/HomePage">HomePage</a></div>
      <div><a href="/ScrollPage">ScrollPage</a></div>
      <div><a href="/TodoPage">TodoPage</a></div>
    </div>
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
