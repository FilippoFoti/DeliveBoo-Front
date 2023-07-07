<script>
import NavHeader from './components/NavHeader.vue';

export default {
  components: { NavHeader },
}

</script>

<template>
  <NavHeader />
  
  <router-view />
</template>

<style lang="scss">
@use "./styles/general.scss";
</style>
