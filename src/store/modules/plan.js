export default {
    actions: {
    },
    mutations: {
    },
    state: {
        plans: [
            {
                id: 1,
                user_id: 1,
                title: 'Bus Europe Tour',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A dignissimos ipsa harum blanditiis iure in aut ut, quam quas atque?',
                type: 'public',
                price: ''
            },
            {
                id: 2,
                user_id: 1,
                title: 'Bus USA Tour',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. A dignissimos ipsa harum blanditiis iure in aut ut, quam quas atque?',
                type: 'public',
                price: ''
            }
        ]
    },
    getters: {
        allPlans(state) {
            return state.plans
        },
        getPlan(state) {
            return id => {
                return state.plans.find(plan => {
                    return plan.id == id;
                })
            }
        }
    }
}