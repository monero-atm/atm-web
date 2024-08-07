export type HomeTranslations = {
  title: string
  euroDescription: string
  czechKorunaDescription: string
  start: string
}

export type ScanTranslations = {
  title: string
  instruction: string
}

export type WalletTranslations = {
  title: string
  secondTitle: string
}

export type PaymentTranslations = {
  title: string
  instruction: string
  inactivity: string
}

export type ReviewTranslations = {
  firstTitle: string
  secondTitle: string
  instruction: string
}

export type ErrorTranslations = {
  cancelled: string
  exchange: string
  invalidID: string
}

export type SuccessTranslations = {
  title: string
  secondTitle: string
  thirdTitle: string
}

export type ButtonTranslations = {
  cancel: string
  continue: string
  seconds: string
}

export type NavigationTranslations = {
  proceed: string
  cancel: string
}

export type TranslationKeys = {
  home: HomeTranslations
  scan: ScanTranslations
  wallet: WalletTranslations
  payment: PaymentTranslations
  review: ReviewTranslations
  error: ErrorTranslations
  success: SuccessTranslations
  buttons: ButtonTranslations
  nav: NavigationTranslations
}

export type Translations = Record<string, TranslationKeys>
