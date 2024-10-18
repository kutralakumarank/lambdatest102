const { test } = require('../lambdatest-setup')
const { expect } = require('@playwright/test')

test.describe('first Scenario test', () => {
  test('Search LambdaTest on Bing', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("https://www.lambdatest.com/selenium-playground/");
    await page.locator('//a[text()="Simple Form Demo"]').click();
    let urlContains = await page.url();
    await expect(urlContains).toContain('simple-form-demo')
    await page.locator('//input[@id="user-message"]').fill('Welcome to LambdaTest')
    await page.locator('//button[@id="showInput"]').click();
    await page.waitForTimeout(2000);
    let text = await page.locator('//p[@id="message"]').textContent()
    try {
      await expect(text).toContain('Welcome to LambdaTest')
      // Mark the test as completed or failed
      await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
    } catch {
      await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`)
    }
  })
})
