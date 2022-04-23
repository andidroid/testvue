<template>
  
<router-link to="/">Home</router-link>
<router-link to="/test">Test</router-link>
<router-link to="/admin">Admin</router-link>
<router-link to="/about">About</router-link>

<button type="button" @click="logout">logout</button>

<button type="button" @click="goBack">back</button>
<button type="button" @click="goForward">forward</button>

</template>

<script>
import keycloak from "../auth.js";
// import Keycloak from 'keycloak-js'
// const { inject } = Vue;

export default {
    methods: {
        logout() {
            //const $keycloak = inject('$keycloak');
            keycloak.logout();
            //app.config.globalProperties.$keycloak.logout();
            this.$store.commit("SET_ROLES", [])
            this.$store.commit("SET_TOKEN", '')
            this.$store.commit("SET_USER", {})
            //replace instead of push, to handle goBack history
            this.$router.replace({path: '/'})
        },
        goBack() {
            this.$router.back()
        },
        goForward() {
            this.$router.forward()
        }
    }
}

    

</script>
