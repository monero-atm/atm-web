<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import GlobalFooter from './components/GlobalFooter.vue'
import GlobalHeader from './components/GlobalHeader.vue'
import HomeView from './views/HomeView.vue';
</script>

<template>
  <GlobalHeader />
  <HomeView />
  <GlobalFooter />
</template>
