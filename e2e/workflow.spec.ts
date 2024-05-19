import { test, expect } from '@playwright/test'
import {en} from '../src/languages/en.js'
import {cz} from '../src/languages/cz.js'
import {lt} from '../src/languages/lt.js'

test('language selection', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  const english = en['home'].title
  const czech = cz['home'].title
  const lithuanian = lt['home'].title 

  await expect(page.getByTestId('title-homepage')).toHaveText(english)

  await page.getByTestId('language-selection-menu-button').click()
  await page.getByTestId('language-option-cz').click()
  await expect(page.getByTestId('title-homepage')).toHaveText(czech)

  await page.getByTestId('language-selection-menu-button').click()
  await page.getByTestId('language-option-lt').click()
  await expect(page.getByTestId('title-homepage')).toHaveText(lithuanian)
})


test('happy path without expects', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await page.getByTestId('generate-test-address-button').click()

  const address = await page.getByTestId('wallet-address').allInnerTexts()
  await page.getByTestId('continue-transaction-button-wallet').click()

  await page.getByTestId('continue-transaction-button-payment').click()

  await expect(page.getByTestId('wallet-address-review')).toHaveText(address)
  await page.getByTestId('continue-transaction-button-review').click()

  await expect(page.getByTestId('wallet-address-success')).toHaveText(address)
  await page.getByTestId('return-home-button').click()
})

test('reseting to default language after each session', async ({ page }) => {
  const english = en['home'].title
  const lithuanian = lt['home'].title 

  await page.goto('http://localhost:5173/')
  await page.getByTestId('language-selection-menu-button').click()
  await page.getByTestId('language-option-lt').click()
  await expect(page.getByTestId('title-homepage')).toHaveText(lithuanian)

  await page.getByTestId('generate-test-address-button').click()
  await page.getByTestId('continue-transaction-button-wallet').click()
  await page.getByTestId('continue-transaction-button-payment').click()
  await page.getByTestId('continue-transaction-button-review').click()
  await page.getByTestId('return-home-button').click()
  await expect(page.getByTestId('title-homepage')).toHaveText(english)
})