<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLanguageStore } from '@/stores/language'
import 'flag-icons/css/flag-icons.min.css'

const flags: Record<string, string> = {
  en: 'fi fi-gb',
  cz: 'fi fi-cz',
  lt: 'fi fi-lt'
}

const languageStore = useLanguageStore()
const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const changeLanguage = (language: string) => {
  languageStore.setLanguage(language)
  showDropdown.value = false
}

const selectedLanguage = ref(languageStore.selectedLanguage)

watch(
  () => languageStore.selectedLanguage,
  (newLang) => {
    selectedLanguage.value = newLang
  }
)
</script>

<template>
  <div class="relative inline-flex">
    <button @click="toggleDropdown"
      class="py-3 px-4 inline-flex items-center gap-x-2 rounded-lg border shadow-sm hover:bg-gray-50 bg-neutral-800 border-neutral-700 hover:bg-neutral-900">
      <span :class="[flags[selectedLanguage], { 'opacity-50': showDropdown }]"></span>
    </button>

    <div v-if="showDropdown" class="absolute placement bottom-full px-4 mt-2 mb-3 shadow-lg rounded-lg bg-neutral-800">
      <button v-for="(flagClass, lang) in flags" :key="lang" @click="() => changeLanguage(lang)"
        class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg hover:bg-gray-100 focus:bg-gray-100 hover:bg-neutral-700">
        <span :class="[
      flagClass,
      'w-8 h-8 rounded-full transition-opacity',
      { 'opacity-25': selectedLanguage === lang }
    ]"></span>
      </button>
    </div>
  </div>
</template>

<style>
.placement {
  right: -10px;
}
</style>
