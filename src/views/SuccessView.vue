<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref, onUnmounted, computed, watch } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useLanguageStore } from '@/stores/language'
import { useWebSocketStore } from '../stores/websocket'

let seconds = ref(1000)
const webSocketStore = useWebSocketStore()
const router = useRouter()
const sessionStore = useSessionStore()
const languageStore = useLanguageStore()

const content = languageStore.getContent('success')
const buttons = languageStore.getContent('buttons')
const nav = languageStore.getContent('nav')

// const config = qrOptions
const intervalId = setInterval(() => {
  seconds.value--
  if (seconds.value === 0) {
    clearInterval(intervalId)
    webSocketStore.sendMessage(JSON.stringify({ event: 'final', value: null }))
    router.push({ name: 'Home' })
  }
}, 1000)

onUnmounted(() => {
  clearInterval(intervalId)
})

const rows = computed(() => Math.ceil(sessionStore.transactionId.length / 58))

watch(
  () => webSocketStore.message,
  (newMessage) => {
    console.log(newMessage)
    const backendUpdate = JSON.parse(newMessage)
    if (backendUpdate.event === 'txinfo') {
      // TODO
    }
  }
)
</script>

<template>
  <div class="flex flex-col bg-monero-orange">
    <div class="flex flex-col flex-grow justify-center items-center success">
      <p class="text-8xl text-center font-black text-white m-9">{{ content.title }}</p>
      <img
        class="max-w-33 max-h-48 mb-16"
        src="../assets/Vectorsuccess.svg"
        alt="Arrow pointing upwards"
      />
      <p class="text-4xl font-semibold text-white m-2">{{ content.secondTitle }}</p>
      <textarea
        readonly
        id="transaction-id"
        class="input break-all bg-monero-grey text-white rounded-3xl py-2 px-4 w-11/12 text-4xl text-center resize-none mb-2"
        :value="sessionStore.transactionId"
        :rows="rows"
        data-testid="transaction-id-success"
      />

      <p class="text-4xl font-semibold text-white m-2">{{ content.thirdTitle }}</p>
      <input
        readonly
        id="block-address"
        class="input bg-monero-grey text-white rounded-3xl py-2 px-4 text-4xl text-center mb-16"
        :value="sessionStore.block"
      />

      <!-- <QRCodeVue3 :width="config.width" :height="config.height" :value="sessionStore.transactionId" :image="moneroLogo"
        :margin="config.margin" :qrOptions="config.qrOptions" :imageOptions="config.imageOptions"
        :dotsOptions="config.dotsOptions" :backgroundOptions="config.backgroundOptions"
        :cornersSquareOptions="config.cornersSquareOptions" :cornersDotOptions="config.cornersDotOptions" /> -->
    </div>
    <div class="flex justify-end items-center m-5">
      <RouterLink
        class="hover:brightness-90 rounded-full bg-monero-orange border border-white py-2 px-4 text-5xl text-white"
        :to="{ name: 'Home' }"
        data-testid="return-home-button"
      >
        {{ nav.cancel }} ({{ seconds }}{{ buttons.seconds }})</RouterLink
      >
    </div>
  </div>
</template>
