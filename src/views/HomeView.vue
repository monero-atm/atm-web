<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-col items-center">
      <p class="text-6xl font-black text-monero-grey m-9">Scan the QR code to begin</p>
      <img class="max-w-33 max-h-48" src="../assets/Groupmonero-arrow.svg" alt="Arrow pointing upwards">
      <p class="text-lg font-semibold text-monero-grey m-3">Find the camera above the screen</p>
    </div>
    <div class="flex justify-center">
      <RouterLink class="hover:bg-opacity-75 rounded-3xl bg-monero-orange py-2 px-5 text-2xl text-white min-w-50 m-10"
        to="/wallet">Or
        enter
        wallet ID
      </RouterLink>
    </div>

  </div>
</template>
