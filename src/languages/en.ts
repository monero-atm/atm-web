import type { TranslationKeys } from '../types/translations'

export const en: TranslationKeys = {
  home: {
    title: 'Scan the QR code to begin',
    instruction: 'Find the scanner next to the screen'
  },
  wallet: {
    title: 'Wallet ID:'
  },
  payment: {
    title: 'Insert your money',
    instruction: 'Find the Cash Acceptor next to the screen'
  },
  review: {
    firstTitle: 'Inserted Cash:',
    secondTitle: 'Monero amount:',
    thirdTitle: 'Destination address:'
  },
  error: {
    cancelled: 'TRANSACTION CANCELED',
    exchange: 'EXCHANGE ERROR',
    invalidID: 'INVALID WALLET ID'
  },
  success: {
    title: 'TRANSACTION COMPLETED',
    secondTitle: 'Has SENT TO:'
  },
  buttons: {
    cancel: 'Cancel',
    continue: 'Continue',
    seconds: 'sec.'
  }
}
