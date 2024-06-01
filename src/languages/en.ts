import type { TranslationKeys } from '../types/translations'

export const en: TranslationKeys = {
  home: {
    title: 'ACCEPTED CURRENCIES',
    euroDescription: 'Euro',
    czechKorunaDescription: 'Czech Koruna',
    start: 'Touch the screen or scan wallet QR to begin'
  },
  scan: {
    title: 'Scan the QR code to begin',
    instruction: 'Find the scanner next to the screen'
  },
  wallet: {
    title: 'Verify your wallet address',
    secondTitle: 'Wallet ID:'
  },
  payment: {
    title: 'Insert your money',
    instruction: 'Find the Cash Acceptor next to the screen'
  },
  review: {
    firstTitle: 'Inserted Cash:',
    secondTitle: 'Monero amount:'
  },
  error: {
    cancelled: 'TRANSACTION CANCELED',
    exchange: 'EXCHANGE ERROR',
    invalidID: 'INVALID WALLET ID'
  },
  success: {
    title: 'TRANSACTION COMPLETED',
    secondTitle: 'Transaction ID:',
    thirdTitle: 'Block:'
  },
  buttons: {
    cancel: 'Cancel',
    continue: 'Continue',
    seconds: 'sec.',
  },
  nav: {
    proceed: 'Touch the screen to continue',
    cancel: 'Returning to idle screen in'
  }
}
