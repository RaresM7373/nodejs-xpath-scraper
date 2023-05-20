import * as puppeteer from 'puppeteer';

const scrapeWebPage = async (
  url: string,
  paths: [string, string]
): Promise<(string | null)[][]> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const textValues = await new Promise((resolve) => {
    const result: (string | null)[][] = [];
    paths.forEach(async (path, i) => {
      const pathElements = await page.$x(path);

      const values = await Promise.all(
        pathElements.map(async (element) => {
          const textValue = await element.evaluate((node) => node.textContent);
          return textValue;
        })
      );

      result.push(values);

      if (i === paths.length - 1) resolve(result);
    });
  });

  return textValues as string[][];
};

export default {
  scrapeWebPage,
};
