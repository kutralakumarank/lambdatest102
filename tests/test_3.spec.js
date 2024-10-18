const { test } = require('../lambdatest-setup')
const { expect } = require('@playwright/test')

test.describe('Third Scenario test', () => {
  test('Search LambdaTest on Bing', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("https://www.lambdatest.com/selenium-playground/");
    await page.locator('//a[text()="Input Form Submit"]').click();
    await page.locator('//button[text()="Submit"]').click()
    let name = await page.locator('//input[@id="name"]');
    const validationMessage = await name.evaluate((element) => {
      return element.validationMessage
    });
    await expect(validationMessage).toContain('Please fill out this field.')
    await name.fill('Kumaran')
    await page.locator('//input[@id="inputEmail4"]').fill('sample@gmail.com')
    await page.locator('//input[@id="inputPassword4"]').fill('Qwerty');
    await page.locator('//input[@id="company"]').fill('lamdatest');
    await page.locator('//input[@id="websitename"]').fill('www.abc.com')
    await page.locator('//select[@name="country"]').selectOption({ label: 'United States' })
    await page.locator('//input[@id="inputCity"]').fill('china');
    await page.locator('//input[@id="inputAddress1"]').fill('vivekananda street')
    await page.locator('//input[@id="inputAddress2"]').fill('dubai Kuruku santhu')
    await page.locator('//input[@id="inputState"]').fill('dubai')
    await page.locator('//input[@id="inputZip"]').fill('2309986')
    await page.locator('//button[text()="Submit"]').click()
    let message = await page.locator('//p[@class="success-msg hidden"]').textContent();
    try {
      await expect(message).toContain('Thanks for contacting us, we will get back to you shortly.')
      // Mark the test as completed or failed
      await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`)
    } catch {
      await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Title not matched' } })}`)
    }
  })
})
