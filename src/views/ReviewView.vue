<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref, onUnmounted, computed } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useLanguageStore } from '@/stores/language'

let seconds = ref(6000)
const router = useRouter()
const sessionStore = useSessionStore()
const languageStore = useLanguageStore()

const content = languageStore.getContent('review')
const buttons = languageStore.getContent('buttons')
const currencies = ref(Object.keys(sessionStore.moneyAmount));
const moneyAmount = computed(() => sessionStore.moneyAmount[selectedCurrency.value])
const selectedCurrency = ref(currencies.value[0]);

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

const symbolMap: Record<string, string> = {
  eur: '€',
  czk: 'Kč',
}

const rows = computed(() => Math.ceil(sessionStore.walletAddress.length / 80))
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col justify-center items-center flex-grow">
      <p class="text-lg font-semibold text-monero-grey m-3">{{ content.firstTitle }}</p>
      <div class="flex items-center">

        <input id="money-amount" class="input bg-monero-orange text-white rounded-l-3xl py-2 px-4 text-xl text-center"
          :value="moneyAmount" />
        <select v-model="selectedCurrency" id="currency-select"
          class="bg-monero-orange text-white rounded-r-3xl py-2 px-4 text-center border-l border-monero-grey">
          <option class="bg-monero-orange text-white" v-for="currency in currencies" :key="currency" :value="currency">
            {{ symbolMap[currency] }}
          </option>
        </select>
      </div>

      <p class="text-lg font-semibold text-monero-grey m-3">{{ content.secondTitle }}</p>
      <input id="monero-amount" readonly
        class="input bg-monero-orange text-white rounded-3xl py-2 px-4 text-xl text-center"
        :value="sessionStore.moneroAmount" />

      <p class="text-lg font-semibold text-monero-grey m-3">{{ content.thirdTitle }}</p>
      <textarea readonly id="wallet-address"
        class="input break-all bg-monero-grey text-white rounded-3xl py-2 px-4 w-11/12 text-2xl text-center resize-none"
        :value="sessionStore.walletAddress" :rows="rows" data-testid="wallet-address"></textarea>
    </div>
    <div class="flex justify-between items-center m-5">
      <RouterLink class="hover:bg-opacity-75 rounded-3xl bg-monero-orange py-2 px-4 text-3xl text-white"
        :to="{ name: 'Payment' }" data-testid="add-more-money-button">
        Add More Money</RouterLink>
      <RouterLink class="hover:bg-opacity-75 rounded-3xl bg-monero-orange py-2 px-4 text-3xl text-white"
        :to="{ name: 'Success' }" data-testid="continue-transaction-button-review">
        {{ buttons.continue }} ({{ seconds }}{{ buttons.seconds }})</RouterLink>
    </div>
  </div>
</template>


<style>
#currency-select {
  font-size: 1.5rem;
}
</style>