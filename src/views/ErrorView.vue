<script setup lang="ts">
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { ref, onUnmounted, computed } from 'vue'
import { useLanguageStore } from '@/stores/language'

let seconds = ref(10)
const router = useRouter()
const route = useRoute()
const errorType = String(route.params.errorType)
const languageStore = useLanguageStore()

const content = languageStore.getContent('error')
const buttons = languageStore.getContent('buttons')

const intervalId = setInterval(() => {
  seconds.value--
  if (seconds.value === 0) {
    clearInterval(intervalId)
    router.push({ name: 'Home' })
  }
}, 1000)

onUnmounted(() => {
  clearInterval(intervalId)
})

const errorMessage = computed(() => {
  return content[errorType as keyof typeof content] || 'Unknown Error'
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
        class="hover:brightness-90 rounded-3xl bg-monero-orange border border-white py-1 px-3 text-xl text-white"
        :to="{ name: 'Home' }"
      >
        {{ buttons.continue }} ({{ seconds }}{{ buttons.seconds }})</RouterLink
      >
    </div>
  </div>
</template>
