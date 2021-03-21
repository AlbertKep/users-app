<template>
  <div class="users-list-container">
    <table>
      <tr>
        <th class="property" scope="col">Imię</th>
        <th class="property" scope="col">Nazwisko</th>
        <th class="property" scope="col">Kod Pocztowy</th>
        <th class="property" scope="col">Ulica</th>
        <th class="property" scope="col">Miasto</th>
        <th class="property" scope="col">Wiek</th>
      </tr>
      <tr v-for="user in filterUsers" :key="user.id">
        <td class="data">{{ user.first_name }}</td>
        <td class="data">{{ user.last_name }}</td>
        <td class="data">{{ user.postal_code }}</td>
        <td class="data">{{ user.street }}</td>
        <td class="data">{{ user.city }}</td>
        <td class="data">{{ user.age }}</td>
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
  .property,
  .data {
    font-size: 0.6em;
  }
}
</style>
