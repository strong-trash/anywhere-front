<template>
  <div id="app" class="anywhere">
    <app-header></app-header>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  data: function () {
    return {
      //
    };
  },
  components: {
    "app-header": AppHeader,
    "app-footer": AppFooter,
  },
};
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;

  overflow: hidden;
}
</style>
