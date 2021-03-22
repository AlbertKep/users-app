<template>
  <div class="remove-user-container" v-if="removeUserModal">
    <div class="wrapper">
      <p class="paragraph">Czy na pewno usunąć użytkownika?</p>
      <div class="btns-container">
        <button class="btn" @click="removeUser">Tak</button>
        <button class="btn" @click="closeModal">Nie</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: Number,
  },
  computed: {
    removeUserModal() {
      return this.$store.state.removeUserModal;
    },
  },
  methods: {
    closeModal() {
      this.$store.dispatch("removeUserModal");
    },
    removeUser() {
      this.closeModal();
      this.$store.dispatch("removeUser", this.id);
      this.$router.push("/");

      console.log(this.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.remove-user-container {
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
  .wrapper {
    border: 1px solid #473bbb;
  }
  .paragraph,
  .btns-container {
    padding: 0.5em;
  }
  .btn {
    border: none;
    cursor: pointer;
    color: #473bbb;
    background-color: #fff;
    font-size: 1em;
  }
}
</style>
