import express from 'express';

import scrapeService from '../services/scrape.js';

const router = express.Router();

router.post('/', async (_req, res) => {
  const repos = await scrapeService.scrapeGithub();
  const data = await scrapeService.batchAddRepos(repos);
  res.send(data);
});

export default router;
