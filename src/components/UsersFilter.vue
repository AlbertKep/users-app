<template>
  <div class="users-filter-container">
    <form @submit.prevent="setFilters">
      <div class="last-name-filter">
        <input
          v-model.trim="lastName"
          type="text"
          id="search"
          placeholder="Podaj nazwisko"
          @keyup="validForm"
        />
      </div>
      <div class="age-filters">
        <input
          v-model.trim="ageFrom"
          placeholder="Wiek od:"
          type="text"
          @keyup="validForm"
        />
        <input
          v-model.trim="ageTo"
          placeholder="Wiek do:"
          type="text"
          @keyup="validForm"
        />
      </div>
      <div class="btns-container">
        <button class="btn search-button" :disabled="isDisabled">Szukaj</button>
        <button class="btn" @click="openModal">Dodaj Użytkownika</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lastName: "",
      ageFrom: null,
      ageTo: null,
      patterns: {
        lastName: /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,}$/,
        age: /^\d{1,3}$/,
      },
      isDisabled: true,
    };
  },
  computed: {
    testLastName() {
      return this.patterns.lastName.test(this.lastName);
    },
    testAgeFrom() {
      return this.patterns.age.test(this.ageFrom);
    },
    testAgeTo() {
      return this.patterns.age.test(this.ageTo);
    },
  },
  methods: {
    validForm() {
      if (this.lastName && this.testAgeFrom && this.testAgeTo) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
    },
    setFilters() {
      console.log("szukaj");
      this.$store.dispatch("setFilters", {
        lastName: this.lastName,
        ageFrom: this.ageFrom,
        ageTo: this.ageTo,
      });
    },
    openModal() {
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
    width: 50%;
    border: none;
    color: #fff;
    font-size: 1em;
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
    font-size: 1em;
    padding: 0.5em;
    border: 1px solid #fff;
    margin: 0.3em;
    &:hover {
      background-color: #fff;
      color: #473bbb;
    }
    &:disabled {
      opacity: 0.5;
    }
  }
}
</style>
