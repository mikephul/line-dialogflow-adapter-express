import { get } from 'lodash';
import {
  Client,
  MessageEvent,
  TextEventMessage,
  ImageEventMessage,
  AudioEventMessage,
  LocationEventMessage,
  VideoEventMessage,
  StickerEventMessage,
} from '@line/bot-sdk';

import { LINE_VERIFY_TOKEN } from './config';
import { DialogflowClient } from './dialogflow-client';

export class MessageHandler {

  constructor(
    private readonly lineClient: Client,
    private readonly dialogflowClient: DialogflowClient) {
  }

  /**
   * All Message Handler
   */
  async handleText(event: MessageEvent) {
    const replyToken = get(event, 'replyToken');
    if (replyToken === LINE_VERIFY_TOKEN) return;
    const userId = get(event, ['source', 'userId']);
    const message: TextEventMessage = get(event, 'message');
    const messageText = get(message, 'text');
    console.log("messageText", messageText);
    const lineMessages = await this.dialogflowClient.sendText(userId, messageText);
    console.log("lineMessage", lineMessages);
    return this.lineClient.replyMessage(replyToken, lineMessages);
  }

  async handleImage(event: MessageEvent) {
    const message: ImageEventMessage = get(event, 'message');
    // tslint:disable-next-line:no-console
    console.log(`Handle Image: ${JSON.stringify(message)}`);
    return;
  }

  async handleVideo(event: MessageEvent) {
    const message: VideoEventMessage = get(event, 'message');
    // tslint:disable-next-line:no-console
    console.log(`Handle Video: ${JSON.stringify(message)}`);
    return;
  }

  async handleAudio(event: MessageEvent) {
    const message: AudioEventMessage = get(event, 'message');
    // tslint:disable-next-line:no-console
    console.log(`Handle Audio: ${JSON.stringify(message)}`);
    return;
  }

  async handleLocation(event: MessageEvent) {
    const message: LocationEventMessage = get(event, 'message');
    // tslint:disable-next-line:no-console
    console.log(`Handle Location: ${JSON.stringify(message)}`);
    return;
  }

  async handleSticker(event: MessageEvent) {
    const message: StickerEventMessage = get(event, 'message');
    // tslint:disable-next-line:no-console
    console.log(`Handle Sticker: ${JSON.stringify(message)}`);
    return;
  }

}
