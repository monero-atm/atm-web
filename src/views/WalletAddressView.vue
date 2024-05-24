<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref, onUnmounted, computed } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useLanguageStore } from '@/stores/language'

let seconds = ref(1005)
const router = useRouter()
const sessionStore = useSessionStore()
const languageStore = useLanguageStore()

const content = languageStore.getContent('wallet')
const buttons = languageStore.getContent('buttons')

const intervalId = setInterval(() => {
  seconds.value--
  if (seconds.value === 0) {
    clearInterval(intervalId)
    router.push({ name: 'Payment' })
  }
}, 1000)

onUnmounted(() => {
  clearInterval(intervalId)
})

//can be changed depending on how much letters you wish to keep in a single line
const rows = computed(() => Math.ceil(sessionStore.walletAddress.length / 80))
</script>

<template>
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
    <div class="flex justify-between items-center m-5">
      <RouterLink
        class="hover:brightness-90 rounded-full bg-white border border-black py-2 px-4 text-5xl text-monero-grey"
        :to="{ name: 'Error', params: { errorType: 'cancelled' } }" data-testid="cancel-transaction-button">
        {{ buttons.cancel }}
      </RouterLink>
      <RouterLink class="hover:bg-opacity-75 rounded-full bg-monero-orange py-2 px-4 text-5xl text-white"
        :to="{ name: 'Payment' }" data-testid="continue-transaction-button-wallet">
        {{ buttons.continue }} ({{ seconds }}{{ buttons.seconds }})
      </RouterLink>
    </div>
  </div>
</template>
