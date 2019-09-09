export default {
    actions: {
        setCurrentCheckpoint( { commit }, id) {
            let checkpoint = rootGetters.getCheckpoint(id);
            console.log(checkpoint);
            commit('setCurrentCheckpoint', checkpoint)
        },
        setPlanCheckpointId( { commit }, payload ) {
            console.log('hohohoh');
            console.log(payload.type, payload.id);
            console.log('hohohoh');
            if (payload.type == 'planMain') commit('setPlanMainCheckpointId', payload.id);
            if (payload.type == 'planModal') commit('setPlanModalCheckpointId', payload.id);
        }
    },
    mutations: {
        setPlanMainCheckpointId(state, id) {
            state.plan_main_checkpoint_id = id 
        },
        setPlanModalCheckpointId(state, id) {
            state.plan_modal_checkpoint_id = id 
        },
        setCurrentCheckpoint(state, checkpoint) {
            state.current_checkpoint = checkpoint;
        }
    },
    state: {
        checkpoints: [
            {
                id: 1,
                place_id: 1,
                title: 'City1',
                description: 'Description1',
                checkable_type: 'Plan',
                checkable_id: 1
            },
            {
                id: 2,
                place_id: 2,
                title: 'City2',
                description: 'Description2',
                checkable_type: 'Plan',
                checkable_id: 1
            },
            {
                id: 3,
                place_id: 3,
                title: 'City1 - place',
                description: 'Description city1 - place',
                checkable_type: 'Checkpoint',
                checkable_id: 1
            },
            {
                id: 4,
                place_id: 4,
                title: 'City1 - place2',
                description: 'Description city1 - place2',
                checkable_type: 'Checkpoint',
                checkable_id: 1
            },
            {
                id: 5,
                place_id: 5,
                title: 'City1 - place3',
                description: 'Description city1 -place3',
                checkable_type: 'Checkpoint',
                checkable_id: 1
            },
            {
                id: 6,
                place_id: 6,
                title: 'USA City1',
                description: 'Description city1',
                checkable_type: 'Plan',
                checkable_id: 2
            },
            {
                id: 7,
                place_id: 7,
                title: 'USA City2',
                description: 'Description city2',
                checkable_type: 'Plan',
                checkable_id: 2
            },
            {
                id: 8,
                place_id: 8,
                title: 'City 1 Place 3 subPlace 1',
                description: 'City 1 Place 3 subPlace 1',
                checkable_type: 'Checkpoint',
                checkable_id: 5
            },
            {
                id: 9,
                place_id: 9,
                title: 'City 1 Place 3 subPlace 2',
                description: 'City 1 Place 3 subPlace 2',
                checkable_type: 'Checkpoint',
                checkable_id: 5
            }
        ],
        current_checkpoint: null,
        plan_main_checkpoint_id: null,
        plan_modal_checkpoint_id: null
    },
    getters: {
        allCheckpoints(state) {
            return state.checkpoints
        },
        getCheckpoint(state) {
            return id => {
                return state.checkpoints.find(checkpoint => {
                    return checkpoint.id == id
                })
            }
        },
        getSubCheckpoints(state, getters) {
            return (id, type) => {
                let sub = state.checkpoints.filter(checkpoint => {
                    return checkpoint.checkable_id == id && checkpoint.checkable_type == type
                })
                if (sub.length) return sub;
                console.log(sub.length);
                if (type == 'Checkpoint') return [getters.getCheckpoint(id)];
            }
        },
        getPlanMainCheckpointId(state) {
            return state.plan_main_checkpoint_id
        },
        getPlanModalCheckpointId(state) {
            return state.plan_modal_checkpoint_id
        },
        currentCheckpoint(state) {
            return state.current_checkpoint
        }

    }
}