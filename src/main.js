import Vue    from 'vue';

import http   from './http'
import store  from './store'
import router from './router'
import config from './config'

import App from './pages/Index.vue';

import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    http: http,
    store: store,
    router: router,
    config: config,
    // beforeCreate() { this.$store.commit('auth/setUser');},
    render: h => h(App)
});