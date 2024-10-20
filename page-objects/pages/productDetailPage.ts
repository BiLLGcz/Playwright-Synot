import { Locator, Page } from '@playwright/test';

export class ProductDetailPage {
  page: Page;
  itemPrice: Locator;
  itemName: Locator;
  buttonAddToCart: Locator;
  buttonRemove: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.itemPrice = page.getByTestId('inventory-item-price');
    this.itemName = page.getByTestId('inventory-item-name');
    this.buttonAddToCart = page.getByRole('button', { name: 'Add to cart', exact: true });
    this.buttonRemove = page.getByRole('button', { name: 'Remove', exact: true });
  }
}