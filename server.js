import express from 'express';
import next from 'next';
import {get, post, put} from './client';
import bodyParser from 'body-parser';

const app = express();

const dev = process.env.ENV !== 'production';
const nextApp = next({dev});
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  app.use(bodyParser.json());

  app.get('/cards', async (req, res) => {
    const qs = {sort: 'name', ...req.query};
    const data = await get('cards', qs);
    res.send(data);
  });

  app.post('/login', async (req, res) => {
    const json = req.body;
    const query = await get('users', {extId: json.profileObj.googleId});
    let data;
    if (query._embedded.users.length < 1) {
      data = await post('users', {
        extId: json.profileObj.googleId,
        password: json.tokenObj.access_token,
      });
    } else {
      data = await put(query._embedded.users[0]._links.self.href, {
        ...json,
        password: json.tokenObj.access_token,
        extId: json.profileObj.googleId,
      });
    }
    res.send(data);
  });

  app.get('*', (req, res) => {
    return handle(req, res);
  });

  // start the server
  app.listen(process.env.PORT || 3000);
});

