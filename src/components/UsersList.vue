<template>
  <div class="users-list-container">
    <p v-if="filteredUsers.length === 0">Brak wyników</p>
    <table v-else class="users-table">
      <tr class="users-row">
        <th class="property" scope="col">Imię</th>
        <th class="property" scope="col">Nazwisko</th>
        <th class="property" scope="col">Wiek</th>
      </tr>

      <tr v-for="user in filteredUsers" :key="user.id">
        <td class="data">{{ user.first_name }}</td>
        <td class="data">{{ user.last_name }}</td>
        <td class="data">{{ user.age }}</td>
        <td class="data">
          <router-link :to="`/${user.id}`" class="btn go-to-user">
            Profil
          </router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "UsersList",
  computed: {
    filteredUsers() {
      return this.$store.getters.filteredUsers;
    },
  },
  methods: {
    getUsersList() {
      this.$store.dispatch("getUsers");
    },
  },
  mounted() {
    this.getUsersList();
  },
};
</script>

<style scoped lang="scss">
.users-list-container {
  padding-top: 1.2em;
  background-color: #473bbb;
  color: #fff;
  display: flex;
  justify-content: center;
  .users-table {
    border-collapse: collapse;
    border-spacing: 1em;
  }
  .users-row {
    border-bottom: 1px solid #fff;
  }
  .property,
  .data {
    font-size: 1em;
    padding: 1em 0.3em;
  }
  .go-to-user {
    text-decoration: none;
  }
  .btn {
    border: none;
    cursor: pointer;
    color: #fff;
    background-color: #473bbb;
    font-size: 0.8em;
    padding: 0.5em;
    border: 1px solid #fff;
    margin: 0.3em;
    &:hover {
      background-color: #fff;
      color: #473bbb;
    }
  }
}
@media only screen and (min-width: 425px) {
  .users-table {
    width: 80%;
  }
}
@media only screen and (min-width: 768px) {
  .users-table {
    margin-top: 1em;
    width: 80%;
  }
}
</style>
