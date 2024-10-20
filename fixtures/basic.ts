import { Page, expect} from '@playwright/test';
import { LoginPage } from '../page-objects/pages/loginPage';
import { ProductsPage } from '../page-objects/pages/productsPage';
import { NavigationBar } from '../page-objects/sections/navigationBar';
import { users, passwords } from './userData';

export async function login(page: Page, username: string = users.standardUser, password: string = passwords.validPassword) {
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
  await loginPage.usernameField.fill(username);
  await loginPage.passwordField.fill(password);
  await loginPage.buttonLogin.click();
  const productsPage = new ProductsPage(page);
  await expect(productsPage.itemList).toBeVisible();
}
  
export async function logout(page: Page) {
  const navigationBar = new NavigationBar(page);
  await navigationBar.buttonMenu.click();
  await navigationBar.buttonLogout.click();
  await expect(page.getByTestId('login-container')).toBeVisible();
}