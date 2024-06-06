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
  const moneroAmount = ref('')
  const moneyAmount = ref<MoneyAmount>({
    eur: 0,
    czk: 0
  })
  const moneyRate = ref<Record<string, number>>({})

  // add the functionality for getting them from the server
  const transactionId = ref('')

  const moneropayStatus = ref(false)

  function setWalletAddress(address: string) {
    walletAddress.value = address
  }

  function setTxDetails(txid: string, xmr: string) {
    transactionId.value = txid
    moneroAmount.value = xmr
  }

  function addMoney(currency: string, amount: number) {
    if (currency in moneyAmount.value) {
      moneyAmount.value[currency] += amount
    } else {
      console.warn(`Currency ${currency} is not supported, yet.`)
    }
  }

  function updateRate(currency: string, amount: number) {
    moneyRate.value[currency] = amount
  }

  function setMpayStatus(status: boolean) {
    moneropayStatus.value = status
  }

  function getMpayStatus() {
    return moneropayStatus.value
  }

  function getRate(currency: string) {
    if (moneyRate.value[currency]) {
        return moneyRate.value[currency].toFixed(2)
    } else {
        return 'Does not exist'
    }
  }

/*
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
*/

  function clearSession() {
    walletAddress.value = ''
    moneyAmount.value = { eur: 0, czk: 0 }
    moneroAmount.value = ''
    transactionId.value = ''
  }

  return {
    walletAddress,
    moneyAmount,
    moneyRate,
    moneropayStatus,
    moneroAmount,
    transactionId,
    setWalletAddress,
    setTxDetails,
    getMpayStatus,
    setMpayStatus,
    addMoney,
    updateRate,
    getRate,
    clearSession
  }
})
