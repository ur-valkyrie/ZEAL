import { Page, Locator, expect } from '@playwright/test';

export class GameDetailsPage {
  readonly page: Page;
  readonly gameTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.gameTitle = page.locator('[data-element-id="pageHeader"]');
  }

  getHelpLink(gameName: string): Locator {
    return this.page.locator('span', { hasText: `Zur ${gameName} Hilfe` });
}

  async verifyHelpLinkVisible(gameName: string): Promise<void> {
    const helpLink = this.getHelpLink(gameName);
    await expect(helpLink).toBeVisible();
}

  async clickHelpLink(gameName: string): Promise<void> {
    const helpLink = this.getHelpLink(gameName);
    await helpLink.click();
  }

  async isCorrectGameDisplayed(expectedGameName: string): Promise<boolean> {
    const titleText = await this.gameTitle.textContent();
    return titleText?.trim() === expectedGameName.trim();
  }
}