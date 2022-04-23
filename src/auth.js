import Keycloak from "keycloak-js";

import store from "./store/store.js";
// import axios from './axios.js';

// app.config.globalProperties.$http = () => {}

// console.log("test store config");
// console.log("store", store);
// console.log("this.$store", this.$store);//does not work here

console.log(import.meta.env.VITE_APP_AUTH_ENABLED);
console.log(import.meta.env.VITE_APP_KEYCLOAK_URL);
let keycloak = null;
if (import.meta.env.VITE_APP_AUTH_ENABLED == "true") {
  // console.log(process.env.VUE_APP_KEYCLOAK_URL)
  let initOptions = {
    url: import.meta.env.VITE_APP_KEYCLOAK_URL + "/auth",
    realm: "testrealm",
    clientId: "testvue",
    onLoad: "login-required",
  };

  keycloak = Keycloak(initOptions);
  //Vue.prototype.$keycloak = keycloak

  //app.config.globalProperties.$keycloak = keycloak;
  // app.config.globalProperties.$axios = axios;

  //console.log(process.env.VUE_APP_KEYCLOAK_URL)

  keycloak
    .init({ onLoad: initOptions.onLoad })
    .then((auth) => {
      if (!auth) {
        window.location.reload();
      } else {
        //keycloak.loadUserInfo().then((obj)=>{console.log('user logged in: ', obj)});
        // console.log('keycloak.idTokenParsed', keycloak.idTokenParsed);
        console.log("keycloak.tokenParsed", keycloak.tokenParsed);
      }

      store.commit("SET_ROLES", keycloak.tokenParsed.roles);
      store.commit("SET_TOKEN", keycloak.token);
      store.commit("SET_USER", {
        id: keycloak.tokenParsed.azp,
        name: keycloak.tokenParsed.name,
      });

      //Token Refresh
      setInterval(() => {
        keycloak
          .updateToken(90)
          .then((refreshed) => {
            if (refreshed) {
              console.log("Token refreshed" + refreshed);
            } else {
              console.log(
                "Token not refreshed, valid for " +
                  Math.round(
                    keycloak.tokenParsed.exp +
                      keycloak.timeSkew -
                      new Date().getTime() / 1000
                  ) +
                  " seconds"
              );
            }
          })
          .catch(() => {
            console.log("Failed to refresh token");
            keycloak.logout();
          });
      }, 6000);
    })
    .catch((e) => {
      console.log("Authenticated Failed", e);
    });
} else {
  console.log("set dummy test roles");
  store.commit("SET_ROLES", ["test", "admin", "routing"]);
  store.commit("SET_TOKEN", "1323456789");
  store.commit("SET_USER", { id: "test", name: "test" });
  keycloak = {
    logout: function () {
      console.log("dummy keycloak logout");
    },
  };
}

export default keycloak;
