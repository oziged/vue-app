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
                place_id: 1,
                title: 'City1',
                description: 'Description1',
                checkable_type: 'Plan',
                checkable_id: 1
            },
            {
                id: 2,
                plan_id: 1,
                place_id: 2,
                title: 'City2',
                description: 'Description2',
                checkable_type: 'Plan',
                checkable_id: 2
            },
            {
                id: 3,
                plan_id: 1,
                place_id: 3,
                title: 'City1 - place',
                description: 'Description city1 - place',
                checkable_type: 'Checkpoint',
                checkable_id: 1
            }
        ]
    },
    getters: {
        allCheckPoints(state) {
            return state.checkpoints
        }
    }
}