<script lang="ts" setup>
import GlobalHeader from '../components/GlobalHeader.vue'
import GlobalFooter from '../components/GlobalFooter.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen min-w-screen">
    <GlobalHeader />
    <RouterView class="h-full flex-grow px-1 py-2" />
    <GlobalFooter />
  </div>
</template>
