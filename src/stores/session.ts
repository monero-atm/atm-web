import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useExchangeRateStore } from './exchangeRate'

interface MoneyAmount {
  [currency: string]: number
}

export const useSessionStore = defineStore('session', () => {
  const walletAddress = ref('')
  const moneroAmount = ref(0)
  const moneyAmount = ref<MoneyAmount>({
    eur: 0,
    czk: 0
  })
  const billAmount = ref(0)

  // add the functionality for getting them from the server
  const transactionId = ref('7a6111c62babea729d79a5623ff7e256704cc213dab40507fb149a47a98e617d')
  const block = ref('3,051,784')

  //please remove this after implementing the
  //conversion from the db
  const exchangeRate = useExchangeRateStore()

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

  function convertToMonero() {
    // Implement the connection to the db for calculation
    // this is only for example purposes
    for (const currency in moneyAmount.value) {
      if (Object.keys(moneyAmount.value).includes(currency)) {
        moneroAmount.value += moneyAmount.value[currency] / Number(exchangeRate.getRate(currency))
      } else {
        console.warn(`Currency ${currency} is not supported.`)
      }
    }
  }

  function clearSession() {
    walletAddress.value = ''
    moneyAmount.value = { eur: 0, czk: 0 }
    moneroAmount.value = 0
  }

  return {
    walletAddress,
    moneyAmount,
    moneroAmount,
    billAmount,
    transactionId,
    block,
    setWalletAddress,
    addMoney,
    clearSession
  }
})
