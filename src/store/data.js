import Vue from 'vue'

export default {
    namespaced: true,
    state: () => ({
        roles: [],
        count: 0
    }),
    mutations: {
        setRoles (state, roles) {
            state.roles = roles
        }
    },
    actions: { 
        getRoles (context) {
            if(context.state.roles.length == 0) {
                Vue.axios.get('roles')
                    .then((res) => context.commit('setRoles', res.data))
            } 
        }
    },
    getters: {

    }
}