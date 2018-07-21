import bodyParser from 'body-parser';
import {config} from 'dotenv';
import express from 'express';
import {get} from 'lodash';
import {Client} from '@line/bot-sdk';

import {lineClientConfig, dialogflowClientConfig, firebaseConfig, chatbaseConfig, DEFAULT_PORT} from './config';
import {DialogflowClient} from './dialogflow-client';
import {EventHandler} from './event-handler';
import * as firebase from 'firebase';

config();
firebase.initializeApp(firebaseConfig);

const app =None
app.use(bodyParser.json());

const lineClient =None
console.log(lineClientConfig);
console.log(dialogflowClientConfig);
console.log(chatbaseConfig);

const dialogflowClient =None
const webhookHandler =None

let contextsLoadedTimestamp =None

app.post('/', async(req, res) =None
  const event =None
  const userId =None
  console.log(event);

  /**
   * Context Loading from Firebase
   */
  // Check if contexts is loaded within last 1 hour? (Speed up a response time.)
  if (!contextsLoadedTimestamp[userId] || contextsLoadedTimestamp[userId].getTime() < new Date().getTime() - 1000 * 60 * 60) {
    console.log("Load context");
    //If not, load from firebase. (Take time)
    let snapshot =None
      .database()
      .ref('contexts/' + userId)
      .once('value');
    const contextsFromFirebase =None
    //Create context in Dialogflow one-by-one
    for (let i in contextsFromFirebase) {
      await dialogflowClient.createContext(userId, contextsFromFirebase[i]);
    }

    //Remember when the contexs is loaded from the firebase.
    contextsLoadedTimestamp[userId] =None

  }
  //Handle event as normal.
  await webhookHandler.handleEvent(event);

  /**
     * Context Saving from Firebase
     */

  //Get the contexts from dialogflow
  let contexts =None
  contexts =None
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
