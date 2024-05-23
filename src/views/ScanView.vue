<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import { useLanguageStore } from '@/stores/language'
import { onBeforeMount, onUnmounted, ref } from 'vue'

const router = useRouter()
const sessionStore = useSessionStore()
const languageStore = useLanguageStore()

const content = languageStore.getContent('scan')

//remove before production
const testWalletId =
  '8AeWQEHR6BsbiKqRoMnyFyH7uJApeUSdzedMxCheTNB35Vqh1s27Fk6dzMj7cVnr92cUfb5nt7Ny6R9NTrWP4iFa7iegGuA'

const scannedCode = ref('')

function handleScannerInput(event: KeyboardEvent) {
  /*
  handling it as if it's a keyboard storkes and ASSUMING
  that it ends it with ENTER, if not this will not work
  if it's directly giving it on one go then a different 
  approach might be necessary
   */
  if (event.key === 'Enter') {
    sessionStore.setWalletAddress(scannedCode.value)
    scannedCode.value = ''
    router.push({ name: 'Wallet' })
  } else {
    scannedCode.value += event.key
  }
}

onBeforeMount(() => {
  window.addEventListener('keydown', handleScannerInput)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleScannerInput)
})

//remove before production
function test() {
  sessionStore.setWalletAddress(testWalletId)
  router.push({ name: 'Wallet' })
}
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-col items-center">
      <p class="text-6xl text-center font-black text-monero-grey m-9" data-testid="title-scanpage">
        {{ content.title }}
      </p>
      <img class="max-w-33 max-h-48 rotate-right" src="../assets/Groupmonero-arrow.svg"
        alt="Arrow pointing to the right" />
      <p class="text-lg text-center font-semibold text-monero-grey m-3">
        {{ content.instruction }}
      </p>
    </div>

    <!-- REMOVE BEFORE PRODCUTION -->
    <div class="flex justify-center">
      <button data-testid="generate-test-address-button"
        class="hover:bg-opacity-75 rounded-3xl bg-monero-orange py-2 px-5 text-2xl text-white min-w-50 m-10"
        @click="test">
        (test)
      </button>
    </div>
  </div>
</template>
