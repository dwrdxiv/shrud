<script setup>
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
import Encabezado from './components/Encabezado.vue';
</script>

<template>
  <div>
    <Encabezado />
    <NavBar />
  </div>
  <RouterView/>
</template>

<style scoped>


</style>
