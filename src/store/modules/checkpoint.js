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
            },
            {
                id: 4,
                plan_id: 1,
                place_id: 4,
                title: 'City1 - place2',
                description: 'Description city1 - place2',
                checkable_type: 'Checkpoint',
                checkable_id: 1
            },
            {
                id: 5,
                plan_id: 1,
                place_id: 5,
                title: 'City1 - place3',
                description: 'Description city1 -place2',
                checkable_type: 'Checkpoint',
                checkable_id: 1
            }
        ]
    },
    getters: {
        allCheckPoints(state) {
            return state.checkpoints
        },
        getCheckpoint(state) {
            return id => {
                return state.checkpoints.find(checkpoint => {
                    return checkpoint.id == id
                })
            }
        },
        getSubCheckpoints(state) {
            return id => {
                let sub = state.checkpoints.filter(checkpoint => {
                    return checkpoint.checkable_id == id && checkpoint.checkable_type == 'Checkpoint'
                })
                return sub.length ? sub : false
            }
        }

    }
}