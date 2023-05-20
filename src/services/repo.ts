import path from 'path';
import { readFileSync, writeFile } from 'fs';
import { fileURLToPath } from 'url';

import { Repo } from '../constants/types';

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

const batchCreate = async (repos: Repo[]) => {
  const data = readData();

  repos.forEach((repo) => {
    if (repo && !data.repos.map((r: Repo) => r.title).includes(repo.title))
      data.repos.push(repo);
  });

  const res = await writeData(data);
  return res;
};

const fetch = () => {
  return readData();
};

const create = (repo: Repo) => {
  const data = readData();
  data.repos.push(repo);
  return writeData(data);
};

export default {
  batchCreate,
  create,
  fetch,
};
