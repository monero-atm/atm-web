<template>
  <div class="flex flex-col">
    <div class="flex flex-col justify-center items-center flex-grow">
      <p class="text-lg font-semibold text-monero-grey m-3">Inserted Cash:</p>
      <input readonly class="input bg-monero-orange text-white rounded-3xl py-2 px-4 text-xl text-center"
        :value="sessionStore.moneyAmount" />

      <p class="text-lg font-semibold text-monero-grey m-3">Monero amount:</p>
      <input readonly class="input bg-monero-orange text-white rounded-3xl py-2 px-4 text-xl text-center"
        :value="sessionStore.moneroAmount" />

      <p class="text-lg font-semibold text-monero-grey m-3">Destination address:</p>
      <input readonly class="input bg-monero-grey text-white rounded-3xl py-2 px-4 w-11/12 text-xl text-center"
        :value="sessionStore.walletAddress" />
    </div>
    <div class="flex justify-end items-center m-5">
      <RouterLink class="hover:bg-opacity-75 rounded-3xl bg-monero-orange py-1 px-3 text-xl text-white"
        :to="{ name: 'Success' }">
        Continue >>> ({{ seconds }}sec.)</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref, onUnmounted } from 'vue'
import { useSessionStore } from '@/stores/session';

let seconds = ref(60)
const router = useRouter()
const sessionStore = useSessionStore()



const intervalId = setInterval(() => {
  seconds.value--
  if (seconds.value === 0) {
    clearInterval(intervalId)
    router.push({ name: 'Success' })
  }
}, 1000)

onUnmounted(() => {
  clearInterval(intervalId);
})
</script>
