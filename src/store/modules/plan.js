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
                description: 'Best choice for ur family to spend time & money)) ',
                type: 'public',
                price: ''
            }
        ]
    },
    getters: {
        allPlans(state) {
            return state.plans
        }
    }
}