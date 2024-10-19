import { Locator, Page } from '@playwright/test';

export class CartPage {
  page: Page;
  buttonRemove: Locator;
  buttonCheckout: Locator;
  buttonContinueShopping: Locator;
  cartItem: Locator;
  itemQuantity: Locator;
  itemName: Locator;
  itemPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonRemove = page.getByRole('button', { name: 'Remove', exact: true });
    this.buttonCheckout = page.getByRole('button', { name: 'Checkout', exact: true });
    this.buttonContinueShopping = page.getByRole('button', { name: 'Continue Shopping' });
    this.cartItem = page.getByTestId('inventory-item');
    this.itemQuantity = page.getByTestId('item-quantity');
    this.itemName = page.getByTestId('inventory-item-name');
    this.itemPrice = page.getByTestId('inventory-item-price');
  }
}