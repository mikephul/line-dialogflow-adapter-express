import { config } from 'dotenv';
import { ClientConfig } from '@line/bot-sdk';

import { DialogflowConfig } from './types';

config();

export const lineClientConfig: ClientConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN as string,
};

export const dialogflowClientConfig: DialogflowConfig = {
  projectId: process.env.DIALOGFLOW_PROJECT_ID as string,
  languageCode: process.env.DIALOGFLOW_LANGUAGE_CODE as string,
};

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY as string,
  authDomain: process.env.FIREBASE_AUTHDOMAIN as string,
  databaseURL: process.env.FIREBASE_DATABASE_URL as string,
  projectId: process.env.FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env.FIREBASE_MESSENGING_SENDER_ID as string
}

export const chatbaseConfig = {
  apiKey: process.env.CHATBASE_KEY as string
}

// Port for Express
export const DEFAULT_PORT = 3000;

// Verify token from line when initiate webhook
export const LINE_VERIFY_TOKEN = '00000000000000000000000000000000';

// Field in Postback data that specified the Dialogflow event name
export const POSTBACK_EVENT_NAME_FIELD = 'action';

// Event Name for Dialogflow
export const LINE_FOLLOW = 'LINE_FOLLOW';
export const LINE_JOIN = 'LINE_JOIN';
export const LINE_BEACON = 'LINE_BEACON';

