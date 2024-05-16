<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSessionStore } from '@/stores/session';

const sessionStore = useSessionStore()

/*
Implementation for getting the currency and amount from the
cash acceptor
also if we there is a thought of implementing a countdown here too
then it's best to reset that timer whenever the user deposits more
*/

//ONLY FOR TEST PURPOSES
sessionStore.setCurrency('eur')
sessionStore.addMoney(213)

</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col flex-grow justify-center gap-3 items-center">
      <p class="text-6xl font-black text-monero-grey m-9">Insert your money</p>
      <img class="max-w-33 max-h-48 rotate-left" src="../assets/Groupmonero-arrow.svg" alt="Arrow pointing downwards">
      <p class="text-lg text-center font-semibold text-monero-grey m-3">Find the Cash Acceptor next to the screen</p>
    </div>
    <div class="flex justify-between items-center m-5">
      <RouterLink
        class="hover:brightness-90 rounded-3xl bg-white border border-black py-1 px-3 text-xl text-monero-grey"
        :to="{ name: 'Error', params: { errorType: 'cancelled' } }"
        :style="{ visibility: sessionStore.moneyAmount == 0 ? 'visible' : 'hidden' }">
        Cancel
      </RouterLink>
      <RouterLink class="hover:bg-opacity-75 rounded-3xl bg-monero-orange py-1 px-3 text-xl text-white"
        :to="{ name: 'Review' }">
        Continue >>></RouterLink>

    </div>

  </div>
</template>
