<script>
import NavHeader from './components/NavHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  components: { NavHeader, AppFooter }
};
</script>

<template>
  <NavHeader />

  <router-view />

  <AppFooter />
</template>

<style lang="scss">
@use "./styles/general.scss";
</style>