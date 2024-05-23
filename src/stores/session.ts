import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useExchangeRateStore } from './exchangeRate'

export const useSessionStore = defineStore('session', () => {
  const walletAddress = ref('')
  const moneroAmount = ref(0)
  const moneyAmount = ref(0)
  const selectedCurrency = ref('')

  // add the functionality for getting them from the server
  const transactionId = ref('7a6111c62babea729d79a5623ff7e256704cc213dab40507fb149a47a98e617d')
  const block = ref('3,051,784')

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
    moneroAmount.value = moneyAmount.value / Number(exchangeRate.getRate(selectedCurrency.value))
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
    transactionId,
    block,
    setWalletAddress,
    setCurrency,
    addMoney,
    clearSession
  }
})
