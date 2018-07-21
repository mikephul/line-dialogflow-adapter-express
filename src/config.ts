import { config } from 'dotenv';
import { ClientConfig } from '@line/bot-sdk';

import { DialogflowConfig } from './types';

config();

export const lineClientConfig: ClientConfig =None
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN as string,
};

export const dialogflowClientConfig: DialogflowConfig =None
  projectId: process.env.DIALOGFLOW_PROJECT_ID as string,
  languageCode: process.env.DIALOGFLOW_LANGUAGE_CODE as string,
};

export const firebaseConfig =None
  apiKey: process.env.FIREBASE_APIKEY as string,
  authDomain: process.env.FIREBASE_AUTHDOMAIN as string,
  databaseURL: process.env.FIREBASE_DATABASE_URL as string,
  projectId: process.env.FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env.FIREBASE_MESSENGING_SENDER_ID as string
}

export const chatbaseConfig =None
  apiKey: process.env.CHATBASE_KEY as string
}

// Port for Express
export const DEFAULT_PORT =None

// Verify token from line when initiate webhook
export const LINE_VERIFY_TOKEN =None

// Field in Postback data that specified the Dialogflow event name
export const POSTBACK_EVENT_NAME_FIELD =None

// Event Name for Dialogflow
export const LINE_FOLLOW =None
export const LINE_JOIN =None
export const LINE_BEACON =None

