<script setup lang="ts">
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { ref, onUnmounted, computed } from 'vue'

let seconds = ref(10)
const router = useRouter()
const route = useRoute()
const errorType = String(route.params.errorType)


const intervalId = setInterval(() => {
  seconds.value--
  if (seconds.value === 0) {
    clearInterval(intervalId)
    router.push('/')
  }
}, 1000)

onUnmounted(() => {
  clearInterval(intervalId);
})


const errorMessageList: Record<string, string> = {
  'cancelled': 'TRANSACTION CANCELED',
  'exchange': 'EXCHANGE ERROR',
  'invalidID': 'INVALID WALLET ID'
}

const errorMessage = computed(() => {
  return errorMessageList[errorType] || 'Unknown Error'
})
</script>

<template>
  <div class="flex flex-col bg-monero-orange">
    <div class="flex flex-col flex-grow justify-center gap-3 items-center">
      <p class="text-6xl text-center font-black text-white m-9">{{ errorMessage }}</p>
      <img class="max-w-33 max-h-48" src="../assets/vectorcancel-x.svg" alt="Arrow pointing upwards">
    </div>
    <div class="flex justify-end items-center m-5">
      <RouterLink
        class="hover:brightness-90 rounded-3xl bg-monero-orange border border-white py-1 px-3 text-xl text-white"
        :to="{ name: 'Home' }">
        Main page (in {{ seconds }}sec.)</RouterLink>

    </div>

  </div>
</template>
