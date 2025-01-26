import { test, expect } from "@playwright/test";
import { GamesPage } from "../pages/GamesPage";
import { GameDetailsPage } from "../pages/GameDetailsPage";
import { HelpPage } from "../pages/HelpPage";
import { CookieBanner } from "../components/CookieBanner";

test.beforeEach(async ({ page }) => {
  await page.goto('/', { waitUntil: "networkidle" });
  const cookie = new CookieBanner(page);
  await cookie.acceptAllIfVisible();
});

test.describe("Lotto24 Games E2E", () => {
  test("Should open and verify ZEAL Instant Games flow", async ({ page }) => {
    const gamesPage = new GamesPage(page);
    const gameDetailsPage = new GameDetailsPage(page);
    const helpPage = new HelpPage(page);

    expect(await gamesPage.isZealInstantGamesVisible()).toBeTruthy();

    await gamesPage.swipeZealInstantGamesSection(2);

    const gameName = await gamesPage.getFirstGameName();
    await gamesPage.clickFirstGameTeaser();

    expect(await gameDetailsPage.isCorrectGameDisplayed(gameName)).toBeTruthy();

    await gameDetailsPage.verifyHelpLinkVisible(gameName);

    await gameDetailsPage.clickHelpLink(gameName);

    await expect(page).toHaveURL(
      new RegExp(
        `/hilfe/games/${gameName
          .replace(/\s+/g, "\\s*")
          .replace(/[-]/g, "\\-")}`,
        "i"
      )
    );

    expect(await helpPage.isCorrectGameSelected(gameName)).toBeTruthy();

    expect(await helpPage.isHelpButtonTextCorrect(gameName)).toBeTruthy();
    expect(await helpPage.clickHelpButtonAndVerifyURL(gameName)).toBeTruthy();
  });
});
