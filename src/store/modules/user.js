export default {
  actions: {},
  mutations: {},
  state: {
    users: [
      {
        id: 1,
        first_name: "Eugene",
        last_name: "Novikov",
      }
    ]
  },
  getters: {
    allUsers(state) {
      return state.users;
    },
    getUser(state) {
      return id => {
        return state.users.find(item => {
          return item.id == id;
        });
      };
    }
  }
};
