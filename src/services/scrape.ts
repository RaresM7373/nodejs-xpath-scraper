import * as puppeteer from 'puppeteer';
import path from 'path';
import { readFileSync, writeFile } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Reads mocked database from the db.json file
 * @returns parsed json data
 */
const readData = () => {
  const rawData = readFileSync(
    path.join(__dirname + '/../database/db.json'),
    'utf8'
  );

  const data = JSON.parse(rawData);
  return data;
};

const writeData = (data: any) => {
  return new Promise((resolve, reject) => {
    writeFile(
      path.join(__dirname + '/../database/db.json'),
      JSON.stringify(data),
      (err) => {
        if (!err) resolve(data);
        reject(err);
      }
    );
  });
};

const scrapeGithub = async (): Promise<(string | null)[]> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://github.com/RaresM7373');

  let elements = await page.$x(
    '//*[@id="user-profile-frame"]/div/div[1]/div/ol/li/div/div/div/a/span'
  );

  return Promise.all(
    elements.map(async (element) => {
      const textValue = await element.evaluate((node) => node.textContent);
      return textValue;
    })
  );
};

const batchAddRepos = async (repos: (string | null)[]) => {
  const data = readData();

  repos.forEach((repo) => {
    if (repo && !data.repos.includes(repo)) data.repos.push(repo);
  });

  const res = await writeData(data);
  return res;
};

export default {
  scrapeGithub,
  batchAddRepos,
};
