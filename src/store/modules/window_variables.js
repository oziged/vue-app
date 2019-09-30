export default {
    actions: {
        setWindowWidth({ commit }) {
            commit("setWindowWidth", window.innerWidth);
          },
    },
    mutations: {
        setWindowWidth(state, width) {
            state.width = width;
          },
    },
    state: {
        width: null
    },
    getters: {
      windowWidth(state) {
        return state.width;
      },
    }
  };
  