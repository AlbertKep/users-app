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
      last_name: "",
      age_from: null,
      age_to: null,
    },
    modalIsOpen: false,
  },
  mutations: {
    users(state, payload) {
      state.users = payload;
    },
    setFilters(state, payload) {
      state.filters.last_name = payload.last_name;
      state.filters.age_from = payload.age_from;
      state.filters.age_to = payload.age_to;
    },
    modalIsOpen(state) {
      state.modalIsOpen = !state.modalIsOpen;
      console.log(state.modalIsOpen);
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
    setFilters({ commit }, payload) {
      commit("setFilters", payload);
    },
    modalIsOpen({ commit }) {
      commit("modalIsOpen");
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
        dispatch("getUsers");
      } catch (err) {
        console.log(err.message);
      }
    },
    getUser({ commit }, payload) {
      commit("getUser", payload);
    },
  },

  getters: {
    users(state) {
      return state.users;
    },
    filterUsers(state, getters) {
      if (state.filters.last_name || state.filters.age_from) {
        const age_from = parseInt(state.filters.age_from);
        const age_to = parseInt(state.filters.age_to);
        const filteredUsers = getters.users.filter((user) => {
          return (
            age_from <= user.age && age_to >= user.age
            // user.last_name.includes(state.filters.last_name)
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
