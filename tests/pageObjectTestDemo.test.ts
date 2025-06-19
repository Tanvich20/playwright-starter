import test, { expect } from "playwright/test";
import * as data from "../data/testData.json"
import { loginWithoutPassword } from "../utils/helper"; // Adjust the path as needed
// Importing test data from JSON file
const username = data.validUser.username;
const password = data.validUser.password;

test.describe("Page object test demo", async () => {
    test("@register Register test_01", async ({ page, baseURL }, testInfo) => {
        console.log('TITLE: ' + testInfo.title);

        await page.goto(`${baseURL}/practice/register.php`);
        try {
            await page.locator("#firstname").fill('Tanvi');
            await page.locator("input[name='lastname']").fill('Chaudhary');
            await page.locator("#username").fill(username);
            await page.locator("input[name='password']").fill(password);
            await page.waitForTimeout(2000);
            await Promise.all([
                page.waitForURL('**/practice/register.php#', { waitUntil: "networkidle" }),
                page.click("input[value='Register']")
            ])
        } catch (error) {
            console.error('Error during registration:', error);
            // Optionally take a screenshot for debugging
            await page.screenshot({ path: 'login-error.png' });
            // Attach screenshot to test report (Playwright HTML report)
            await testInfo.attach('Failure Screenshot', {
                path: 'login-error.png',
                contentType: 'image/png',
            });
            throw error; // rethrow to mark test as failed, or suppress if you want to continue
        }

        console.log('STATUS: ' + testInfo.status);
    })

    test("Login test_02 @login", async ({ page, baseURL }, testInfo) => {

        console.log('TITLE: ' + testInfo.title);

        await page.goto(`${baseURL}/practice/login.php`);
        await page.locator("input[name='email']").fill(username);
        await page.locator("input[name='password']").fill(password);
        await Promise.all([
            page.waitForURL('**/practice/login.php#', { waitUntil: "networkidle" }),
            page.click("input[value='Login']")
        ])

        console.log('STATUS: ' + testInfo.status);
    })

    test("Practice Form test_03", async ({ page, baseURL }, testInfo) => {
        console.log('TITLE: ' + testInfo.title);

        await page.goto(`${baseURL}/practice/selenium_automation_practice.php`);
        await page.locator("input[name='name']").fill('Tanvi');
        await page.locator("input[name='email']").fill(username);
        await page.locator("label", { hasText: "Female" }).click(); //Use getByText("Female") only if the text is unique and not repeated elsewhere.
        await page.locator("input[name='mobile']").fill('1234567890');
        await page.locator('#dob').type('01/01/1991');
        await page.locator("input[name='subjects']").fill('MATHS, SCIENCE');
        await page.locator('label:has-text("Reading")').click();
        await page.setInputFiles('#picture', 'C:/Users/L200960/Downloads/example.txt'); // Adjust the path to your file
        await page.locator("textarea[name='picture']").fill('123 Main St, City, Country');
        await page.selectOption('#state', 'Uttar Pradesh');
        await page.selectOption('#city', 'Agra');
        await page.click("input[value='Login']");

        console.log('STATUS: ' + testInfo.status);
    })

    test("Login without password test_04", async ({ page, baseURL }, testInfo) => {

        console.log('TITLE: ' + testInfo.title);
        //You have a method that sometimes throws an error (like submitting a form without required fields). You want to test that the error is thrown, not avoid it.
        await page.goto(`${baseURL}/practice/login.php`);
        await expect(async () => {
            await loginWithoutPassword(page);
        }).rejects.toThrow('password field validation error not shown');
        //This test will pass only if the expected error is thrown, which is perfect for negative testing or known edge cases.
        console.log('STATUS: ' + testInfo.status);
    })
})