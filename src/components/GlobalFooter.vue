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
      <p class="text-monero-orange text-lg">1 XMR = €{{ sessionStore.getRate('eur') }}</p>
      <p class="text-monero-orange">|</p>
      <!--p class="text-monero-orange text-lg">1 XMR = ${{ sessionStore.getRate('usd') }}</p>
      <p class="text-monero-orange">|</p-->
      <p class="text-monero-orange text-lg">1 XMR = {{ sessionStore.getRate('czk') }} Kč</p>
    </div>
    <LanguageDropdown />
  </div>
</template>
