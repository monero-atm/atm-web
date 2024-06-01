<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/session'
import { useLanguageStore } from '@/stores/language'
import { onBeforeMount, onUnmounted, ref, watch } from 'vue'
import { useWebSocketStore } from '../stores/websocket'

const router = useRouter()
const webSocketStore = useWebSocketStore()
const languageStore = useLanguageStore()
const sessionStore = useSessionStore()

const content = languageStore.getContent('scan')
const buttons = languageStore.getContent('buttons')

const scannedCode = ref('')

let seconds = ref(20)

const intervalId = setInterval(() => {
  seconds.value--
  if (seconds.value === 0) {
    clearInterval(intervalId)
    webSocketStore.sendMessage(JSON.stringify({ event: 'cancel', value: null }))
    router.push({ name: 'Home' })
  }
}, 1000)



/*
function handleScannerInput(event: KeyboardEvent) {
  //handling it as if it's a keyboard storkes and ASSUMING
  //that it ends it with ENTER, if not this will not work
  //if it's directly giving it on one go then a different
  //approach might be necessary

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
*/

onUnmounted(() => {
  clearInterval(intervalId)
})

watch(
  () => webSocketStore.message,
  (newMessage) => {
    console.log(newMessage)
    const backendUpdate = JSON.parse(newMessage)
    if (backendUpdate.event === 'addressin') {
      sessionStore.setWalletAddress(backendUpdate.value)
      router.push('/wallet');
    }
  }
)
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-col items-center">
      <p class="text-8xl text-center font-black text-monero-grey m-9" data-testid="title-scanpage">
        {{ content.title }}
      </p>
      <img
        class="max-w-33 max-h-48 rotate-right"
        src="../assets/Groupmonero-arrow.svg"
        alt="Arrow pointing to the right"
      />
      <p class="text-4xl text-center font-semibold text-monero-grey m-3">
        {{ content.instruction }}
      </p>
      <p class="text-3xl text-center font-semibold text-monero-grey m-10">
        {{ buttons.return }} ({{ seconds }}{{ buttons.seconds }})
      </p>
    </div>
  </div>
</template>
