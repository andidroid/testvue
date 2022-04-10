<template>
  
<router-link to="/">Home</router-link>
<router-link to="/test">Test</router-link>
<router-link to="/admin">Admin</router-link>
<router-link to="/about">About</router-link>

<button type="button" @click="logout">logout</button>
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
            store.commit("SET_ROLES", [])
            store.commit("SET_TOKEN", '')
            store.commit("SET_USER", {})
        }
    }
}

    

</script>
