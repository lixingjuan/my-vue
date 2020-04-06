<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    // HelloWorld
  }
};
</script>

<style lang="scss">
#app {
  color: red;
}
// #app {
//   color: #2c3e50;
//   text-align: center;
//   // background-color: $page-bg-color;
//   -moz-osx-font-smoothing: grayscale;
//   -webkit-font-smoothing: antialiased;
//   font-family: Avenir, Helvetica, Arial, sans-serif;
// }
</style>
