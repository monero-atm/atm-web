<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { useSessionStore } from '@/stores/session'
import 'flag-icons/css/flag-icons.min.css'
import LanguageDropdown from '@/components/LanguageDropdown.vue'

const languageStore = useLanguageStore()
const sessionStore = useSessionStore()

const selectedLanguage = ref(languageStore.selectedLanguage)

watch (
  () => languageStore.selectedLanguage,
  (newLang) => {
    selectedLanguage.value = newLang
  }
)
</script>

<template>
  <div class="flex items-center bg-monero-grey text-white p-3 relative">
    <div class="container mx-auto flex flex-row gap-3 justify-center">
      <span class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-2xl font-medium text-yellow-600 ring-1 ring-inset ring-yellow-500/10">1 XMR = {{ sessionStore.getRate('eur') }} €</span>
      <span class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-2xl font-medium text-yellow-600 ring-1 ring-inset ring-yellow-500/10">1 XMR = {{ sessionStore.getRate('czk') }} Kč</span>
      <span class="inline-flex items-center rounded-md bg-yellow-50 px-2 space-x-2 text-2xl py-1 font-medium text-yellow-600 ring-1 ring-inset ring-yellow-500/10">
        <div v-if="sessionStore.getMpayStatus()" style="width: 0.5rem; height: 0.5rem" class="bg-green-500 rounded-full"></div>
        <div v-else style="width: 0.5rem; height: 0.5rem" class="bg-red-500 rounded-full"></div>
        <div>MoneroPay</div>
      </span>

    </div>
    <LanguageDropdown />
  </div>
</template>
