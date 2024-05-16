import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useExchangeRateStore } from './exchangeRate'

export const useSessionStore = defineStore('session', () => {
  const walletAddress = ref('')
  const moneyAmount = ref(0)
  const selectedCurrency = ref('')
  const moneroAmount = ref(0)

  //please remove this after implementing the
  //conversion from the db
  const exchangeRate = useExchangeRateStore()

  function setWalletAddress(address: string) {
    walletAddress.value = address
  }

  function setCurrency(currency: string) {
    selectedCurrency.value = currency
  }

  function addMoney(amount: number) {
    moneyAmount.value += amount
    convertToMonero()
  }

  function convertToMonero() {
    // Implement the connection to the db for calculation
    // this is only for example purposes
    moneroAmount.value = moneroAmount.value / Number(exchangeRate.getRate(selectedCurrency.value))
  }

  function clearSession() {
    walletAddress.value = ''
    moneyAmount.value = 0
    selectedCurrency.value = ''
    moneroAmount.value = 0
  }

  return {
    walletAddress,
    selectedCurrency,
    moneyAmount,
    moneroAmount,
    setWalletAddress,
    setCurrency,
    addMoney,
    clearSession
  }
})
