<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import Navigation from './components/Navigation.vue';

</script>

<template>
  <v-app>
  <nav>
    <v-navigation-drawer>
    <navigation></navigation>
    </v-navigation-drawer>
  </nav>
  <main>
    <v-main>
    <router-view></router-view>
    </v-main>
  </main>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
