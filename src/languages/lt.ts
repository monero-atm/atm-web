import type { TranslationKeys } from '../types/translations'

export const lt: TranslationKeys = {
  home: {
    title: 'Skenuokite QR kodą, kad pradėtumėte',
    instruction: 'Raskite skaitytuvą šalia ekrano'
  },
  wallet: {
    title: 'Piniginės ID:'
  },
  payment: {
    title: 'Įdėkite savo pinigus',
    instruction: 'Raskite grynųjų pinigų priėmėją šalia ekrano'
  },
  review: {
    firstTitle: 'Įdėta grynųjų pinigų:',
    secondTitle: 'Monero suma:',
    thirdTitle: 'Paskirties adresas:'
  },
  error: {
    cancelled: 'TRANSAKCIJA ATŠAUKTA',
    exchange: 'VALIUTOS KEITIMO KLAIDA',
    invalidID: 'NETEISINGAS PINIGINĖS ID'
  },
  success: {
    title: 'TRANSAKCIJA ĮVYKDYTA',
    secondTitle: 'IŠSIŲSTA Į:'
  },
  buttons: {
    cancel: 'Atšaukti',
    continue: 'Tęsti',
    seconds: 'sek.'
  }
}
