import express from 'express';

import scrapeService from '../services/scrape.js';
import repoService from '../services/repo.js';

const router = express.Router();

router.post('/github', async (_req, res) => {
  const repos = await scrapeService.scrapeGithub();
  const data = await repoService.batchCreate(repos);
  res.send(data);
});

router.post('/', async (req, res) => {
  const data = req.body;
  const response = await repoService.create(data);
  res.send(response);
});

router.get('/', async (_req, res) => {
  const repos = await repoService.fetch();
  res.send(repos);
});

export default router;
