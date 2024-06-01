import { ref } from 'vue'
import { defineStore } from 'pinia'

interface MoneyAmount {
  [currency: string]: number
}

interface MoneyRate {
  [currency: string]: number
}

export const useSessionStore = defineStore('session', () => {
  const walletAddress = ref('')
  const moneroAmount = ref(0)
  const moneyAmount = ref<MoneyAmount>({
    eur: 0,
    czk: 0
  })
  const moneyRate = ref<Record<string, number>>({})
  const billAmount = ref(0)

  // add the functionality for getting them from the server
  const transactionId = ref('7a6111c62babea729d79a5623ff7e256704cc213dab40507fb149a47a98e617d')
  const block = ref('3,051,784')

  function setWalletAddress(address: string) {
    walletAddress.value = address
  }

  function addMoney(currency: string, amount: number) {
    if (currency in moneyAmount.value) {
      moneyAmount.value[currency] += amount
      billAmount.value += 1
    } else {
      console.warn(`Currency ${currency} is not supported, yet.`)
    }

    moneroAmount.value = 0
    convertToMonero()
  }

  function updateRate(currency: string, amount: number) {
    moneyRate.value[currency] = amount
  }

  function getRate(currency: string) {
    console.log(currency)
    console.log(moneyRate.value[currency])
    return moneyRate.value[currency] || 'Does not exist'
  }

  function convertToMonero() {
    // Implement the connection to the db for calculation
    // this is only for example purposes
    for (const currency in moneyAmount.value) {
      if (Object.keys(moneyAmount.value).includes(currency)) {
        moneroAmount.value += moneyAmount.value[currency] / Number(getRate(currency))
      } else {
        console.warn(`Currency ${currency} is not supported.`)
      }
    }
  }

  function clearSession() {
    walletAddress.value = ''
    moneyAmount.value = { eur: 0, czk: 0 }
    moneroAmount.value = 0
    billAmount.value = 0
    // transactionId.value = ''
    // block.value = ''
  }

  return {
    walletAddress,
    moneyAmount,
    moneyRate,
    moneroAmount,
    billAmount,
    transactionId,
    block,
    setWalletAddress,
    addMoney,
    updateRate,
    getRate,
    clearSession
  }
})
