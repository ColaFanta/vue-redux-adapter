import { expect, test } from '@playwright/test'

test.describe('counter page test', () => {
  test('counter in page expects to increment twice, multipliers should work fine', async ({ page }) => {
    await page.goto('/')

    const btn_increment = page.getByTestId('increment_btn')
    const btn_decrement = page.getByTestId('decrement_btn')
    const display_count = page.getByTestId('display_count')

    await btn_increment.click()
    await btn_increment.click()
    await expect(display_count).toHaveText('2')

    const mult1_btn = page.getByTestId('mult1_btn')
    const mult2_btn = page.getByTestId('mult2_btn')
    const mult3_btn = page.getByTestId('mult3_btn')
    const display_multiplied = page.getByTestId('display_multiplied')

    await mult2_btn.click()
    await expect(display_multiplied).toHaveText('4')
    await mult3_btn.click()
    await expect(display_multiplied).toHaveText('6')
    await mult1_btn.click()
    await expect(display_multiplied).toHaveText('2')

    await btn_decrement.click()
    await btn_decrement.click()
    await expect(display_count).toHaveText('0')
  })
})
