import bodyParser from 'body-parser';
import { config } from 'dotenv';
import express from 'express';
import { get } from 'lodash';
import { Client } from '@line/bot-sdk';

import { lineClientConfig, dialogflowClientConfig, DEFAULT_PORT } from './config';
import { DialogflowClient } from './dialogflow-client';
import { EventHandler } from './event-handler';

config();

const app = express();
app.use(bodyParser.json());

const lineClient = new Client(lineClientConfig);
const dialogflowClient = new DialogflowClient(dialogflowClientConfig);
const webhookHandler = new EventHandler(lineClient, dialogflowClient);

app.post('/', async (req, res) => {
  const event = get(req, ['body', 'events', '0']);
  await webhookHandler.handleEvent(event);
  res.send('');
});

app.listen(process.env.PORT || DEFAULT_PORT);
