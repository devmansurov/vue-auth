<template>
    <div>
        <h2>Вход</h2>
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(login)">
                <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                    <input type="text" placeholder="E-mail адрес" v-model="form.body.email">
                    <p class='error'><span>{{ errors[0] }}</span></p>
                </ValidationProvider>
                <ValidationProvider name="password" rules="required" v-slot="{ errors }">
                    <input type="password" placeholder="Пароль" v-model="form.body.password">
                    <p class='error'><span>{{ errors[0] }}</span></p>
                </ValidationProvider>
                <input v-model="form.remember" type="checkbox"/> Запомнить
                <p><button type="submit">Войти</button></p>
            </form>
        </ValidationObserver>
    </div>
</template>
<script>
    // import * as cookie from '@websanova/vue-auth/src/lib/cookie.js';
    // import * as storage from '@websanova/vue-auth/src/lib/storage.js';
    // import * as token   from '@websanova/vue-auth/src/lib/token.js';
    export default {
        computed: {
            roles () {
                return this.$store.state.data.roles;
            }
        },
        mounted() {
            this.$store.dispatch('data/getRoles');
            // this.$auth.refresh();
            // this.$auth.token(null, '41|eYBk52RicY3CklRE4HZZP1BmJUkJeNYpUBp6Wg80', true);
        },
        data() {
            return {
                form: {
                    body: {
                        email: 'otabek@gmail.com',
                        password: '12345678',
                    },
                    remember: true,
                    fetchUser: true,
                    staySignedIn: true,
                    errors: {}
                }
            }
        },
        methods: {
            login() {
                console.log('Login clicked');
                console.log(this.$auth);
                this.$auth.login({
                    data: this.form.body,
                    success: function() {
                        // handle redirection
                        // app.success = true
                        console.log("success");
                        // const redirectTo = 'dashboard'
                        // this.$router.push({name: redirectTo})
                    },
                    error: function() {
                        console.log("true");
                        // app.has_error = true
                        // app.error = res.response.data.error
                    },
                    rememberMe: true,
                    fetchUser: true
                    });
                // this.$auth
                //     .login({
                //         body: {
                //             email: 'otabek@gmail.com',
                //             password: '12345678',
                //         },
                //         data: {
                //             email: 'otabek@gmail.com',
                //             password: '12345678',
                //         },
                //         redirect: {name: 'user-account'},
                //         remember: 'Rob',
                //         staySignedIn: true,
                //         fetchUser: true
                //     });
                
            },
        }
    }
</script>
<style scoped>
    .error {
        font-size: 12px;
        color: red;
    }
</style>