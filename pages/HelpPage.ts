import { Page, Locator } from "@playwright/test";

export class HelpPage {
  readonly page: Page;
  readonly helpComboBox: Locator;
  readonly helpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.helpComboBox = page.locator(".games-list");
    this.helpButton = page.locator(
      "div.button-container .play-game-button button"
    );
  }

  async isCorrectGameSelected(gameName: string): Promise<boolean> {
        await this.page.locator('select[data-gtm-id="dropdown"]').waitFor({ state: 'visible', timeout: 10000 });
        const selectedOption = this.page.locator('select[data-gtm-id="dropdown"] option:checked');
        const selectedText = await selectedOption.innerText();
        return selectedText.trim() === gameName.trim();
  }

  async isHelpButtonTextCorrect(gameName: string): Promise<boolean> {
    const expectedText = `${gameName} spielen`;
    const buttonText = await this.helpButton.innerText();

    const normalizedButtonText = buttonText
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
    const normalizedExpectedText = expectedText
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    return normalizedButtonText === normalizedExpectedText;
  }

  async clickHelpButtonAndVerifyURL(gameName: string): Promise<boolean> {
    await this.helpButton.click();
    await this.page.waitForLoadState("domcontentloaded");

    const expectedUrl = `https://games.lotto24.de/games/${gameName.toLowerCase().replace(/ /g, "")}`;

    return this.page.url().includes(expectedUrl);
  }
}
