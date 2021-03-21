<template>
  <div class="container" :class="{ 'close-modal': modalIsOpen }">
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
      <div class="button-container">
        <button @click="closeModal">Dodaj</button>
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
      // modalIsOpen: false,
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
.container {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #fff;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
}
.close-modal {
  display: none;
}
</style>