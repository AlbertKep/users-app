<template>
  <div class="add-user-container" :class="{ 'open-modal': modalIsOpen }">
    <div class="close-modal-container">
      <button class="close-modal-btn" @click="closeModal">X</button>
    </div>
    <form @submit.prevent="addUser" class="add-user-form">
      <div class="box">
        <input v-model="newUser.first_name" type="text" placeholder="Imię" />
      </div>
      <div class="box">
        <input v-model="newUser.last_name" type="text" placeholder="Nazwisko" />
      </div>
      <div class="box">
        <input v-model="newUser.street" type="text" placeholder="Ulica" />
      </div>
      <div class="box">
        <input
          v-model="newUser.postal_code"
          type="text"
          placeholder="Kod Pocztowy"
        />
      </div>

      <div class="box">
        <input v-model="newUser.city" type="text" placeholder="Miasto" />
      </div>
      <div class="box">
        <input v-model="newUser.age" type="text" placeholder="Wiek" />
      </div>
      <div class="close-modal-container">
        <button class="add-user-btn" @click="closeModal">Dodaj</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newUser: {
        id: null,
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
    modalIsOpen() {
      return this.$store.state.modalIsOpen;
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
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #fff;
  opacity: 0.9;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    button {
      border: none;
      cursor: pointer;
      color: #473bbb;
      background-color: transparent;
      font-size: 1em;
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
}
.open-modal {
  display: flex;
}
</style>