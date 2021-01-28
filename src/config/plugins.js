import Vue from 'vue'
import auth                  from '@websanova/vue-auth/src/v2.js';
import driverAuthBearer      from '@websanova/vue-auth/src/drivers/auth/bearer.js';
import driverHttpAxios       from '@websanova/vue-auth/src/drivers/http/axios.1.x.js';
import driverRouterVueRouter from '@websanova/vue-auth/src/drivers/router/vue-router.2.x.js';

Vue.use(auth, {
    plugins: {
        http: Vue.axios,
        router: Vue.router,
    },
    drivers: {
        auth: driverAuthBearer,
        http: driverHttpAxios,
        router: driverRouterVueRouter,

    },
    options: {
        rolesKey: 'role',
        authRedirect:       {path: '/login'},
        forbiddenRedirect:  {path: '/403'},
        notFoundRedirect:   {path: '/404'},
        registerData: {
            url: 'auth/register', 
            method: 'POST', 
            redirect: '/login', 
            autoLogin: false
        },
        loginData: {
            url: 'auth/login',
            method: 'POST',
            redirect: '/',
            fetchUser: true,
            staySignedIn: true
        },
        fetchData:{url: 'auth/user', method: 'GET', enabled: true},
        rememberkey:         'auth_remember',
        tokenDefaultKey:     'auth_token_default',
        tokenImpersonateKey: 'auth_token_impersonate',
        stores: ['storage', 'cookie'],
        parseUserData: function(data) {
            return data;
        }
    }
});