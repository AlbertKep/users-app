<template>
  <div class="edit-user-container" v-if="editUserModal">
    <div class="close-modal-container">
      <button class="close-modal-btn" @click="closeModal">X</button>
    </div>
    <div class="wrapper">
      <form @submit.prevent="editUser" class="edit-user-form">
        <div class="box">
          <input
            v-model="editedUser.first_name"
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
            v-model="editedUser.last_name"
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
            v-model="editedUser.street"
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
            v-model="editedUser.postal_code"
            type="text"
            placeholder="Kod pocztowy"
            @keyup="validForm"
          />
          <p v-if="!testPostalCode" class="field-description">
            Na przykład 41-800
          </p>
        </div>
        <div class="box">
          <input
            v-model="editedUser.city"
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
            v-model="editedUser.age"
            type="text"
            placeholder="Wiek"
            @keyup="validForm"
          />
          <p v-if="!testAge" class="field-description">Wiek do 3 cyfr</p>
        </div>
        <div class="close-modal-container">
          <button class="btn edit-user-btn" :disabled="isDisabled">
            {{ buttonText }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: Number,
  },
  data() {
    return {
      editedUser: {
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
    editUserModal() {
      return this.$store.state.editUserModal;
    },
    testFirstName() {
      return this.patterns.textField.test(this.editedUser.first_name);
    },
    testLastName() {
      return this.patterns.textField.test(this.editedUser.last_name);
    },
    testStreet() {
      return this.patterns.textField.test(this.editedUser.street);
    },
    testCity() {
      return this.patterns.textField.test(this.editedUser.city);
    },
    testPostalCode() {
      return this.patterns.postalCode.test(this.editedUser.postal_code);
    },
    testAge() {
      return this.patterns.age.test(this.editedUser.age);
    },
  },
  methods: {
    closeModal() {
      this.$store.dispatch("editUserModal");
    },
    editUser() {
      this.$store.dispatch("editUser", {
        id: this.id,
        first_name: this.editedUser.first_name,
        last_name: this.editedUser.last_name,
        street: this.editedUser.street,
        postal_code: this.editedUser.postal_code,
        city: this.editedUser.city,
        age: this.editedUser.age,
      });
      this.goHome();
      this.closeModal();
    },
    goHome() {
      this.$router.push("/");
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
        this.buttonText = "Zapisz zmiany";
      } else {
        this.isDisabled = true;
        this.buttonText = "Uzupełnij Dane";
      }
      return this.isDisabled;
    },
  },
};
</script>
<style lang="scss" scoped>
.edit-user-container {
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
  .edit-user-form {
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
    }
    .btn {
      border: none;
      cursor: pointer;
      color: #fff;
      background-color: #473bbb;
      font-size: 1em;
      // border: 1px solid #473bbb;
      padding: 0.5em;
      &:disabled {
        opacity: 0.5;
      }
    }
  }
  .edit-user-btn {
    padding: 0.5em;
    border: 1px solid #473bbb;
    &:hover {
      background-color: #473bbb;
      color: #fff;
    }
  }
}
</style>
