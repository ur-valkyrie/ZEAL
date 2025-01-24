# Lotto24 E2E Tests with Playwright

This repository contains end-to-end tests for the Lotto24 games area.

## Prerequisites
- Node.js >= 14
- npm or yarn
- Browsers installed by Playwright (Chromium, Firefox, WebKit)

## Installation
npm install npx playwright install

## Running the tests
npx playwright test

- By default, tests are run in a mobile viewport (iPhone 12 and Pixel 5).  
- To run in headed mode or another browser, modify `playwright.config.ts` or use CLI flags. 
