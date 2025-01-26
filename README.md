# Lotto24 E2E Tests with Playwright

This repository contains end-to-end tests for the Lotto24 games area using **Playwright** and **TypeScript**.

## Prerequisites
- **Node.js** >= 14
- **npm** or **yarn**

## Installation
npm install
npx playwright install

## Running the tests
npx playwright test

- By default, tests are run in a mobile viewport using iPhone 14 and Pixel 5 (see playwright.config.ts).  
- To run in headed mode or another browser, modify `playwright.config.ts` or use CLI flags, for example:
npx playwright test --headed --project=chromium

## Project Structure
- `pages/` - Page Object classes (e.g., GamesPage, GameDetailsPage, HelpPage)
- `tests/` - Test files (e.g., lotto-games.spec.ts)
- `components/` - Reusable UI components (if any). For example, a common cookie banner, modals, or repeated blocks used across pages.
- `playwright.config.ts` - Playwright configuration (e.g., browsers, reporters)
- `tsconfig.json` - TypeScript configuration
- `README.md` - Project documentation

## Notes
- The tests verify a user can open the Lotto24 games area, swipe through the "ZEAL Instant Games", open the first game, then open the help page, and confirm correct linking.
- For advanced scenarios or stable swipes, you may need to interact directly with the carousel library (e.g., buttons, pagination bullets, or API calls).
- Common practice is to prefer Playwright’s built-in locators and assertions. We avoid custom wait conditions unless strictly necessary.
- We currently keep the selectors inside each Page Object for clarity and simplicity. If the project grows or you have many repeated selectors, consider placing them in a dedicated folder (e.g., selectors/) or in components/ for shared UI blocks.

## Tests Overview
Our main test file is lotto-games.spec.ts, which verifies the following scenario:
1. Open the Lotto24 games area (mobile viewport).
2. Dismiss any cookie banner if visible.
3. Verify the "ZEAL Instant Games" section is present.
4. Swipe within the "ZEAL Instant Games" carousel two times to the right.
5. Open the first game.
6. Confirm the correct game page is loaded.
7. Check the help link "Zur [game name] Hilfe" exists.
8. Click the help link and verify the help page is opened.
9. Ensure the correct game is selected in the combo box on the help page.
10. Check the help page’s "play" button text is correct and navigates to the correct URL.

Author: Vitaliia Palamarchuk
