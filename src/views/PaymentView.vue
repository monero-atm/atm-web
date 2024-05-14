<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col flex-grow justify-center gap-3 items-center">
      <p class="text-6xl font-black text-monero-grey m-9">Insert your money</p>
      <img class="max-w-33 max-h-48" src="../assets/Groupmonero-arrow-down.svg" alt="Arrow pointing downwards">
    </div>
    <div class="flex justify-between items-center m-5">
      <RouterLink
        class="hover:brightness-90 rounded-3xl bg-white border border-black py-1 px-3 text-xl text-monero-grey"
        :to="{ name: 'Error', params: { errorType: 'cancelled' } }">
        Cancel
      </RouterLink>
      <RouterLink class="hover:bg-opacity-75 rounded-3xl bg-monero-orange py-1 px-3 text-xl text-white"
        :to="{ name: 'Payment' }">
        Continue >>></RouterLink>

    </div>

  </div>
</template>
