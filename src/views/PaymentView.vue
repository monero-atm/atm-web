<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import { useLanguageStore } from '@/stores/language'
import { watch, onBeforeMount, onUnmounted, ref } from 'vue'
import { useWebSocketStore } from '../stores/websocket'

const webSocketStore = useWebSocketStore()
const sessionStore = useSessionStore()
const languageStore = useLanguageStore()
const router = useRouter()

const content = languageStore.getContent('payment')
const buttons = languageStore.getContent('buttons')
const nav = languageStore.getContent('nav')

let seconds = ref(60)
let moneyInserted = ref(false)

const intervalId = setInterval(() => {
  seconds.value--
  if (seconds.value === 0) {
    clearInterval(intervalId)
    if (moneyInserted.value) {
      router.push({ name: 'Review' })
    } else {
      router.push({ name: 'Error', params: { errorType: 'cancelled' }})
    }
  }
}, 1000)

watch(
  () => webSocketStore.message,
  (newMessage) => {
    console.log(newMessage)
    const backendUpdate = JSON.parse(newMessage)
    if (backendUpdate.event === 'moneyin') {
      sessionStore.addMoney(backendUpdate.value.currency.toLowerCase(), backendUpdate.value.amount)
      moneyInserted.value = true
      seconds.value = 60
    }
  }
)

onUnmounted(() => {
  clearInterval(intervalId)
})

onBeforeMount(() => {
  webSocketStore.sendMessage(JSON.stringify({ event: 'moneyin', value: null }))
})
</script>

<template>
  <RouterLink :to="moneyInserted ? { name: 'Review' } : { name: 'Error', params: { errorType: 'cancelled' } }"
  data-testid="preview-transaction-button-payment">
  <div class="flex flex-col">
    <div class="flex flex-col flex-grow justify-center gap-3 items-center">
      <p class="text-8xl font-black text-monero-grey m-9">{{ content.title }}</p>
      <img
        class="max-w-33 max-h-48 rotate-left"
        src="../assets/Groupmonero-arrow.svg"
        alt="Arrow pointing downwards"
      />
      <p class="text-4xl text-center font-semibold text-monero-grey m-3">
        {{ content.instruction }}
      </p>
    </div>
      <p class="text-4xl text-center font-semibold text-monero-grey m-10">
        {{ nav.proceed }}
      </p>
      <p class="text-3xl text-center font-semibold text-monero-grey m-10">
        {{ nav.cancel }} ({{ seconds }}{{ buttons.seconds }})
      </p>

      <!-- <RouterLink
        class="hover:bg-opacity-75 rounded-full bg-monero-orange py-2 px-4 text-5xl text-white"
        :to="{ name: 'Review' }"
        :style="{ visibility: sessionStore.billAmount == 0 ? 'hidden' : 'visible' }"
        data-testid="continue-transaction-button-payment"
      >
        {{ buttons.continue }}
      </RouterLink> -->
    </div>
  </RouterLink>
</template>
