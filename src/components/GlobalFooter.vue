<script setup lang="ts">
import { useExchangeRateStore } from '@/stores/exchangeRate'
import { ref, watch } from 'vue'
import { useLanguageStore } from '@/stores/language'
import 'flag-icons/css/flag-icons.min.css'
import LanguageDropdown from '@/components/LanguageDropdown.vue'

const exchangeRateStore = useExchangeRateStore()
const languageStore = useLanguageStore()

const selectedLanguage = ref(languageStore.selectedLanguage)

watch(
  () => languageStore.selectedLanguage,
  (newLang) => {
    selectedLanguage.value = newLang
  }
)
</script>

<template>
  <div class="flex items-center bg-monero-grey text-white p-3 relative">
    <div class="container mx-auto flex flex-row gap-3 justify-center">
      <p class="text-monero-orange text-lg">1 XMR = €{{ exchangeRateStore.getRate('eur') }}</p>
      <p class="text-monero-orange">|</p>
      <p class="text-monero-orange text-lg">1 XMR = ${{ exchangeRateStore.getRate('usd') }}</p>
      <p class="text-monero-orange">|</p>
      <p class="text-monero-orange text-lg">1 XMR = {{ exchangeRateStore.getRate('czk') }} Kč</p>
    </div>
    <LanguageDropdown />
  </div>
</template>

<style scoped>
.container {
  position: relative;
}

.ml-auto {
  margin-left: auto;
}

.relative .absolute {
  display: none;
}

.relative .focus:outline-none + .absolute {
  display: block;
}

.relative:hover .absolute {
  display: block;
}

.absolute {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.block {
  display: block;
}

.p-2 {
  padding: 0.5rem;
}

.w-8 {
  width: 2rem;
}

.h-8 {
  height: 2rem;
}

.rounded-full {
  border-radius: 9999px;
}

.shadow-lg {
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
