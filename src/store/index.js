import axios from "axios";

import { createStore } from "vuex";

export default createStore({
  state: {
    users: [],
  },
  mutations: {
    users(state, payload) {
      state.users = payload;
    },
  },
  actions: {
    async getUsers({ commit }) {
      const URI = "http://fronttest.ekookna.pl/";
      try {
        const response = await axios.get(URI);
        const data = await response.data.users;
        console.log(response.data.users);
        commit("users", data);
      } catch (err) {
        console.log(err.message);
      }
    },
  },
});
