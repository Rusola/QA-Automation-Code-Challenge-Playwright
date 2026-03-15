import { test, expect } from '../../fixtures/fixtures.js';

test('5.1. Contact Us: Verify User can see contact info on Contact page', async ({ loginPage, contactUsPage }) => {
    await loginPage.open();

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

    // Click on the Contact us link on header
    await contactUsPage.open();

    // Verify Contact page displays correct heading, contact info and contact link
    await expect(contactUsPage.heading, 'Incorrect page heading on Contact page').toHaveText('Contact us');
    await expect(contactUsPage.textarea, 'Incorrect text in Contact page textarea').toHaveText(`
            Do you have any questions / feedback / improvement ideas? Please do
            not hesitate to contact me HERE. I will reply to you within a
            matter of hours. `);
    await expect(contactUsPage.link, 'Contact link is not visible on Contact page').toBeVisible();
    await expect(contactUsPage.link).toHaveAttribute('href', /.*contact.*/);
    await expect(contactUsPage.link).toHaveAttribute('style', 'color:blue');
});
