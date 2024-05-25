<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import { useLanguageStore } from '@/stores/language'
import { watch } from 'vue'

const sessionStore = useSessionStore()
const languageStore = useLanguageStore()
const router = useRouter()

const content = languageStore.getContent('payment')
const buttons = languageStore.getContent('buttons')

watch(
  () => sessionStore.billAmount,
  () => {
    if (sessionStore.billAmount > 0) {
      router.push({ name: 'Review' })
    }
  }
)

/*
Implementation for getting the currency and amount from the
cash acceptor
also if we there is a thought of implementing a countdown here too
then it's best to reset that timer whenever the user deposits more
*/

//ONLY FOR TEST PURPOSES
setTimeout(() => {
  sessionStore.addMoney('eur', 200)
}, 7000)
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-col flex-grow justify-center gap-3 items-center">
      <p class="text-8xl font-black text-monero-grey m-9">{{ content.title }}</p>
      <img
        class="max-w-33 max-h-48 rotate-left"
        src="../assets/Groupmonero-arrow.svg"
        alt="Arrow pointing downwards"
      />
      <p class="text-4xl text-center font-semibold text-monero-grey m-3">
        {{ content.instruction }}
      </p>
    </div>
    <div class="flex justify-start items-center m-5">
      <RouterLink
        class="hover:brightness-90 rounded-full bg-white border border-black py-2 px-4 text-5xl text-monero-grey"
        :to="{ name: 'Error', params: { errorType: 'cancelled' } }"
        :style="{ visibility: sessionStore.billAmount == 0 ? 'visible' : 'hidden' }"
        data-testid="cancel-transaction-button-payment"
      >
        {{ buttons.cancel }}
      </RouterLink>
      <!-- <RouterLink
        class="hover:bg-opacity-75 rounded-full bg-monero-orange py-2 px-4 text-5xl text-white"
        :to="{ name: 'Review' }"
        :style="{ visibility: sessionStore.billAmount == 0 ? 'hidden' : 'visible' }"
        data-testid="continue-transaction-button-payment"
      >
        {{ buttons.continue }}
      </RouterLink> -->
    </div>
  </div>
</template>
