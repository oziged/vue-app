export default {
    actions: {
    },
    mutations: {
    },
    state: {
        checkpoints: [
            {
                id: 1,
                plan: 1,
                title: 'Bus Europe Tour',
                description: 'Best choice for ur family to spend time & money)) ',
                type: 'public',
                price: ''
            }
        ]
    },
    getters: {
        allCheckPoints(state) {
            return state.checkpoints
        }
    }
}