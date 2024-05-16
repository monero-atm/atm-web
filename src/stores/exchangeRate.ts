import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useExchangeRateStore = defineStore('exchangeRate', () => {
  const rates = ref<Record<string, number>>({})
  // No idea how the production API is responding so i will just set
  // an example for showcase purposes

  const fetchMoneroRates = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=usd,eur,czk'
      )
      const data = await response.json()
      rates.value = data.monero
    } catch (error) {
      console.error('Failed to fetch Monero exchange rates:', error)
    }
  }

  function getRate(currency: string) {
    return rates.value[currency] || 'Does not exist'
  }

  const startRefetching = () => {
    fetchMoneroRates()
    setInterval(fetchMoneroRates, 3600000)
  }

  return { rates, fetchMoneroRates, getRate, startRefetching }
})
