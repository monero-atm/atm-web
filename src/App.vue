<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useExchangeRateStore } from './stores/exchangeRate'

const exchangeRateStore = useExchangeRateStore()
exchangeRateStore.startRefetching()

</script>

<template>
  <RouterView />
</template>
