import axios from "axios";
import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

const vuexLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
  reducer: (state) => ({
    keepUser: state.user,
  }),
});
export default createStore({
  state: {
    users: [],
    user: [],
    filters: {
      lastName: "",
      ageFrom: null,
      ageTo: null,
    },
    modalIsOpen: false,
    removeUserModal: false,
    editUserModal: false,
    displayListUsersButton: false,
  },
  mutations: {
    users(state, payload) {
      state.users = payload;
    },
    setFilters(state, payload) {
      console.log("tutaj");

      state.filters.lastName = payload.lastName;
      state.filters.ageFrom = payload.ageFrom;
      state.filters.ageTo = payload.ageTo;
    },
    modalIsOpen(state) {
      state.modalIsOpen = !state.modalIsOpen;
    },
    removeUserModal(state) {
      state.removeUserModal = !state.removeUserModal;
    },
    editUserModal(state) {
      state.editUserModal = !state.editUserModal;
    },
    getUser(state, payload) {
      state.user = payload;
    },
    disableListUsersButton(state) {
      state.displayListUsersButton = !state.displayListUsersButton;
      console.log(state.displayListUsersButton);
    },
  },
  actions: {
    async getUsers({ commit }) {
      const URI = "http://fronttest.ekookna.pl/";
      try {
        const response = await axios.get(URI);
        const data = await response.data.users;
        commit("users", data);
      } catch (err) {
        console.log(err.message);
      }
    },
    async addUser({ dispatch }, payload) {
      const URI = "http://fronttest.ekookna.pl/user";
      try {
        let data = new FormData();
        data.append("first_name", payload.first_name);
        data.append("last_name", payload.last_name);
        data.append("postal_code", payload.postal_code);
        data.append("street", payload.street);
        data.append("city", payload.city);
        data.append("age", payload.age);

        await axios({
          headers: { "Content-Type": "multipart/form-data" },
          method: "post",
          url: URI,
          data: data,
        });
        await dispatch("getUsers");
      } catch (err) {
        console.log(err.message);
      }
    },
    async removeUser({ dispatch }, payload) {
      const URI = `http://fronttest.ekookna.pl/user/${payload}`;
      try {
        let data = new FormData();
        data.append("_method", "DELETE");

        await axios({
          headers: { "Content-Type": "multipart/form-data" },
          method: "post",
          url: URI,
          data: data,
        });
        await dispatch("getUsers");
      } catch (err) {
        console.log(err.message);
      }
    },
    async editUser({ dispatch }, payload) {
      const URI = `http://fronttest.ekookna.pl/user/${payload.id}`;
      try {
        let data = new FormData();
        data.append("_method", "PUT");
        data.append("first_name", payload.first_name);
        data.append("last_name", payload.last_name);
        data.append("postal_code", payload.postal_code);
        data.append("street", payload.street);
        data.append("city", payload.city);
        data.append("age", payload.age);

        await axios({
          headers: { "Content-Type": "multipart/form-data" },
          method: "post",
          url: URI,
          data: data,
        });
        await dispatch("getUsers");
      } catch (err) {
        console.log(err.message);
      }
      dispatch("getUsers");
    },
    setFilters({ commit }, payload) {
      commit("setFilters", payload);
    },
    modalIsOpen({ commit }) {
      commit("modalIsOpen");
    },
    removeUserModal({ commit }) {
      commit("removeUserModal");
    },
    editUserModal({ commit }) {
      commit("editUserModal");
    },
    getUser({ commit }, payload) {
      commit("getUser", payload);
    },
    disableListUsersButton({ commit }) {
      commit("disableListUsersButton");
    },
  },

  getters: {
    users(state) {
      return state.users;
    },
    filteredUsers(state, getters) {
      if (
        state.filters.lastName &&
        state.filters.ageFrom &&
        state.filters.ageTo
      ) {
        const ageFrom = parseInt(state.filters.ageFrom);
        const ageTo = parseInt(state.filters.ageTo);
        const filteredUsers = getters.users.filter((user) => {
          return (
            ageFrom <= user.age &&
            ageTo >= user.age &&
            user.last_name
              .toLocaleLowerCase()
              .includes(state.filters.lastName.toLocaleLowerCase())
          );
        });
        return filteredUsers;
      } else {
        return getters.users;
      }
    },
  },
  plugins: [vuexLocalStorage.plugin],
});
