<script setup lang="ts">
import { watch, onBeforeMount } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { useSessionStore } from '@/stores/session'
import { RouterLink, useRouter } from 'vue-router'
import { useWebSocketStore } from '../stores/websocket'
import euroImage from '../assets/euro.jpg'
import czechKorunaImage from '../assets/czech-koruna.jpg'

const sessionStore = useSessionStore()
const languageStore = useLanguageStore()
const webSocketStore = useWebSocketStore()
const router = useRouter()

let content = languageStore.getContent('home')

const czKoruna = import.meta.env.VITE_CZECH_KORUNA

const items = [
  { imgSrc: euroImage, altText: 'euro cash', description: content.value.euroDescription },
]

if (czKoruna == "true") {
  items.push(
    {
      imgSrc: czechKorunaImage,
      altText: 'czech koruna cash',
      description: content.value.czechKorunaDescription
    })
}

onBeforeMount(() => {
  sessionStore.clearSession()
  languageStore.resetLanguage()
})

watch(
  () => webSocketStore.message,
  (newMessage) => {
    console.log(newMessage)
    const backendUpdate = JSON.parse(newMessage)
    if (backendUpdate.event === 'addressin') {
      sessionStore.setWalletAddress(backendUpdate.value)
      router.push('/wallet')
    }
    else if (backendUpdate.event === 'price') {
      for (var currency of backendUpdate.value.currencies) {
        sessionStore.updateRate(currency.short.toLowerCase(), currency.amount)
      }
    }
    else if (backendUpdate.event === 'mpay_health') {
      sessionStore.setMpayStatus(backendUpdate.value)
    }
  }
)
</script>

<template>
  <RouterLink :to="{ name: 'Scan' }" data-testid="start-transaction-button" class="flex flex-col justify-center">
    <div>
      <div class="flex justify-center">
        <p class="text-8xl text-center font-black text-monero-grey m-9">{{ content.title }}</p>
      </div>
      <div class="flex justify-evenly">
        <div v-for="(item, index) in items" :key="index" class="flex flex-col items-center justify-center">
          <img :src="item.imgSrc" :alt="item.altText" class="w-60 h-60 rounded-full" />
          <p class="text-2xl text-center text-monero-grey m-3">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex justify-center align-middle">
      <div class="text-monero-grey text-5xl mt-10">
        {{ content.start }}
      </div>
    </div>
  </RouterLink>
</template>
