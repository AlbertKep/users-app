<template>
  <div class="user-container">
    <h2 class="header-title-name">
      {{ user.first_name }} {{ user.last_name }}
    </h2>
    <table class="user-table">
      <tr class="user-data">
        <th>Ulica:</th>
        <td>{{ user.street }}</td>
      </tr>
      <tr class="user-data">
        <th>Kod Pocztowy:</th>
        <td>{{ user.postal_code }}</td>
      </tr>
      <tr class="user-data">
        <th>Miasto:</th>
        <td>{{ user.city }}</td>
      </tr>
    </table>
    <div class="btn-container">
      <button @click="goHome">Wróć</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: [],
    };
  },
  methods: {
    getUser() {
      const id = parseInt(this.$route.params.id);
      console.log(typeof id);
      const users = this.$store.getters.users;
      users.forEach((user) => {
        if (user.id === id) {
          this.user = user;
          this.$store.dispatch("getUser", this.user);
        }
      });
    },
    getUserFromLocalStorage() {
      this.user = JSON.parse(localStorage.getItem("vuex")).keepUser;
    },
    goHome() {
      this.$router.push("/");
    },
  },
  mounted() {
    if (this.$store) {
      this.getUserFromLocalStorage();
    }
    this.getUser();
  },
};
</script>
<style lang="scss" scoped>
.user-container {
  color: #fff;
  // height: 100vh;

  .header-title-name {
    text-align: left;
    margin: 2.5em 1.5em;
  }
  .user-data {
    text-align: left;
    th,
    td {
      padding: 0.7em;
    }
  }
  .user-table {
    margin: 5em 0 0 1.5em;
  }
  .btn-container {
    position: fixed;
    bottom: 2em;
    left: 2em;
    button {
      border: none;
      cursor: pointer;
      color: #fff;
      background-color: #473bbb;
      font-size: 1em;
      padding: 0.5em 0.9em;
      border: 1px solid #fff;
      margin: 0.3em;
      &:hover {
        background-color: #fff;
        color: #473bbb;
      }
    }
  }
}
</style>