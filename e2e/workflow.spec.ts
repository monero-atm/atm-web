import { test, expect } from '@playwright/test'
import { en } from '../src/languages/en.js'
import { cz } from '../src/languages/cz.js'
import { lt } from '../src/languages/lt.js'

test('language selection', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await page.getByTestId('start-transaction-button').click()
  const english = en['scan'].title
  const czech = cz['scan'].title
  const lithuanian = lt['scan'].title

  await expect(page.getByTestId('title-scanpage')).toHaveText(english)

  await page.getByTestId('language-selection-menu-button').click()
  await page.getByTestId('language-option-cz').click()
  await expect(page.getByTestId('title-scanpage')).toHaveText(czech)

  await page.getByTestId('language-selection-menu-button').click()
  await page.getByTestId('language-option-lt').click()
  await expect(page.getByTestId('title-scanpage')).toHaveText(lithuanian)
})

//eslint-disable-next-line
test('happy path without expects', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await page.getByTestId('start-transaction-button').click()
  await page.getByTestId('generate-test-address-button').click()
  await page.getByTestId('continue-transaction-button-wallet').click()

  await page.getByTestId('continue-transaction-button-payment').click()

  await page.getByTestId('continue-transaction-button-review').click()

  await page.getByTestId('return-home-button').click()
})

test('reseting to default language after each session', async ({ page }) => {
  const english = en['scan'].title
  const lithuanian = lt['scan'].title

  await page.goto('http://localhost:5173/')
  await page.getByTestId('start-transaction-button').click()
  await page.getByTestId('language-selection-menu-button').click()
  await page.getByTestId('language-option-lt').click()
  await expect(page.getByTestId('title-scanpage')).toHaveText(lithuanian)

  await page.getByTestId('generate-test-address-button').click()
  await page.getByTestId('continue-transaction-button-wallet').click()
  await page.getByTestId('continue-transaction-button-payment').click()
  await page.getByTestId('continue-transaction-button-review').click()
  await page.getByTestId('return-home-button').click()
  await page.getByTestId('start-transaction-button').click()
  await expect(page.getByTestId('title-scanpage')).toHaveText(english)
})
