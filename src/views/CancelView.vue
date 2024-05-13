<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref, onUnmounted } from 'vue'

let seconds = ref(Number(10))
const router = useRouter();

const intervalId = setInterval(() => {
  seconds.value--;
  if (seconds.value === 0) {
    clearInterval(intervalId);
    router.push('/');
  }
}, 1000);

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div class="flex flex-col bg-monero-orange">
    <div class="flex flex-col flex-grow justify-center gap-3 items-center">
      <p class="text-6xl text-center font-black text-white m-9">TRANSACTION CANCELED</p>
      <img class="max-w-33 max-h-48" src="../assets/vectorcancel-x.svg" alt="Arrow pointing upwards">
    </div>
    <div class="flex justify-end items-center m-5">
      <RouterLink
        class="hover:brightness-90 rounded-3xl bg-monero-orange border border-white py-1 px-3 text-xl text-white"
        to="/">
        Main page (in {{ seconds }}sec.)</RouterLink>

    </div>

  </div>
</template>
