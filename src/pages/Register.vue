<template>
    <div>
        <h2>Регистрация</h2>
        <ValidationObserver ref="form" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(register)">
                <ValidationProvider name="name" rules="required" v-slot="{ errors }">
                    <input type="text" placeholder="Имя" v-model="form.body.name">
                    <p class='error'><span>{{ errors[0] }}</span></p>
                </ValidationProvider>
                <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                    <input type="text" placeholder="E-mail адрес" v-model="form.body.email">
                    <p class='error'><span>{{ errors[0] }}</span></p>
                </ValidationProvider>
                <ValidationProvider name="password" rules="required" v-slot="{ errors }" vid="confirmation">
                    <input type="password" placeholder="Пароль" v-model="form.body.password">
                    <p class='error'><span>{{ errors[0] }}</span></p>
                </ValidationProvider>
                <ValidationProvider name="password" rules="required|confirmed:confirmation" v-slot="{ errors }">
                    <input type="password" placeholder="Подтверждение пароля" v-model="form.body.password_confirmation">
                    <p class='error'><span>{{ errors[0] }}</span></p>
                </ValidationProvider>
                <ValidationProvider name="role" rules="required" v-slot="{ errors }">
                    Роль:
                    <select v-model="form.body.role" name="role">
                        <option :value="role.id" v-for="role in roles" :key="role.id">{{role.name}}</option>
                    </select>
                    <p class='error'><span>{{ errors[0] }}</span></p>
                </ValidationProvider>
                <p><button type="submit">Зарегистрироваться</button></p>
            </form>
        </ValidationObserver>
    </div>
</template>
<script>
    export default {
        computed: {
            roles () {
                return this.$store.state.data.roles;
            }
        },
        mounted() {
            this.$store.dispatch('data/getRoles');
        },
        data() {
            return {
                form: {
                    body: {
                        role: 1,
                        name: '',
                        email: '',
                        password: '',
                        password_confirmation: '',
                    },
                    remember: false,
                    fetchUser: true,
                    staySignedIn: false,
                    errors: {}
                }
            }
        },
        methods: {
            register() {
                console.log('Register clicked');
                
                this.$store
                    .dispatch('auth/register', {
                        body: this.form.body, // VueResource
                        data: this.form.body, // Axios
                        remember: this.form.remember,
                        fetchUser: this.form.fetchUser,
                        autoLogin: this.form.autoLogin,
                        staySignedIn: this.form.staySignedIn,
                    })
                    .then(null, (res) => {
                        if(res.response && res.response.data && res.response.data.errors) {
                            this.$refs.form.setErrors(res.response.data.errors);
                        }
                    });
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