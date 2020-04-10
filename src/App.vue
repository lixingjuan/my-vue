<template>
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
	name: "App",
	components: {
		// HelloWorld
	},
	watch: {
		$route(to, from) {
			const toDepth = to.path.split("/").length;
			const fromDepth = from.path.split("/").length;
			this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
		}
	}
};
</script>

<style scoped lang="scss">
#app {
  color: #2c3e50;
  height: 100%;
  text-align: center;
  display: flow-root;
  background-color: $page-bg-color;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
