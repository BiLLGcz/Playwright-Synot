import { test as baseTest } from '@playwright/test';

import { LoginPage } from '../page-objects/loginPage';


const test = baseTest.extend<{
  loginPage: LoginPage;
  

}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));  
  }

});

export default test;
export const { expect } = test;