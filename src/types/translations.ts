export type Home = {
  title: string
  euroDescription: string
  czechKorunaDescription: string
}

export type ScanTranslations = {
  title: string
  instruction: string
}

export type WalletTranslations = {
  title: string
}

export type PaymentTranslations = {
  title: string
  instruction: string
}

export type ReviewTranslations = {
  firstTitle: string
  secondTitle: string
  thirdTitle: string
}

export type ErrorTranslations = {
  cancelled: string
  exchange: string
  invalidID: string
}

export type SuccessTranslations = {
  title: string
  secondTitle: string
}

export type ButtonTranslations = {
  cancel: string
  continue: string
  seconds: string
  start: string
}

export type TranslationKeys = {
  home: Home
  scan: ScanTranslations
  wallet: WalletTranslations
  payment: PaymentTranslations
  review: ReviewTranslations
  error: ErrorTranslations
  success: SuccessTranslations
  buttons: ButtonTranslations
}

export type Translations = Record<string, TranslationKeys>
