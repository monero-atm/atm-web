import { computed, ref, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { en } from '../languages/en'
import { cz } from '../languages/cz'
import { lt } from '../languages/lt'
import type { Translations, TranslationKeys } from '../types/translations'

export const useLanguageStore = defineStore('language', () => {
  const defaultLanguage: string = 'en'
  const selectedLanguage = ref(defaultLanguage)
  const translations: Translations = {
    en,
    cz,
    lt
  }

  function setLanguage(language: string) {
    selectedLanguage.value = language
  }

  function resetLanguage() {
    selectedLanguage.value = defaultLanguage
  }

  function getContent<T extends keyof TranslationKeys>(
    component: T
  ): ComputedRef<TranslationKeys[T]> {
    return computed(() => {
      const lang = selectedLanguage.value
      return translations[lang][component] || translations[defaultLanguage][component]
    })
  }

  // const getContent = (component: keyof TranslationKeys) => {
  //   return computed(() => {
  //     const lang = selectedLanguage.value
  //     return translations[lang][component] || translations[defaultLanguage][component]
  //   })
  // }
  // function getContent<T extends keyof TranslationKeys>(component: T): TranslationKeys[T] {
  //   const lang = selectedLanguage.value
  //   return translations[lang][component] || translations[defaultLanguage][component]
  // }

  return {
    selectedLanguage,
    getContent,
    setLanguage,
    resetLanguage
  }
})
