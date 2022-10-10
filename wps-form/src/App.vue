<template>
  <div class="app">
    <Header class="header" v-if="this.$route.path !== '/login'" />
    <router-view class="router-view" />
  </div>
</template>

<script lang="ts">
import "./assets/styles/main.css";
import { defineComponent } from "vue";
import Header from "./components/formHeader.vue";
export default defineComponent({
  name: "App",
  components: {
    Header,
  },
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.header {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

.router-view {
  margin-top: 8vh;
}
</style>
