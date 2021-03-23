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
            :placeholder="oldFirstName"
          />
        </div>
        <div class="box">
          <input
            v-model="editedUser.last_name"
            type="text"
            placeholder="Nazwisko"
          />
        </div>
        <div class="box">
          <input v-model="editedUser.street" type="text" placeholder="Ulica" />
        </div>
        <div class="box">
          <input
            v-model="editedUser.postal_code"
            type="text"
            placeholder="Kod Pocztowy"
          />
        </div>
        <div class="box">
          <input v-model="editedUser.city" type="text" placeholder="Miasto" />
        </div>
        <div class="box">
          <input v-model="editedUser.age" type="text" placeholder="Wiek" />
        </div>
        <div class="close-modal-container">
          <button class="btn add-user-btn">Zapisz zmiany</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: Number,
    firstName: String,
  },
  data() {
    return {
      editedUser: {
        id: this.id,
        first_name: "",
        last_name: "",
        postal_code: "",
        street: "",
        city: "",
        age: "",
      },
    };
  },
  computed: {
    editUserModal() {
      return this.$store.state.editUserModal;
    },
    oldFirstName() {
      return this.firstName;
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
  },
  mounted() {
    console.log(this.firstName);
    this.editedUser.first_name = this.firstName;
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
  }
  .close-modal-container {
    align-self: flex-end;
    margin: 20px;
    .btn {
      border: none;
      cursor: pointer;
      color: #473bbb;
      background-color: #fff;
      font-size: 1em;
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
