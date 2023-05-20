import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import scrape from './controllers/scrape.controller.js';
import repoController from './controllers/repo.controller.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

app.use('/scrape', scrape);
app.use('/repo', repoController);

app.listen(PORT, () => {
  console.log(`App started listening on ${PORT}`);
});
