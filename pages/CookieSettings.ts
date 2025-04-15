import { Page } from '@playwright/test';

export class CookieSettings {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
   
  }
}