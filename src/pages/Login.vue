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
    export default {
        data() {
            return {
                form: {
                    body: {
                        email: '',
                        password: '',
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
                this.$auth.login({
                    data: this.form.body,
                    rememberMe: true,
                    fetchUser: true
                })
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