import express from 'express';
import puppeteer from 'puppeteer';

const app = express();

const bw = await puppeteer.launch();
console.log('Browser, ', bw);

app.listen(4000, () => {
  console.log('App started');
});
