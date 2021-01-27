<template>
    <div>
        <center>
            <router-link :to="{name: 'home'}">
                Главная 
            </router-link> 
            <router-link :to="{name: 'login'}" v-show="!$auth.check()">
                 | Войти
            </router-link>
            <router-link :to="{name: 'register'}" v-show="!$auth.check()">
                 | Регистрация
            </router-link>
            <a href="#" @click="logoutDefault" v-show="$auth.check()">
                 | Выйти
            </a>
            <hr>
            <router-view />
        </center>
    </div>
</template>
<script>
    export default {
        methods: {
            logoutDefault() {
                this.$auth
                    .logout({
                        redirect: {name: 'login'}
                    });
            }
        }
    }
</script>