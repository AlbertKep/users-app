<template>
  <div class="container">
    <table>
      <tr>
        <!-- <th class="data" scope="col">Id</th> -->
        <th class="data" scope="col">Imię</th>
        <th class="data" scope="col">Nazwisko</th>
        <th class="data" scope="col">Kod Pocztowy</th>
        <th class="data" scope="col">Ulica</th>
        <th class="data" scope="col">Miasto</th>
        <th class="data" scope="col">Wiek</th>
      </tr>
      <tr v-for="user in filterUsers" :key="user.id">
        <!-- <td class="data">{{ user.id }}</td> -->
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
    // console.log(this.$store.state.filters);
    // return this.$store.getters.filterUsers;
  },
  // watch: {
  //   users(filteredUsers) {
  //     // console.log("filtered" + filteredUsers, "users" + users);
  //     return filteredUsers;
  //   },
  // },
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

<style scoped lang="scss"></style>
