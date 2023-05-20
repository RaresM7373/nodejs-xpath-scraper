import express from 'express';

import repoService from '../services/repo.service.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;
  const response = await repoService.create(data);
  res.send(response);
});

router.get('/', async (_req, res) => {
  const repos = await repoService.fetch();
  res.send(repos);
});

router.delete('/:name', async (req, res) => {
  const { name } = req.params;
  const result = await repoService.deleteByName(name);
  res.send(result);
});

export default router;
