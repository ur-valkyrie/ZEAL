import { Page, Locator } from '@playwright/test';

export class CookieBanner {
  readonly page: Page;
  readonly acceptAllButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptAllButton = page.locator('[data-element-id="cookieConsentPromptOverlay.acceptAllButton"]');
  }

  async acceptAllIfVisible() {
    if (await this.acceptAllButton.isVisible()) {
      await this.acceptAllButton.click();
      await this.page.waitForTimeout(6000);
    }
  }
}
