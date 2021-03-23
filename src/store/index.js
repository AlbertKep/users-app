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
  },
  mutations: {
    users(state, payload) {
      state.users = payload;
    },
    setFilters(state, payload) {
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
      console.log(payload);
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
      let data = new FormData();
      data.append("_method", "DELETE");
      console.log(payload);
      const URI = `http://fronttest.ekookna.pl/user/${payload}`;
      try {
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
      let data = new FormData();
      // const filteredPayload = payload.filter((property) => {
      //   return property;
      // });
      console.log(payload);
      data.append("_method", "PUT");
      data.append("first_name", payload.first_name);
      data.append("last_name", payload.last_name);
      data.append("postal_code", payload.postal_code);
      data.append("street", payload.street);
      data.append("city", payload.city);
      data.append("age", payload.age);
      const URI = `http://fronttest.ekookna.pl/user/${payload.id}`;
      try {
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

      console.log(payload);
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
          console.log(typeof user.id, typeof ageFrom);
          return (
            ageFrom <= user.age &&
            ageTo >= user.age &&
            user.last_name.includes(state.filters.lastName)
          );
        });
        console.log(filteredUsers);
        return filteredUsers;
      } else {
        return getters.users;
      }
    },
  },
  plugins: [vuexLocalStorage.plugin],
});
