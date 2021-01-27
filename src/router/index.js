import Vue       from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function loadView(view) {
    return () => import(`../pages/${view}.vue`);
}

Vue.router = new VueRouter({
    hashbang: false,
    mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            name: 'home',
            component: loadView('Home'),
            meta: {
                auth: ['admin', 'user']
            }
        },
        {
            path: '/login',
            name: 'login',
            component: loadView('Login'),
            meta: {
                auth: false
            }
        },
        {
            path: '/register',
            name: 'register',
            component: loadView('Register'),
            meta: {
                auth: false
            }
        }
    ]
});

export default Vue.router;