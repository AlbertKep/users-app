<template>
  <router-view />
</template>

<script>
// import Home from "./views/Home";
export default {
  name: "App",
  components: {
    // Home,
  },
};
</script>
<style lang="scss">
body {
  padding: 0;
  margin: 0;
  background-color: #473bbb;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #473bbb;

  // margin-top: 60px;
  .title {
    text-align: left;
    padding: 1em 0.5em;
    color: #fff;
    background-color: #473bbb;
  }
}
</style>
