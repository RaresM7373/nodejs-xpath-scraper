import express from 'express';

import repoService from '../services/repo.service.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;
  const response = await repoService.create(data);
  res.send(response);
});

router.post('/toRdf', async (req, res) => {
  const { repos } = req.body;
  const result = await repoService.toRdf(repos);
  res.send(result);
});

router.get('/', async (_req, res) => {
  const repos = await repoService.fetchRepos();
  res.send(repos);
});

router.get('/rdf', async (req, res) => {
  const result = await repoService.fetchFromRdf();
  res.send(result);
});

router.delete('/:name', async (req, res) => {
  const { name } = req.params;
  const result = await repoService.deleteByName(name);
  res.send(result);
});

export default router;
