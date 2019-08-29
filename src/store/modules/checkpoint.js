export default {
    actions: {
    },
    mutations: {
    },
    state: {
        checkpoints: [
            {
                id: 1,
                plan_id: 1,
            }
        ]
    },
    getters: {
        allCheckPoints(state) {
            return state.checkpoints
        }
    }
}