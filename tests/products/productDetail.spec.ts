import test, { expect } from '../../fixtures/main';
import { users } from '../../fixtures/userData';

const userList = [users.standardUser, users.problemUser];
let itemName: string;
let itemPrice: string;

userList.forEach((user) => {
  test(`Open the product detail as ${user} and check if content are correct`, { tag: '@smoke' }, async ({ login, logout, page, productsPage, productDetailPage }) => {
    test.info().annotations.push({
      type: 'Test info',
      description: `This test opens the product detail as ${user} and checks that it is displayed correctly.`
    });    

    await test.step('Login', async() => {
      await login(page, `${user}`);
    });

    await test.step('Open first item', async() => {
      itemName = await productsPage.itemName.first().innerText();
      itemPrice = await productsPage.itemPrice.first().innerText();
      await productsPage.itemName.first().click();
    });

    await test.step('Check if the product details are correct', async() => {
      await expect(productDetailPage.itemName).toHaveText(itemName);
      await expect(productDetailPage.itemPrice).toHaveText(itemPrice);
    });
  });
});
