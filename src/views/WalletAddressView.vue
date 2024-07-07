<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref, onUnmounted, onBeforeMount, computed } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useLanguageStore } from '@/stores/language'
import { useWebSocketStore } from '../stores/websocket'

const webSocketStore = useWebSocketStore()
let seconds = ref(20)
const router = useRouter()
const sessionStore = useSessionStore()
const languageStore = useLanguageStore()

const content = languageStore.getContent('wallet')
const buttons = languageStore.getContent('buttons')
const nav = languageStore.getContent('nav')

const intervalId = setInterval(() => {
  seconds.value--
  if (seconds.value === 0) {
    clearInterval(intervalId)
    webSocketStore.sendMessage(JSON.stringify({ event: 'cancel', value: null }))
    router.push({ name: 'Home' })
  }
}, 1000)

onUnmounted(() => {
  clearInterval(intervalId)
})

onBeforeMount(() => {
  webSocketStore.sendMessage(JSON.stringify({ event: 'start', value: null }))
})

//can be changed depending on how much letters you wish to keep in a single line
const rows = computed(() => Math.ceil(sessionStore.walletAddress.length / 80))
</script>

<template>
  <RouterLink :to="{ name: 'Payment' }" data-testid="continue-transaction-button-wallet">
    <div class="flex flex-col">
      <div class="flex flex-col justify-center items-center flex-grow">
        <p class="text-8xl text-center font-black text-monero-grey m-9" data-testid="title-scanpage">
          {{ content.title }}
        </p>
        <p class="text-4xl font-bold text-monero-grey m-3">{{ content.secondTitle }}</p>
        <textarea readonly id="wallet-address"
          class="input break-all bg-monero-grey text-white rounded-3xl py-2 px-4 w-11/12 text-4xl text-center resize-none"
          :value="sessionStore.walletAddress" :rows="rows" data-testid="wallet-address"></textarea>
      </div>
    </div>
    <div class="flex text-monero-grey font-semibold justify-center text-center text-4xl items-center m-10">

      {{ nav.proceed }}
    </div>
    <div class="flex text-monero-grey font-semibold justify-center text-center text-2xl items-center m-10">
      {{ nav.cancel }} ({{ seconds }}{{ buttons.seconds }})
    </div>
  </RouterLink>
</template>
