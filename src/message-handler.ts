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

import { LINE_VERIFY_TOKEN, chatbaseConfig } from './config';
import { DialogflowClient } from './dialogflow-client';
import chatbase from '@google/chatbase';

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

    //Chatbase
    chatbase.newMessage(chatbaseConfig.apiKey) // Your Chatbase API Key
    .setTimestamp(Date.now().toString())
    .setUserId(userId)
    .setPlatform('LINE') // The platform you are interacting with the user over
    .setAsTypeUser() // The type of message you are sending to chatbase: user (user) or agent (bot)
    .setMessage(messageText).send();

    const lineMessages = await this.dialogflowClient.sendText(userId, messageText);
    console.log("lineMessage", lineMessages);
    const cleaned = lineMessages.filter((x)=>x!=null);
    return this.lineClient.replyMessage(replyToken, cleaned);
  }

  async handleImage(event: MessageEvent) {
    const replyToken = get(event, 'replyToken');
    const message: ImageEventMessage = get(event, 'message');
    // tslint:disable-next-line:no-console
    console.log(`Handle Image: ${JSON.stringify(message)}`);
    return this.lineClient.replyMessage(replyToken, [ { type: 'text', text: 'ว้าว รูปสวยจัง' }]);
  }

  async handleVideo(event: MessageEvent) {
    const replyToken = get(event, 'replyToken');
    const message: VideoEventMessage = get(event, 'message');
    // tslint:disable-next-line:no-console
    console.log(`Handle Video: ${JSON.stringify(message)}`);
    return this.lineClient.replyMessage(replyToken, [ { type: 'text', text: 'วีดีโอ น่าสนใจมากค่ะ' }]);
  }

  async handleAudio(event: MessageEvent) {
    const replyToken = get(event, 'replyToken');
    const message: AudioEventMessage = get(event, 'message');
    // tslint:disable-next-line:no-console
    console.log(`Handle Audio: ${JSON.stringify(message)}`);
    return this.lineClient.replyMessage(replyToken, [ { type: 'text', text: 'เสียงพี่เพราะจัง' }]);
  }

  async handleLocation(event: MessageEvent) {
    const replyToken = get(event, 'replyToken');
    const message: LocationEventMessage = get(event, 'message');
    // tslint:disable-next-line:no-console
    console.log(`Handle Location: ${JSON.stringify(message)}`);
    return this.lineClient.replyMessage(replyToken, [ { type: 'text', text: 'อ๋า พี่อยู่ที่นี่หรอ เดี๋ยวหนูไปเข้าฝันนะ' }]);
  }

  async handleSticker(event: MessageEvent) {
    const replyToken = get(event, 'replyToken');
    let message: StickerEventMessage = get(event, 'message');
    // tslint:disable-next-line:no-console
    console.log(`Handle Sticker: ${JSON.stringify(message)}`);
    if (message.packageId != '1'){
      message = {"type":"sticker","stickerId":"13","packageId":"1"};
    }
    return this.lineClient.replyMessage(replyToken, [message]);
  }

}
