import { Locator, Page, expect } from '@playwright/test';

export class NavigationBar {
  page: Page;
  buttonMenu: Locator;
  buttonLogout: Locator;
  buttonCart: Locator;
  cartItemCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.buttonMenu = page.getByRole('button', { name: 'Open Menu' });
    this.buttonLogout = page.getByTestId('logout-sidebar-link');
    this.buttonCart = page.getByTestId('shopping-cart-link');
    this.cartItemCount = page.getByTestId('shopping-cart-badge');
  }
}
