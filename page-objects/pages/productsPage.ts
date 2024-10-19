import { Locator, Page } from '@playwright/test';

export class ProductsPage {
  page: Page;
  itemList: Locator;
  item: Locator;
  itemPrice: Locator;
  itemName: Locator;
  buttonAddToCart: Locator;
  buttonRemove: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.itemList = page.getByTestId('inventory-list');
    this.item = page.getByTestId('inventory-item');
    this.itemPrice = page.getByTestId('inventory-item-price');
    this.itemName = page.getByTestId('inventory-item-name');
    this.buttonAddToCart = page.getByRole('button', { name: 'Add to cart', exact: true });
    this.buttonRemove = page.getByRole('button', { name: 'Remove', exact: true });
  }
}