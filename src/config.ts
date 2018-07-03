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

