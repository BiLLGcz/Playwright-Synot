import test, { expect } from '../../fixtures/main';

test('Product purchase', { tag: '@smoke' }, async ({ login, page, productsPage, cartPage, navigationBar }) => {
  test.info().annotations.push({
    type: 'Test info',
    description: 'This test checks the workflow of purchasing one product, verification this fact on cart page and then removing of this item from the cart.'
  });

  let itemName: string;
  let itemPrice: string;
  const testedItem = 2;

  await test.step('Login', async() => {
    await login(page);
  });

  await test.step('Add third item in to the cart', async() => {
    itemName = await productsPage.itemName.nth(testedItem).innerText();
    itemPrice = await productsPage.itemPrice.nth(testedItem).innerText();
    await productsPage.buttonAddToCart.nth(testedItem).click();
  });

  await test.step('The number 1 is displayed on the cart icon', async() => {
    await expect(navigationBar.cartItemCount).toHaveText('1');
    await expect(productsPage.buttonRemove).toBeVisible();
  });

  await test.step('Open the cart', async() => {
    await navigationBar.buttonCart.click();
  });

  await test.step('Check if the cart contents are correct', async() => {
    await expect(cartPage.itemQuantity).toHaveText('1');
    await expect(cartPage.buttonCheckout).toBeVisible();
    await expect(cartPage.buttonContinueShopping).toBeVisible();
    await expect(cartPage.buttonRemove).toBeVisible();
    await expect(cartPage.itemName).toHaveText(itemName);
    await expect(cartPage.itemPrice).toHaveText(itemPrice);
  });

  await test.step('Remove item from the cart', async() => {
    await cartPage.buttonRemove.click();
  });

  await test.step('Check if the cart contents are correct', async() => {
    await expect(page.getByText(itemName)).toBeHidden();
    await expect(page.getByText(itemPrice)).toBeHidden();
    await expect(navigationBar.cartItemCount).toBeHidden();
  });
});
