<template>
  <div class="users-list-container">
    <table class="users-table">
      <tr class="users-row">
        <th class="property" scope="col">Imię</th>
        <th class="property" scope="col">Nazwisko</th>
        <th class="property" scope="col">Wiek</th>
      </tr>

      <tr v-for="user in filterUsers" :key="user.id">
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
import { mapGetters } from "vuex";
export default {
  name: "UsersList",
  computed: {
    ...mapGetters(["filterUsers"]),
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
    font-size: 0.8em;
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
</style>
