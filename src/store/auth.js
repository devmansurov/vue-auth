import Vue from 'vue';

export default {
    namespaced: true,

    state: () => ({
        user: {},
    }),

    mutations: {
        setUser(state) {
            let token = localStorage.getItem('auth_token_default');
            var user = localStorage.getItem('user');
          if(token) {
            if(user == undefined) {
                Vue.axios({
                    url: 'auth/user'
                })
                .then((res) => {
                    var userData = res.data;
                    localStorage.setItem('user', JSON.stringify(userData));
                    Vue.auth.user(userData);
                });
            } else {
                Vue.auth.user(JSON.parse(user));
                state.user = JSON.parse(user);
            }
          }
        },
    },

    actions: {
        register(ctx, data) {
            data = data || {};

            return new Promise((resolve, reject) => {
                Vue.auth.register({
                    url: 'auth/register',
                    data: data.body,
                    autoLogin: false,
                })
                .then(() => {
                    if (data.autoLogin) {
                        ctx.dispatch('login', data).then(resolve, reject);
                    }
                }, reject);
            });
        },
    },

    getters: {
        user() {
            return Vue.auth.user();
        },
    }
}