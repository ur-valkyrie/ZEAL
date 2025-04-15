import { Page, Locator } from "@playwright/test";

export class GamesPage {
  readonly page: Page;
  readonly zealInstantGamesSection: Locator;
  readonly firstGameTeaser: Locator;
  readonly quinarySwiper: Locator;

  constructor(page: Page) {
    this.page = page;
    this.zealInstantGamesSection = page.locator(
      '[data-element-id="teaser-firstHeadline"] h1.headline',
      { hasText: "ZEAL Instant Games" }
    );
    this.firstGameTeaser = page.locator('a.link.games >> .f-text-bold-large.headline').first();
    this.quinarySwiper = page.locator(
      "[data-element-id='GAMES_HOMEPAGE_QUINARY'] .swiper-wrapper"
    );
  }

  async isZealInstantGamesVisible(): Promise<boolean> {
    return this.zealInstantGamesSection.isVisible();
  }

  async swipeZealInstantGamesSection(times: number = 2) {
    await this.quinarySwiper.scrollIntoViewIfNeeded();

    const boundingBox = await this.quinarySwiper.boundingBox();
    if (!boundingBox) return;

    const startX = boundingBox.x + boundingBox.width - 10;
    const startY = boundingBox.y + boundingBox.height / 2;
    const endX = boundingBox.x + 10;
    const endY = startY;

    for (let i = 0; i < times; i++) {
      await this.page.mouse.move(startX, startY);
      await this.page.mouse.down();
      await this.page.mouse.move(endX, endY);
      await this.page.mouse.up();
      await this.page.waitForTimeout(500);
    }
  }

  async getFirstGameName(): Promise<string> {
    return (
      (await this.firstGameTeaser.textContent()) ?? ""
    );
  }

  async clickFirstGameTeaser() {
    await this.firstGameTeaser.click();
  }
}
