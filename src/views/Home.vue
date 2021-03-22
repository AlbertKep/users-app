<template>
  <h1 class="title">Users App</h1>

  <users-filter />
  <users-list />
  <add-user />
</template>

<script>
import UsersFilter from "../components/UsersFilter";
import UsersList from "../components/UsersList";
import AddUser from "../components/AddUser";

export default {
  name: "App",
  components: {
    UsersFilter,
    UsersList,
    AddUser,
  },
};
</script>
