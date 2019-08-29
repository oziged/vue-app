export default {
    actions: {

    },
    mutations: {
 
    },
    state: {
        users: [
            {
                firstName: 'Eugene',
                lastName: 'Novikov' 
            }
        ]
    },
    getters: {
        allUsers(state) {
            return state.users
        }
    }
}