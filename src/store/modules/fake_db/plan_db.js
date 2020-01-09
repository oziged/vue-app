export default {
  actions: {
    // setAllPlans({commit}, payload) {
    //   commit("setAllPlans", payload)
    // }
    // newPlan({commit, getters}, payload) {
    //   return new Promise(resolve => {
    //     commit("newPlan", payload)
    //     console.log(getters.allPlans)
    //     resolve(getters.allPlans[getters.allPlans.length-1])
    //   })
    // },
    // DBremovePlan( { commit }, id) {
    //   commit("DBremovePlan", id)
    // }
  },
  mutations: {
    // newPlan(state, payload) {
    //   state.plans.push(
    //     {
    //       ...payload,
    //       id: state.plans.length + 1,
    //       user_id: 1,
    //       type: 'public',
    //       price: "",
    //       rating: Math.floor(Math.random() * 5),
    //       length: 1234
    //     }
    //   )
    // },

    // DBremovePlan(state, id) {
    //   console.log('plan deleted' + id)
    //   state.plans = state.plans.filter(item => {
    //     return item.id != id
    //   })
    //   console.log(state);
    // }

    addPlans(state, payload) {
      state.plans.push(payload);
    },

    setAllPlans(state, payload) {
      state.plans = payload
    }
  },
  state: {
    plans: [
    ],
  },
  getters: {
    allPlans(state) {
      return state.plans;
    },
    getPlan(state) {
      return id => {
        return state.plans.find(plan => {
          return plan.id == id;
        });
      };
    },
  }
};
