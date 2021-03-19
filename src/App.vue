<template>
  <h1>Users App</h1>
  <users-filter />
  <users-list />
</template>

<script>
import UsersFilter from "./components/UsersFilter";
import UsersList from "./components/UsersList";

export default {
  name: "App",
  components: {
    UsersFilter,
    UsersList,
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
