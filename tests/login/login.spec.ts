import test, { expect } from '../../fixtures/main';
import { users, passwords } from '../../fixtures/userData';

const userList = [users.standardUser, users.problemUser, users.performanceUser, users.errorUser, users.visualUser];

userList.forEach((user) => {
  test(`Login to the application as ${user} and then logout`, { tag: ['@login', '@smoke'] }, async ({ login, logout, page, productsPage, navigationBar }) => {
    test.info().annotations.push({
      type: 'Test info',
      description: `This test checks the successful login as ${user}.`
    });

    await test.step('Login', async() => {
      await login(page, `${user}`, `${passwords.validPassword}`);
    });

    await test.step('Check the login', async() => {
      await expect(navigationBar.buttonCart).toBeVisible();
      await expect(navigationBar.buttonMenu).toBeVisible();
      await expect(productsPage.item).toHaveCount(6);
    });

    await test.step('Logout', async() => {
      await logout(page);
    });
  });
});
