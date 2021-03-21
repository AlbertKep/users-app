<template>
  <h1 class="title">Users App</h1>
  <users-filter />
  <users-list />
  <add-user />
</template>

<script>
import UsersFilter from "./components/UsersFilter";
import UsersList from "./components/UsersList";
import AddUser from "./components/AddUser";

export default {
  name: "App",
  components: {
    UsersFilter,
    UsersList,
    AddUser,
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
