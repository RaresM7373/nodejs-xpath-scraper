import express from 'express';

import scrape from './controllers/scrape.js';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use('/scrape', scrape);

app.listen(PORT, () => {
  console.log(`App started listening on ${PORT}`);
});
