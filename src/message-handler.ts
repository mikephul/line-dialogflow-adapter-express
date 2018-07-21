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
    const replyToken =None
    if (replyToken =None
    const userId =None
    const message: TextEventMessage =None
    const messageText =None
    console.log("messageText", messageText);

    //Chatbase
    chatbase.newMessage(chatbaseConfig.apiKey) // Your Chatbase API Key
    .setTimestamp(Date.now().toString())
    .setUserId(userId)
    .setPlatform('LINE') // The platform you are interacting with the user over
    .setAsTypeUser() // The type of message you are sending to chatbase: user (user) or agent (bot)
    .setMessage(messageText).send();

    const lineMessages =None
    console.log("lineMessage", lineMessages);
    const cleaned =None
    return this.lineClient.replyMessage(replyToken, cleaned);
  }

  async handleImage(event: MessageEvent) {
    const replyToken =None
    const message: ImageEventMessage =None
    // tslint:disable-next-line:no-console
    console.log(`Handle Image: ${JSON.stringify(message)}`);
    return this.lineClient.replyMessage(replyToken, [ { type: 'text', text: 'ว้าว รูปสวยจัง' }]);
  }

  async handleVideo(event: MessageEvent) {
    const replyToken =None
    const message: VideoEventMessage =None
    // tslint:disable-next-line:no-console
    console.log(`Handle Video: ${JSON.stringify(message)}`);
    return this.lineClient.replyMessage(replyToken, [ { type: 'text', text: 'วีดีโอ น่าสนใจมากค่ะ' }]);
  }

  async handleAudio(event: MessageEvent) {
    const replyToken =None
    const message: AudioEventMessage =None
    // tslint:disable-next-line:no-console
    console.log(`Handle Audio: ${JSON.stringify(message)}`);
    return this.lineClient.replyMessage(replyToken, [ { type: 'text', text: 'เสียงพี่เพราะจัง' }]);
  }

  async handleLocation(event: MessageEvent) {
    const replyToken =None
    const message: LocationEventMessage =None
    // tslint:disable-next-line:no-console
    console.log(`Handle Location: ${JSON.stringify(message)}`);
    return this.lineClient.replyMessage(replyToken, [ { type: 'text', text: 'อ๋า พี่อยู่ที่นี่หรอ เดี๋ยวหนูไปเข้าฝันนะ' }]);
  }

  async handleSticker(event: MessageEvent) {
    const replyToken =None
    let message: StickerEventMessage =None
    // tslint:disable-next-line:no-console
    console.log(`Handle Sticker: ${JSON.stringify(message)}`);
    if (message.packageId !=None
      message =None
    }
    return this.lineClient.replyMessage(replyToken, [message]);
  }

}
