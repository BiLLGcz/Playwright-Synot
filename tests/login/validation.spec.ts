import test, { expect } from '../../fixtures/basePages';

test.describe('Validation tests on the login page', () => {
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
      await loginPage.usernameField.fill(loginPage.standardUser);
      await loginPage.buttonLogin.click();
      await expect(loginPage.validationMessageUsername).toBeHidden();
      await expect(loginPage.validationMessagePassword).toBeVisible();
      await loginPage.buttonCloseError.click();
    });

    await test.step('Clear the username, fill in the password and click to the login button', async() => {
      await loginPage.usernameField.clear();
      await loginPage.passwordField.fill(loginPage.validPassword);
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
      await loginPage.usernameField.fill(`${loginPage.standardUser}`);
      await loginPage.passwordField.fill(`${loginPage.invalidPassword}`);
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
      await loginPage.usernameField.fill(`${loginPage.lockedUser}`);
      await loginPage.passwordField.fill(`${loginPage.validPassword}`);
      await loginPage.buttonLogin.click();
      await expect(loginPage.validationMessageUsername).toBeHidden();
      await expect(loginPage.validationMessagePassword).toBeHidden();
      await expect(loginPage.validationMessageLockedUser).toBeVisible();
    });
  });
});
