<template>
  <div class="users-filter-container">
    <form class="users-filter-form" @submit.prevent="setFilters">
      <div class="last-name-filter">
        <input
          class="last-name-input"
          v-model.trim="lastName"
          type="text"
          id="search"
          placeholder="Podaj nazwisko"
          @keyup="validForm"
        />
      </div>
      <div class="age-filters">
        <input
          class="age-input"
          v-model.trim="ageFrom"
          placeholder="Wiek od:"
          type="text"
          @keyup="validForm"
        />
        <input
          class="age-input"
          v-model.trim="ageTo"
          placeholder="Wiek do:"
          type="text"
          @keyup="validForm"
        />
      </div>
      <div class="btns-container">
        <button v-if="listUsers" class="btn" @click="getUsers">Lista</button>
        <button class="btn search-button" :disabled="isDisabled">Szukaj</button>
        <button class="btn" @click="openModal">Dodaj</button>
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
      listUsers: false,
    };
  },
  computed: {
    filteredUsers() {
      return this.$store.getters.filteredUsers;
    },
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
      this.listUsers = true;
      this.$store.dispatch("setFilters", {
        lastName: this.lastName,
        ageFrom: this.ageFrom,
        ageTo: this.ageTo,
      });
    },
    openModal() {
      this.$store.dispatch("modalIsOpen");
    },
    resetInputs() {
      (this.lastName = ""), (this.ageFrom = null), (this.ageTo = null);
    },
    getUsers() {
      this.resetInputs();
      this.$store.getters.filteredUsers;
      setTimeout(() => {
        this.listUsers = false;
      }, 50);
    },
  },
};
</script>
<style lang="scss" scoped>
.users-filter-container {
  padding-top: 0.5em;
  background-color: #473bbb;
  .last-name-filter,
  .age-filters {
    padding: 1em;
  }
  .age-filters {
    display: flex;
    justify-content: center;
  }
  .last-name-input,
  .age-input {
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
@media only screen and (min-width: 768px) {
  .users-filter-form {
    display: grid;
  }
  .users-filter-form {
    grid-template-columns: repeat(3, 33%);
  }
  .btns-container {
    margin: auto;
  }
}
</style>
