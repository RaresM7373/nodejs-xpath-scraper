import express from 'express';

import scrapeService from '../services/scrape.service.js';
import repoService from '../services/repo.service.js';
import { Repo } from '../constants/types.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { url, paths } = req.body;
  const [titles, technologies, updates] = await scrapeService.scrapeWebPage(
    url,
    paths
  );

  const repos: Repo[] = [];
  for (let i = 0; i < titles.length; i++) {
    repos.push({
      title: titles[i]!.trim(),
      technology: technologies[i],
      lastUpdated: updates[i],
    });
  }

  const data = await repoService.batchCreate(repos);
  res.send(data);
});

export default router;
