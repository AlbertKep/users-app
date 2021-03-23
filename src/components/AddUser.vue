<template>
  <div class="add-user-container" v-if="modalIsOpen">
    <div class="close-modal-container">
      <button class="close-modal-btn" @click="closeModal">X</button>
    </div>
    <form @submit.prevent="addUser" class="add-user-form">
      <div class="box">
        <input
          v-model="newUser.first_name"
          type="text"
          placeholder="Imię"
          @keyup="validForm"
        />
        <p v-if="!testFirstName" class="field-description">
          Imię powinno zawierać tylko litery (min. 3)
        </p>
      </div>
      <div class="box">
        <input
          v-model="newUser.last_name"
          type="text"
          placeholder="Nazwisko"
          @keyup="validForm"
        />
        <p v-if="!testLastName" class="field-description">
          Nazwisko powinno zawierać tylko litery (min. 3)
        </p>
      </div>
      <div class="box">
        <input
          v-model="newUser.street"
          type="text"
          placeholder="Ulica"
          @keyup="validForm"
        />
        <p v-if="!testStreet" class="field-description">
          Ulica powinno zawierać tylko litery (min. 3)
        </p>
      </div>
      <div class="box">
        <input
          v-model="newUser.postal_code"
          type="text"
          placeholder="Kod Pocztowy"
          @keyup="validForm"
        />
        <p v-if="!testPostalCode" class="field-description">
          Na przykład 41-800
        </p>
      </div>

      <div class="box">
        <input
          v-model="newUser.city"
          type="text"
          placeholder="Miasto"
          @keyup="validForm"
        />
        <p v-if="!testCity" class="field-description">
          Miasto powinno zawierać tylko litery (min. 3)
        </p>
      </div>
      <div class="box">
        <input
          v-model="newUser.age"
          type="text"
          placeholder="Wiek"
          @keyup="validForm"
        />
        <p v-if="!testAge" class="field-description">Wiek do 3 cyfr</p>
      </div>
      <div class="close-modal-container">
        <button class="btn add-user-btn" :disabled="isDisabled">
          {{ buttonText }}
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newUser: {
        first_name: "",
        last_name: "",
        postal_code: "",
        street: "",
        city: "",
        age: "",
      },
      isDisabled: true,
      buttonText: "Uzupełnij Dane",
      patterns: {
        textField: /^[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ]{3,}$/,
        postalCode: /^(\d{2})-(\d{3})$/,
        age: /^\d{1,3}$/,
      },
    };
  },
  computed: {
    modalIsOpen() {
      return this.$store.state.modalIsOpen;
    },
    editUserModal() {
      return this.$store.state.editUserModal;
    },
    testFirstName() {
      return this.patterns.textField.test(this.newUser.first_name);
    },
    testLastName() {
      return this.patterns.textField.test(this.newUser.last_name);
    },
    testStreet() {
      return this.patterns.textField.test(this.newUser.street);
    },
    testCity() {
      return this.patterns.textField.test(this.newUser.city);
    },
    testPostalCode() {
      return this.patterns.postalCode.test(this.newUser.postal_code);
    },
    testAge() {
      return this.patterns.age.test(this.newUser.age);
    },
  },
  methods: {
    addUser() {
      this.$store.dispatch("addUser", {
        first_name: this.newUser.first_name,
        last_name: this.newUser.last_name,
        street: this.newUser.street,
        postal_code: this.newUser.postal_code,
        city: this.newUser.city,
        age: this.newUser.age,
      });
      this.closeModal();
    },
    validForm() {
      if (
        this.testFirstName &&
        this.testLastName &&
        this.testStreet &&
        this.testCity &&
        this.testPostalCode &&
        this.testAge
      ) {
        this.isDisabled = false;
        this.buttonText = "Dodaj";
      } else {
        this.isDisabled = true;
        this.buttonText = "Uzupełnij Dane";
      }
      return this.isDisabled;
    },
    closeModal() {
      this.$store.dispatch("modalIsOpen");
    },
  },
};
</script>
<style lang="scss" scoped>
.add-user-container {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 999;
  opacity: 0.9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .add-user-form {
    background-color: #fff;
  }
  .box {
    margin: 1em;

    input {
      border: none;
      color: #473bbb;
      font-size: 1em;
      padding: 0.3em;
      border-bottom: 1px solid #473bbb;
      &::placeholder {
        color: #473bbb;
        opacity: 0.7;
      }
    }
    .field-description {
      font-size: 0.7em;
    }
  }
  .close-modal-container {
    align-self: flex-end;
    margin: 20px;
    .close-modal-btn {
      border: none;
      background: transparent;
      color: #473bbb;
      font-size: 1.3em;
    }
    .btn {
      border: none;
      cursor: pointer;
      color: #fff;
      background-color: #473bbb;
      font-size: 1em;
      &:disabled {
        opacity: 0.5;
      }
    }
  }
  .add-user-btn {
    padding: 0.5em;
    border: 1px solid #473bbb;
    &:hover {
      background-color: #473bbb;
      color: #fff;
    }
  }
}
</style>
