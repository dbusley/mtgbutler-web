import express from 'express';
import next from 'next';
import regeneratorRuntime from 'regenerator-runtime';
import client from './client';

const dev = process.env.ENV !== 'production';
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();

  app.get('/cards', async (req, res) => {
    const qs = {sort: 'name', ...req.query};
    const data = await client('cards', qs);
    res.send(data);
  });

  app.get('*', (req, res) => {
    return handle(req, res);
  });

  // start the server
  app.listen(process.env.PORT || 3000);
});

