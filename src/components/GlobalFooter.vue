<script setup lang="ts">
import { useExchangeRateStore } from '../stores/exchangeRate'

const exchangeRateStore = useExchangeRateStore()

</script>

<template>
  <div class="bg-monero-grey text-white p-3">
    <div class="container mx-auto flex flex-row gap-3 justify-center">
      <p class="text-monero-orange text-lg">1 XMR = €{{ exchangeRateStore.getRate('eur') }}</p>
      <p class="text-monero-orange">|</p>
      <p class="text-monero-orange text-lg">1 XMR = ${{ exchangeRateStore.getRate('usd') }}</p>
      <p class="text-monero-orange">|</p>
      <p class="text-monero-orange text-lg">1 XMR = {{ exchangeRateStore.getRate('czk') }} Kč</p>
    </div>
  </div>
</template>
