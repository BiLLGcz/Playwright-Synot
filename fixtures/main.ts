import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../page-objects/pages/loginPage';
import { login, logout } from './basic';
import { NavigationBar } from '../page-objects/sections/navigationBar';
import { ProductsPage } from '../page-objects/pages/productsPage';
import { CartPage } from '../page-objects/pages/cartPage';
import { ProductDetailPage } from '../page-objects/pages/productDetailPage';


const test = baseTest.extend<{
  loginPage: LoginPage;
  login: typeof login;
  logout: typeof logout;
  navigationBar: NavigationBar;
  productsPage: ProductsPage;
  cartPage: CartPage;
  productDetailPage: ProductDetailPage;
  

}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));  
  },

  login: async ({ page }, use) => {
    await use(login);
  },

  logout: async ({ page }, use) => {
    await use(logout);
  },

  navigationBar: async ({ page }, use) => {
    await use(new NavigationBar(page));  
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));  
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));  
  },

  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));  
  }

});

export default test;
export const { expect } = test;