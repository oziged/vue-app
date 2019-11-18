export default {
  actions: {
    newPlan({commit, getters}, payload) {
      return new Promise(resolve => {
        commit("newPlan", payload)
        console.log(getters.allPlans)
        resolve(getters.allPlans[getters.allPlans.length-1])
      })
     
    }
  },
  mutations: {
    newPlan(state, payload) {
      state.plans.push(
        {
          ...payload,
          id: state.plans.length + 1,
          user_id: 1,
          type: 'public',
          price: "",
          rating: Math.floor(Math.random() * 5),
          length: 1234
        }
      )
    }
  },
  state: {
    plans: [
      {
        id: 1,
        user_id: 1,
        title: "Bus Europe Tour",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. A dignissimos ipsa harum blanditiis iure in aut ut, quam quas atque?",
        type: "public",
        price: "",
        rating: 4,
        length: 414
      },
      {
        id: 2,
        user_id: 1,
        title: "Bus USA Tour",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. A dignissimos ipsa harum blanditiis iure in aut ut, quam quas atque? | Lorem ipsum dolor sit amet consectetur adipisicing elit. A dignissimos ipsa harum blanditiis iure in aut ut, quam quas atque?",
        type: "public",
        price: "",
        rating: 2,
        length: 997
      },
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
