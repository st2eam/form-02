import { createStore } from "vuex";

export default createStore({
  state: {
    username: "",
  },
  getters: { getUsername: () => sessionStorage.getItem("username") },
  mutations: {
    setUsername(state, username) {
      state.username = username;
      sessionStorage.setItem("username", username);
    },
  },
  actions: {},
  modules: {},
});
