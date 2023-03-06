import { expect, test } from '@playwright/test'

test.describe('counter page test', () => {
  test('counter in page expects to increment twice', async ({ page }) => {
    await page.goto('/')

    const btn_increment = page.getByTestId('increment_btn')
    const btn_decrement = page.getByTestId('decrement_btn')
    const display_count = page.getByTestId('display_count')

    await btn_increment.click()
    await btn_increment.click()

    await expect(display_count).toHaveText('2')

    await btn_decrement.click()
    await btn_decrement.click()

    await expect(display_count).toHaveText('0')
  })
})
