<script setup lang="ts">
import { useLanguageStore } from '@/stores/language'
import { useSessionStore } from '@/stores/session'
import { onBeforeMount } from 'vue'
import { RouterLink } from 'vue-router'
import euroImage from '../assets/euro.jpg'
import czechKorunaImage from '../assets/czech-koruna.jpg'

const sessionStore = useSessionStore()
const languageStore = useLanguageStore()

const content = languageStore.getContent('home')
const buttons = languageStore.getContent('buttons')

const items = [
  { imgSrc: euroImage, altText: 'euro cash', description: content.value.euroDescription },
  {
    imgSrc: czechKorunaImage,
    altText: 'czech koruna cash',
    description: content.value.czechKorunaDescription
  }
]

onBeforeMount(() => {
  sessionStore.clearSession()
  languageStore.resetLanguage()
})
</script>

<template>
  <div class="flex flex-col justify-evenly">
    <div>
      <div class="flex justify-center">
        <p class="text-6xl text-center font-black text-monero-grey m-9">{{ content.title }}</p>
      </div>
      <div class="flex justify-evenly">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="flex flex-col items-center justify-center"
        >
          <img :src="item.imgSrc" :alt="item.altText" class="w-60 h-60 rounded-full" />
          <p class="text-lg text-center font-semibold text-monero-grey m-3">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <RouterLink
        class="hover:bg-opacity-75 rounded-3xl bg-monero-orange py-1 px-3 text-xl text-white"
        :to="{ name: 'Scan' }"
        data-testid="start-transaction-button"
      >
        {{ buttons.start }}
      </RouterLink>
    </div>
  </div>
</template>
