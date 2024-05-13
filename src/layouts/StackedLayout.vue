<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import GlobalHeader from '../components/GlobalHeader.vue'
import GlobalFooter from '../components/GlobalFooter.vue'

const route = useRoute()
const showHeader = computed(() => !route.meta.hideHeader)
</script>

<template>
  <div class="flex flex-col min-h-screen min-w-screen">
    <GlobalHeader v-if="showHeader" />
    <RouterView class="h-full flex-grow px-1 py-2" />
    <GlobalFooter />
  </div>
</template>
