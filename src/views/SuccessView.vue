<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref, onUnmounted, computed } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useLanguageStore } from '@/stores/language'
import QRCodeVue3 from 'qrcode-vue3'
import qrOptions from '../assets/options.json'
import moneroLogo from '../assets/monero-xmr-logo.svg'

let seconds = ref(1000)
const router = useRouter()
const sessionStore = useSessionStore()
const languageStore = useLanguageStore()

const content = languageStore.getContent('success')
const buttons = languageStore.getContent('buttons')

const config = qrOptions
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

const rows = computed(() => Math.ceil(sessionStore.transactionId.length / 80))
</script>

<template>
  <div class="flex flex-col bg-monero-orange">
    <div class="flex flex-col flex-grow justify-center items-center success">
      <p class="text-6xl text-center font-black text-white m-9">{{ content.title }}</p>
      <img class="max-w-33 max-h-48 mb-16" src="../assets/Vectorsuccess.svg" alt="Arrow pointing upwards" />
      <p class="text-xl font-semibold text-white m-2">{{ content.secondTitle }}</p>
      <textarea readonly id="transaction-id"
        class="input break-all bg-monero-grey text-white rounded-3xl py-2 px-4 w-11/12 text-2xl text-center resize-none mb-2"
        :value="sessionStore.transactionId" :rows="rows" data-testid="transaction-id-success" />

      <p class="text-xl font-semibold text-white m-2">{{ content.thirdTitle }}</p>
      <input id="block-address" class="input bg-monero-grey text-white rounded-3xl py-2 px-4 text-xl text-center mb-16"
        :value="sessionStore.block" />

      <p class="text-xl font-medium text-white m-2">{{ content.secondTitle }}</p>
      <QRCodeVue3 :width="config.width" :height="config.height" :value="sessionStore.transactionId" :image="moneroLogo"
        :margin="config.margin" :qrOptions="config.qrOptions" :imageOptions="config.imageOptions"
        :dotsOptions="config.dotsOptions" :backgroundOptions="config.backgroundOptions"
        :cornersSquareOptions="config.cornersSquareOptions" :cornersDotOptions="config.cornersDotOptions" />
    </div>
    <div class="flex justify-end items-center m-5">
      <RouterLink
        class="hover:brightness-90 rounded-3xl bg-monero-orange border border-white py-2 px-4 text-3xl text-white"
        :to="{ name: 'Home' }" data-testid="return-home-button">
        {{ buttons.continue }} ({{ seconds }}{{ buttons.seconds }})</RouterLink>
    </div>
  </div>
</template>
