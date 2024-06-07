import type { TranslationKeys } from '../types/translations'

export const en: TranslationKeys = {
  home: {
    title: 'ACCEPTED CURRENCIES',
    euroDescription: 'Euro',
    czechKorunaDescription: 'Czech Koruna',
    start: 'Tap the screen to begin'
  },
  scan: {
    title: 'Scan the QR code to begin',
    instruction: 'Find the scanner next to the screen'
  },
  wallet: {
    title: 'Verify your wallet address',
    secondTitle: 'Wallet address:'
  },
  payment: {
    title: 'Insert your money',
    instruction: 'Find the Cash Acceptor next to the screen',
    inactivity: 'Proceeding to exchange in'
  },
  review: {
    firstTitle: 'Inserted Cash:',
    secondTitle: 'Monero amount:'
  },
  error: {
    cancelled: 'TRANSACTION CANCELED',
    exchange: 'EXCHANGE ERROR',
    invalidID: 'INVALID WALLET ADDRESS'
  },
  success: {
    title: 'TRANSACTION COMPLETED',
    secondTitle: 'Transaction ID:',
    thirdTitle: 'Amount:'
  },
  buttons: {
    cancel: 'Cancel',
    continue: 'Continue',
    seconds: 'sec.',
  },
  nav: {
    proceed: 'Tap the screen to continue',
    cancel: 'Returning to idle screen in'
  }
}
