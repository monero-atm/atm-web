<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import { useLanguageStore } from '@/stores/language'

const sessionStore = useSessionStore()
const languageStore = useLanguageStore()

const content = languageStore.getContent('payment')
const buttons = languageStore.getContent('buttons')

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
      <p class="text-6xl font-black text-monero-grey m-9">{{ content.title }}</p>
      <img
        class="max-w-33 max-h-48 rotate-left"
        src="../assets/Groupmonero-arrow.svg"
        alt="Arrow pointing downwards"
      />
      <p class="text-lg text-center font-semibold text-monero-grey m-3">
        {{ content.instruction }}
      </p>
    </div>
    <div class="flex justify-between items-center m-5">
      <RouterLink
        class="hover:brightness-90 rounded-3xl bg-white border border-black py-1 px-3 text-xl text-monero-grey"
        :to="{ name: 'Error', params: { errorType: 'cancelled' } }"
        :style="{ visibility: sessionStore.moneyAmount == 0 ? 'visible' : 'hidden' }"
      >
        {{ buttons.cancel }}
      </RouterLink>
      <RouterLink
        class="hover:bg-opacity-75 rounded-3xl bg-monero-orange py-1 px-3 text-xl text-white"
        :to="{ name: 'Review' }"
      >
        {{ buttons.continue }}
      </RouterLink>
    </div>
  </div>
</template>
