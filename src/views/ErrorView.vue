<script setup lang="ts">
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { ref, onUnmounted, computed } from 'vue'
import { useLanguageStore } from '@/stores/language'
import type { ErrorTranslations } from '@/types/translations'
import { useWebSocketStore } from '../stores/websocket'

const webSocketStore = useWebSocketStore()
let seconds = ref(10)
const router = useRouter()
const route = useRoute()
const errorType = ref(String(route.params.errorType))
const languageStore = useLanguageStore()

const buttons = languageStore.getContent('buttons')

const intervalId = setInterval(() => {
  seconds.value--
  if (seconds.value === 0) {
    clearInterval(intervalId)
    router.push({ name: 'Home' })
  }
}, 1000)

onUnmounted(() => {
  webSocketStore.sendMessage(JSON.stringify({ event: 'final', value: null }))
  clearInterval(intervalId)
})

const errorMessage = computed(() => {
  const errorTranslations = languageStore.getContent('error')
  return errorTranslations.value[errorType.value as keyof ErrorTranslations] || 'Unknown Error'
})
</script>

<template>
  <div class="flex flex-col bg-monero-orange">
    <div class="flex flex-col flex-grow justify-center gap-3 items-center">
      <p class="text-6xl text-center font-black text-white m-9">{{ errorMessage }}</p>
      <img
        class="max-w-33 max-h-48"
        src="../assets/Vectorcancel-x.svg"
        alt="Arrow pointing upwards"
      />
    </div>
    <div class="flex justify-end items-center m-5">
      <RouterLink
        class="hover:brightness-90 rounded-3xl bg-monero-orange border border-white py-2 px-4 text-3xl text-white"
        :to="{ name: 'Home' }"
      >
        {{ buttons.continue }} ({{ seconds }}{{ buttons.seconds }})</RouterLink
      >
    </div>
  </div>
</template>
