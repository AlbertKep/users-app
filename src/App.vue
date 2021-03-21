<template>
  <h1>Users App</h1>
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
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  margin-top: 60px;
  background-color: #473bbb;
}
</style>
