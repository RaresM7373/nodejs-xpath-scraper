import * as puppeteer from 'puppeteer';
import { Repo } from '../constants/types';

const scrapeGithub = async (): Promise<Repo[]> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://github.com/RaresM7373');

  const titleElements = await page.$x(
    '//*[@id="user-profile-frame"]/div/div[1]/div/ol/li/div/div/div/a/span'
  );

  const techElements = await page.$x(
    '//*[@id="user-profile-frame"]/div/div[1]/div/ol/li/div/div/p[3]/span/span[2]'
  );

  const textValues = await Promise.all(
    titleElements.map(async (element) => {
      const textValue = await element.evaluate((node) => node.textContent);
      return textValue;
    })
  );

  const techValues = await Promise.all(
    techElements.map(async (element) => {
      const textValue = await element.evaluate((node) => node.textContent);
      return textValue;
    })
  );

  const repos: Repo[] = [];
  for (let i = 0; i < textValues.length; i++) {
    repos.push({ title: textValues[i], technology: techValues[i] });
  }

  return repos;
};

export default {
  scrapeGithub,
};
