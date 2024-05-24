<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref, onUnmounted } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useLanguageStore } from '@/stores/language'

let seconds = ref(6000)
const router = useRouter()
const sessionStore = useSessionStore()
const languageStore = useLanguageStore()

const content = languageStore.getContent('review')
const buttons = languageStore.getContent('buttons')


const intervalId = setInterval(() => {
  seconds.value--
  if (seconds.value === 0) {
    clearInterval(intervalId)
    router.push({ name: 'Success' })
  }
}, 1000)

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col justify-center items-center flex-grow">
      <p class="text-8xl font-black text-monero-grey m-9">{{ content.firstTitle }}</p>

      <div class="flex w-full justify-center items-center gap-3 mb-16 mt-6 ">
        <div class="flex flex-col items-center">
          <p class="text-4xl font-semibold text-monero-grey">Euro</p>
          <input id="money-amount-eur"
            class="input bg-monero-orange text-white rounded-3xl py-2 px-4 text-4xl text-center"
            :value="sessionStore.moneyAmount.eur" />
        </div>
        <div class="flex flex-col items-center">
          <p class="text-4xl font-semibold text-monero-grey">Czech Kurona </p>
          <input id="money-amount-czk"
            class="input bg-monero-orange text-white rounded-3xl py-2 px-4 text-4xl text-center"
            :value="sessionStore.moneyAmount.czk" />
        </div>
      </div>

      <p class="text-4xl font-semibold text-monero-grey m-3">{{ content.secondTitle }}</p>
      <input id="monero-amount" readonly
        class="input bg-monero-orange text-white rounded-3xl py-2 px-4 text-4xl text-center"
        :value="sessionStore.moneroAmount" />

    </div>
    <div class="flex justify-end items-center m-5">
      <RouterLink class="hover:bg-opacity-75 rounded-full bg-monero-orange py-2 px-4 text-5xl text-white"
        :to="{ name: 'Success' }" data-testid="continue-transaction-button-review">
        {{ buttons.continue }} ({{ seconds }}{{ buttons.seconds }})</RouterLink>
    </div>
  </div>
</template>