export default {
  actions: {},
  mutations: {},
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
      {
        id: 3,
        user_id: 1,
        title: "Test Tour",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. A dignissimos ipsa harum blanditiis iure in aut ut, quam quas atque?",
        type: "public",
        price: "",
        rating: 4,
        length: 5214
      },
      {
        id: 3,
        user_id: 1,
        title: "Test Tour",
        description:
          "Lorem ipsumm dolor sit amet consectetur adipisicing elit. A dignissimos ipsa harum blanditiis iure in aut ut, quam quas atque?m dolor sit amet consectetur adipisicing elit. A dignissimos ipsa harum blanditiis iure in aut ut, quam quas atque?m dolor sit amet consectetur adipisicing elit. A dignissimos ipsa harum blanditiis iure in aut ut, quam quas atque? dolor sit amet consectetur adipisicing elit. A dignissimos ipsa harum blanditiis iure in aut ut, quam quas atque?",
        type: "public",
        price: "",
        rating: 4,
        length: 410
      },
      {
        id: 3,
        user_id: 1,
        title: "Test Tour",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. A dignissimos ipsa harum blanditiis iure in aut ut, quam quas atque?",
        type: "public",
        price: "",
        rating: 4,
        length: 1020
      },
      {
        id: 3,
        user_id: 1,
        title: "Test Tour",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. A dignissimos ipsa harum blanditiis iure in aut ut, quam quas atque?",
        type: "public",
        price: "",
        rating: 4,
        length: 420
      }
    ],
    currentPlans: [      {
      id: 3,
      user_id: 1,
      title: "Test Tour",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. A dignissimos ipsa harum blanditiis iure in aut ut, quam quas atque?",
      type: "public",
      price: "",
      rating: 4,
      length: 420
    }]
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
    currentPlans(state) {
      return state.currentPlans;
    }
  }
};
