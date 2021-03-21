<template>
  <div class="users-filter-container">
    <form @submit.prevent>
      <div class="box">
        <!-- <label for="search">Podaj nazwisko</label> -->
        <input
          @input="setFilters"
          v-model.trim="last_name"
          type="text"
          id="search"
          placeholder="Podaj nazwisko"
        />
      </div>
      <div class="box">
        <!-- <label for="from">Wiek od:</label> -->
        <input
          @input="setFilters"
          v-model.trim="age_from"
          placeholder="Wiek od:"
          type="number"
        />
        <!-- <label for="to">Wiek do:</label> -->
        <input
          @input="setFilters"
          v-model.trim="age_to"
          placeholder="Wiek do:"
          type="number"
        />
      </div>
      <div class="">
        <button @click="setFilters">Szukaj</button>
      </div>
    </form>
    <div class="add-user-container">
      <button @click="openModal" class="add-user-btn">Dodaj</button>
    </div>
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
