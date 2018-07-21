import bodyParser from 'body-parser';
import {config} from 'dotenv';
import express from 'express';
import {get} from 'lodash';
import {Client} from '@line/bot-sdk';

import {lineClientConfig, dialogflowClientConfig, DEFAULT_PORT} from './config';
import {DialogflowClient} from './dialogflow-client';
import {EventHandler} from './event-handler';
import * as firebase from 'firebase';

config();

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD3cA5zIBCHQQ0jwvqYzwHku1GefaVIXfc",
  authDomain: "ega-hr-b5c2c.firebaseapp.com",
  databaseURL: "https://ega-hr-b5c2c.firebaseio.com",
  projectId: "ega-hr-b5c2c",
  storageBucket: "ega-hr-b5c2c.appspot.com",
  messagingSenderId: "807190162588"
};
firebase.initializeApp(firebaseConfig);

const app = express();
app.use(bodyParser.json());

const lineClient = new Client(lineClientConfig);
console.log(lineClientConfig);
console.log(dialogflowClientConfig);
const dialogflowClient = new DialogflowClient(dialogflowClientConfig);
const webhookHandler = new EventHandler(lineClient, dialogflowClient);

let contextsLoadedTimestamp = {};

app.post('/', async(req, res) => {
  const event = get(req, ['body', 'events', '0']);
  const userId = get(event, ['source', 'userId']);
  console.log(event);

  /**
   * Context Loading from Firebase
   */
  // Check if contexts is loaded within last 1 hour? (Speed up a response time.)
  if (!contextsLoadedTimestamp[userId] || contextsLoadedTimestamp[userId].getTime() < new Date().getTime() - 1000 * 60 * 60) {
    console.log("Load context");
    //If not, load from firebase. (Take time)
    let snapshot = await firebase
      .database()
      .ref('contexts/' + userId)
      .once('value');
    const contextsFromFirebase = (snapshot.val() && snapshot.val().contexts) || [];
    //Create context in Dialogflow one-by-one
    for (let i in contextsFromFirebase) {
      await dialogflowClient.createContext(userId, contextsFromFirebase[i]);
    }

    //Remember when the contexs is loaded from the firebase.
    contextsLoadedTimestamp[userId] = new Date();

  }
  //Handle event as normal.
  await webhookHandler.handleEvent(event);
  res.send('');

  /**
     * Context Saving from Firebase
     */

  //Get the contexts from dialogflow
  let contexts = await dialogflowClient.listContext(userId);
  contexts = contexts.map((x) => ({"name": x.name, "lifespanCount": x.lifespanCount}));
  console.log('contexts', contexts);
  
  //Save it into Firebase for future.
  firebase
    .database()
    .ref('contexts/' + userId)
    .set(contexts);

  res.send('');
});

app
.listen(process.env.PORT || DEFAULT_PORT);
