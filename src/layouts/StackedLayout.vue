<script lang="ts" setup>
import GlobalHeader from '../components/GlobalHeader.vue'
import GlobalFooter from '../components/GlobalFooter.vue'
</script>

<template>

  <GlobalHeader />
  <main>
    <div class="container px-1 py-2 md:mx-auto">
      <RouterView />
    </div>
  </main>
  <GlobalFooter />
</template>