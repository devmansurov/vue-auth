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
        fetch(data) {
            console.log("FETCH DATA");
            console.log(data);
            return Vue.auth.fetch(data);
        },

        refresh(data) {
            return Vue.auth.refresh(data);
        },

        login(ctx, data) {
            data = data || {};

            return new Promise((resolve, reject) => {
                Vue.auth.login({
                    url: 'auth/login',
                    data: data.body,
                    remember: data.remember,
                    staySignedIn: data.staySignedIn,
                })
                .then((res) => {
                    if (data.remember) {
                        Vue.auth.remember(JSON.stringify({
                            name: ctx.getters.user.first_name
                        }));
                    }

                    Vue.router.push({
                        name: ctx.getters.user.type + '-landing'
                    });

                    resolve(res);
                }, reject);
            });
        },

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

        impersonate(data) {
            Vue.auth.impersonate({
                url: 'auth/' + data.user.id + '/impersonate',
                redirect: 'user-account'
            });
        },

        unimpersonate() {
            Vue.auth.unimpersonate({
                redirect: 'admin-users'
            });
        },    

        logout() {
            return Vue.auth.logout();
        },
    },

    getters: {
        user() {
            return Vue.auth.user();
        },

        impersonating() {
            return Vue.auth.impersonating();
        }
    }
}