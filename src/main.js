import { createApp } from "vue";
//import Vue from 'vue'
import App from "./App.vue";
import keycloak from "./auth.js";

import router from "./router/router.js";
import store from "./store/store.js";
// import axios from './axios.js';

// app.config.globalProperties.$http = () => {}

const app = createApp(App, { props: { keycloak: keycloak } })
  .use(router)
  .use(store)
  .mount("#app");
// app.provide("$keycloak", keycloak);
