import test, { expect } from '../../fixtures/main';
import { passwords, users } from '../../fixtures/userData';

test.describe('Validation tests on the login page', { tag: ['@validations', '@smoke'] }, () => {
  test.beforeEach('Open the application', async ({ loginPage }) => {
    await loginPage.gotoLoginPage();
  });

  test('Validations — empty fields', async ({ loginPage }) => {
    test.info().annotations.push({
      type: 'Test info',
      description: 'This test checks the validation messages on the login page if any field is empty.'
    });

    await test.step('Click to the login button and check the validation messages', async() => {
      await loginPage.buttonLogin.click();
      await expect(loginPage.validationMessageUsername).toBeVisible();
      await expect(loginPage.validationMessagePassword).toBeHidden();
      await loginPage.buttonCloseError.click();
    });

    await test.step('Fill in the username and click to the login button', async() => {
      await loginPage.usernameField.fill(users.standardUser);
      await loginPage.buttonLogin.click();
      await expect(loginPage.validationMessageUsername).toBeHidden();
      await expect(loginPage.validationMessagePassword).toBeVisible();
      await loginPage.buttonCloseError.click();
    });

    await test.step('Clear the username, fill in the password and click to the login button', async() => {
      await loginPage.usernameField.clear();
      await loginPage.passwordField.fill(passwords.validPassword);
      await loginPage.buttonLogin.click();
      await expect(loginPage.validationMessageUsername).toBeVisible();
      await expect(loginPage.validationMessagePassword).toBeHidden();
    });
  });

  test('Validations — invalid password', async ({ loginPage }) => {
    test.info().annotations.push({
      type: 'Test info',
      description: 'This test checks the validation messages on the login page if a invalid password is used.'
    });

    await test.step('Fill in the username and invalid password and click to the login button', async() => {
      await loginPage.usernameField.fill(`${users.standardUser}`);
      await loginPage.passwordField.fill(`${passwords.invalidPassword}`);
      await loginPage.buttonLogin.click();
      await expect(loginPage.validationMessageUsername).toBeHidden();
      await expect(loginPage.validationMessagePassword).toBeHidden();
      await expect(loginPage.validationMessageInvalidInputs).toBeVisible();
    });
  });

  test('Validations — locked user', async ({ loginPage }) => {
    test.info().annotations.push({
      type: 'Test info',
      description: 'This test checks the validation messages on the login page if a invalid password is used.'
    });

    await test.step('Fill in the username for locked user and password and click to the login button', async() => {
      await loginPage.usernameField.fill(`${users.lockedUser}`);
      await loginPage.passwordField.fill(`${passwords.validPassword}`);
      await loginPage.buttonLogin.click();
      await expect(loginPage.validationMessageUsername).toBeHidden();
      await expect(loginPage.validationMessagePassword).toBeHidden();
      await expect(loginPage.validationMessageLockedUser).toBeVisible();
    });
  });
});

test.describe('Validation for pages without login', { tag: ['@validations', '@smoke'] }, () => {
  test.beforeEach('Open the application', async ({ loginPage }) => {
    await loginPage.gotoLoginPage();
  });

  test('Validations — products page', async ({ page, loginPage, productsPage, navigationBar }) => {
    test.info().annotations.push({
      type: 'Test info',
      description: 'This test verifies validation if the user tries to access the product page directly without logging in.'
    });

    await test.step('Go to the products page', async() => {
      await page.goto('/inventory.html');
    });

    await test.step('Check that the correct page is displayed', async() => {
      await expect(productsPage.itemList).toBeHidden();
      await expect(navigationBar.buttonCart).toBeHidden();
      await expect(loginPage.buttonLogin).toBeVisible();
      await expect(loginPage.validationMessageLoggedIn).toBeVisible();
    });
  });

  test('Validations — cart page', async ({ page, loginPage, productsPage, navigationBar }) => {
    test.info().annotations.push({
      type: 'Test info',
      description: 'This test verifies validation if the user tries to access the cart page directly without logging in.'
    });

    await test.step('Go to the products page', async() => {
      await page.goto('/cart.html');
    });

    await test.step('Check that the correct page is displayed', async() => {
      await expect(productsPage.itemList).toBeHidden();
      await expect(navigationBar.buttonCart).toBeHidden();
      await expect(loginPage.buttonLogin).toBeVisible();
      await expect(loginPage.validationMessageLoggedIn).toBeVisible();
    });
  });

  test('Validations — item detail page', async ({ page, loginPage, productsPage, navigationBar }) => {
    test.info().annotations.push({
      type: 'Test info',
      description: 'This test verifies validation if the user tries to access the item detail page directly without logging in.'
    });

    await test.step('Go to the products page', async() => {
      await page.goto('/inventory-item.html');
    });

    await test.step('Check that the correct page is displayed', async() => {
      await expect(productsPage.itemList).toBeHidden();
      await expect(navigationBar.buttonCart).toBeHidden();
      await expect(loginPage.buttonLogin).toBeVisible();
      await expect(loginPage.validationMessageLoggedIn).toBeVisible();
    });
  });
});
