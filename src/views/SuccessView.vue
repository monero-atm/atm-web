<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref, onUnmounted } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useLanguageStore } from '@/stores/language'

let seconds = ref(10)
const router = useRouter()
const sessionStore = useSessionStore()
const languageStore = useLanguageStore()

const content = languageStore.getContent('success')
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
</script>

<template>
  <div class="flex flex-col bg-monero-orange">
    <div class="flex flex-col flex-grow justify-center gap-3 items-center">
      <p class="text-6xl text-center font-black text-white m-9">{{ content.title }}</p>
      <img
        class="max-w-33 max-h-48"
        src="../assets/Vectorsuccess.svg"
        alt="Arrow pointing upwards"
      />
      <p class="text-4xl text-center font-black text-white">{{ sessionStore.moneroAmount }} XMR</p>
      <p class="text-3xl text-center font-medium text-white">{{ content.secondTitle }}</p>
      <input
        readonly
        class="input bg-monero-grey text-white rounded-3xl py-2 px-4 w-11/12 text-xl text-center"
        :value="sessionStore.walletAddress"
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
