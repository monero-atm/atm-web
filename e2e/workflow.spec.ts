import { test, expect } from '@playwright/test'

test('language selection', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('title-homepage')).toContainText(/Scan the QR code to begin/i)

  await page.getByTestId('language-selection-menu-button').click()
  await page.getByTestId('language-option-cz').click()
  await expect(page.getByTestId('title-homepage')).toContainText(/Naskenujte QR kód pro zahájení/i)

  await page.getByTestId('language-selection-menu-button').click()
  await page.getByTestId('language-option-lt').click()
  await expect(page.getByTestId('title-homepage')).toContainText(
    /Skenuokite QR kodą, kad pradėtumėte/i
  )
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
  await page.goto('http://localhost:5173/')
  await page.getByTestId('language-selection-menu-button').click()
  await page.getByTestId('language-option-lt').click()
  await expect(page.getByTestId('title-homepage')).toContainText(
    /Skenuokite QR kodą, kad pradėtumėte/i
  )

  await page.getByTestId('generate-test-address-button').click()
  await page.getByTestId('continue-transaction-button-wallet').click()
  await page.getByTestId('continue-transaction-button-payment').click()
  await page.getByTestId('continue-transaction-button-review').click()
  await page.getByTestId('return-home-button').click()
  await expect(page.getByTestId('title-homepage')).toContainText(/Scan the QR code to begin/i)
})
