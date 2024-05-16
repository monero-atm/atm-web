<template>
  <div class="flex flex-col">
    <div class="flex flex-col justify-center items-center flex-grow">
      <p class="text-lg font-semibold text-monero-grey m-3">Inserted Cash:</p>
      <input readonly class="input bg-monero-orange text-white rounded-3xl py-2 px-4 text-xl text-center" />

      <p class="text-lg font-semibold text-monero-grey m-3">Monero amount:</p>
      <input readonly class="input bg-monero-orange text-white rounded-3xl py-2 px-4 text-xl text-center" />

      <p class="text-lg font-semibold text-monero-grey m-3">Destination address:</p>
      <input readonly class="input bg-monero-grey text-white rounded-3xl py-2 px-4 w-11/12 text-xl text-center" />
    </div>
    <div class="flex justify-between items-center m-5">
      <RouterLink
        class="hover:brightness-90 rounded-3xl bg-white border border-black py-1 px-3 text-xl text-monero-grey"
        :to="{ name: 'Error', params: { errorType: 'cancelled' } }">
        Cancel
      </RouterLink>
      <RouterLink class="hover:bg-opacity-75 rounded-3xl bg-monero-orange py-1 px-3 text-xl text-white"
        :to="{ name: 'Success' }">
        Continue >>></RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
