import path from 'path';
import { readFileSync, writeFile } from 'fs';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

import { Repo } from '../constants/types.js';
import { arrayToRdf } from '../utils/rdf.js';

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

/**
 * Batch adding repository opbjects inside the json after scraping is done.
 * @param repos
 * @returns
 */
const batchCreate = async (repos: Repo[]) => {
  const data = readData();

  repos.forEach((repo) => {
    if (repo && !data.repos.map((r: Repo) => r.title).includes(repo.title))
      data.repos.push(repo);
  });

  const res = await writeData(data);
  return res;
};

/**
 * Feches all repositories from db.json.
 * @returns repos;
 */
const fetchRepos = () => {
  return readData();
};

/**
 * Creates a new repository objects and attaches it
 * onto the repos array inside db.json.
 * @param repo
 * @returns
 */
const create = (repo: Repo) => {
  const data = readData();
  data.repos.push(repo);
  return writeData(data);
};

/**
 * Delets a repository objects by name.
 * @param name
 * @returns
 */
const deleteByName = (name: string) => {
  const data = readData();
  const index = data.repos.findIndex(
    (repo: Repo) =>
      repo.title!.trim().toLowerCase() === name.trim().toLowerCase()
  );

  data.repos.splice(index, 1);
  return writeData(data);
};

const toRdf = async (array: any[]) => {
  const url = `http://localhost:8080/rdf4j-server/repositories/grafexamen`;
  const data = arrayToRdf(array);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/turtle',
    },
    body: data,
  });

  return response;
};

const fetchFromRdf = async () => {
  const url = `http://localhost:8080/rdf4j-server/repositories/grafexamen/sparql`;
  const query = `
  PREFIX ex: <https://github.com/resource/>
  SELECT ?title ?technology ?lastUpdated
  WHERE {
    ?s ex:title ?title ;
       ex:technology ?technology ;
      ex:lastUpdated ?lastUpdated .
    }
  `;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/sparql-query',
      Accept: 'application/sparql-results+json',
    },
    body: query,
  });

  console.log('Response ', response);

  if (response.ok) {
    const data = await response.json();
    console.log('Query result:', data);
    return data;
  }

  console.error(
    'Failed to execute query:',
    response.status,
    response.statusText
  );

  return response.statusText;
};

export default {
  batchCreate,
  create,
  fetchRepos,
  deleteByName,
  toRdf,
  fetchFromRdf,
};
