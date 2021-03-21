<template>
  <div class="users-filter-container">
    <form @submit.prevent="setFilters">
      <div class="last-name-filter">
        <!-- <label for="search">Podaj nazwisko</label> -->
        <input
          v-model.trim="last_name"
          type="text"
          id="search"
          placeholder="Podaj nazwisko"
        />
      </div>
      <div class="age-filters">
        <!-- <label for="from">Wiek od:</label> -->
        <input v-model.trim="age_from" placeholder="Wiek od:" type="number" />
        <!-- <label for="to">Wiek do:</label> -->
        <input v-model.trim="age_to" placeholder="Wiek do:" type="number" />
      </div>
      <div class="btns-container">
        <button class="btn">Szukaj</button>
        <button class="btn" @click="openModal">Dodaj</button>
      </div>
    </form>
    <!-- <div class="add-user-container"> -->
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      last_name: "",
      age_from: null,
      age_to: null,
    };
  },
  methods: {
    setFilters() {
      this.$store.dispatch("setFilters", {
        last_name: this.last_name,
        age_from: this.age_from,
        age_to: this.age_to,
      });
    },
    openModal() {
      console.log("fired");
      this.$store.dispatch("modalIsOpen");
    },
  },
};
</script>
<style lang="scss" scoped>
.users-filter-container {
  padding-top: 0.5em;
  background-color: #473bbb;
  .age-filters {
    display: flex;
    justify-content: center;
    padding: 1em;
  }
  input {
    width: 30%;
    border: none;
    color: #fff;
    font-size: 0.7em;
    padding: 0.5em;
    background-color: #473bbb;

    border-bottom: 1px solid #fff;
    &::placeholder {
      color: #fff;
      background-color: #473bbb;
    }
  }
  .btn {
    border: none;
    cursor: pointer;
    color: #fff;
    background-color: #473bbb;
    font-size: 0.7em;
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
