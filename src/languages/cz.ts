import type { TranslationKeys } from '../types/translations'

export const cz: TranslationKeys = {
  home: {
    title: 'Naskenujte QR kód pro zahájení',
    instruction: 'Nalezněte skener vedle obrazovky'
  },
  wallet: {
    title: 'ID peněženky:'
  },
  payment: {
    title: 'Vložte své peníze',
    instruction: 'Nalezněte akceptor hotovosti vedle obrazovky'
  },
  review: {
    firstTitle: 'Vložená hotovost:',
    secondTitle: 'Množství Monera:',
    thirdTitle: 'Cílová adresa:'
  },
  error: {
    cancelled: 'TRANSAKCE ZRUŠENA',
    exchange: 'CHYBA VÝMĚNY',
    invalidID: 'NEPLATNÉ ID PENĚŽENKY'
  },
  success: {
    title: 'TRANSAKCE DOKONČENA',
    secondTitle: 'BYLO ODESLÁNO NA:'
  },
  buttons: {
    cancel: 'Zrušit',
    continue: 'Pokračovat',
    seconds: 'sek.'
  }
}
