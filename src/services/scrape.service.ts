import * as puppeteer from 'puppeteer';

const scrapeWebPage = async (
  url: string,
  paths: [string, string]
): Promise<[(string | null)[], (string | null)[]]> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const primaryElements = await page.$x(paths[0]);
  const secondaryElements = await page.$x(paths[1]);

  const primaryValues = await Promise.all(
    primaryElements.map(async (element) => {
      const textValue = await element.evaluate((node) => node.textContent);
      return textValue;
    })
  );

  const secondaryValues = await Promise.all(
    secondaryElements.map(async (element) => {
      const textValue = await element.evaluate((node) => node.textContent);
      return textValue;
    })
  );

  return [primaryValues, secondaryValues];
};

export default {
  scrapeWebPage,
};
