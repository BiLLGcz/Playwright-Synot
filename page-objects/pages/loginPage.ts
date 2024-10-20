import { Locator, Page, expect} from '@playwright/test';

export class LoginPage {
  page: Page;
  buttonLogin: Locator;
  buttonCloseError: Locator;
  usernameField: Locator;
  passwordField: Locator;
  validationMessageUsername: Locator;
  validationMessagePassword: Locator;
  validationMessageLockedUser: Locator;
  validationMessageInvalidInputs: Locator;
  validationMessageLoggedIn: Locator;
  
  constructor(page: Page) {
    this.page = page;this.buttonLogin = page.getByRole('button', { name: 'Login', exact: true });
    this.buttonCloseError = page.getByTestId('error-button');
    this.usernameField = page.getByPlaceholder('Username', { exact: true });
    this.passwordField = page.getByPlaceholder('Password', { exact: true });
    this.validationMessageUsername = page.getByText('Epic sadface: Username is required', { exact: true });
    this.validationMessagePassword = page.getByText('Epic sadface: Password is required', { exact: true });
    this.validationMessageInvalidInputs = page.getByText('Epic sadface: Username and password do not match any user in this service', { exact: true });
    this.validationMessageLockedUser = page.getByText('Epic sadface: Sorry, this user has been locked out.', { exact: true });
    this.validationMessageLoggedIn = page.getByText('when you are logged in.');
  }

  async gotoLoginPage() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle('Swag Labs');
  }
}
