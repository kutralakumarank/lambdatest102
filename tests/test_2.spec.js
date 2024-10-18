const { test } = require('../lambdatest-setup')
const { expect } = require('@playwright/test')

test.describe('Second Scenario test', () => {
  test('Search LambdaTest on Bing', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("https://www.lambdatest.com/selenium-playground/");
    await page.locator('//a[text()="Drag & Drop Sliders"]').click();
    await page.waitForTimeout(4000)
    await page.locator('//h4[text()=" Default value 15"]/parent::div//input[@class="sp__range"]').hover();
    await page.mouse.down()
    await page.mouse.move(555, 0);
    let percentage = await page.locator('//h4[text()=" Default value 15"]/parent::div//output').textContent();
    try {
      await expect(percentage).toContain('95')
      // Mark the test as completed or failed
      await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
    } catch {
      await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`)
    }
  })
})
