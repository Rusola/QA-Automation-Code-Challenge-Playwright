import testData from '../../data/TestData.js';
import { test, expect } from '../../fixtures/fixtures.js';

test.describe('3.L Login: Verify Login functionality', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.open();
    });

    test('3.1. Login: Verify user can not login with invalid credentials @smoke', async ({ loginPage }) => {
        const { email, password } = testData.invalidUser;
        await loginPage.login(email, password, false);

        // Verify user is not logged in and error message is displayed
        await expect(loginPage.heading, 'Incorrect page heading on Login page').toBeVisible();
        await expect(loginPage.alert, `User loged in with valid ${email} and invalid ${password}`).toHaveText(
            "Bad credentials! Please try again! Make sure that you've registered.",
        );
    });

    test('3.2. Login: Verify that password fields mask input', async ({ loginPage }) => {
        const passwordType = await loginPage.password.getAttribute('type');
        expect(passwordType, 'Password field should mask input').toBe('password');
    });

    test('3.3. Login: @usability Verify placeholder text in login fields', async ({ loginPage }) => {
        await expect(loginPage.email, 'Incorrect placeholder text in email field').toHaveAttribute(
            'placeholder',
            'Enter email - insert admin@admin.com',
        );
        await expect(loginPage.password, 'Incorrect placeholder text in password field').toHaveAttribute(
            'placeholder',
            'Enter Password - insert admin123',
        );
    });

    test('3.4. Login: Verify header navigation options', async ({ loginPage }) => {
        // Verify header shows Home, Contact options
        [loginPage.header.homeNavLink, loginPage.header.contactNavLink].forEach(async (navLink) => {
            await expect(navLink, `Expected ${await navLink.textContent()} to be visible on Login page.`).toBeVisible();
        });
        await expect(loginPage.header.closeButton, 'Close button is not visible on Login page').toBeVisible();

        // Verify that Log Out option is not visible on Login page
        await expect(
            loginPage.header.logOutNavLink,
            'Log Out option should not be visible on Login page',
        ).not.toBeVisible();
    });
});
