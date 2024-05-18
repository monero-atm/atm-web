export type HomeTranslations = {
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
}

export type TranslationKeys = {
  home: HomeTranslations
  wallet: WalletTranslations
  payment: PaymentTranslations
  review: ReviewTranslations
  error: ErrorTranslations
  success: SuccessTranslations
  buttons: ButtonTranslations
}

export type Translations = Record<string, TranslationKeys>
