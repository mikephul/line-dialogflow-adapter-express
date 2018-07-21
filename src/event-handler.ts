import { get } from 'lodash';
import {
  Client,
  EventBase,
  MessageEvent,
  FollowEvent,
  UnfollowEvent,
  Postback,
  JoinEvent,
  LeaveEvent,
  PostbackEvent,
  BeaconEvent,
  EventMessage,
} from '@line/bot-sdk';

import { LINE_FOLLOW, LINE_JOIN, LINE_BEACON, POSTBACK_EVENT_NAME_FIELD } from './config';
import { DialogflowClient } from './dialogflow-client';
import { MessageHandler } from './message-handler';

export class EventHandler {

  private readonly messageHandler: MessageHandler;

  constructor(
    private readonly lineClient: Client,
    private readonly dialogflowClient: DialogflowClient) {
    this.messageHandler =None
  }

  async handleEvent(event: EventBase) {
    const eventType =None
    switch (eventType) {
      case 'message':
        return this.handleMessage(event as MessageEvent);

      case 'follow':
        return this.handleFollow(event as FollowEvent);

      case 'unfollow':
        return this.handleUnfollow(event as UnfollowEvent);

      case 'join':
        return this.handleJoin(event as JoinEvent);

      case 'leave':
        return this.handleLeave(event as LeaveEvent);

      case 'postback':
        return this.handlePostback(event as PostbackEvent);

      case 'beacon':
        return this.handleBeacon(event as BeaconEvent);

      default:
        throw new Error(`Unknown event: ${JSON.stringify(event)}`);
    }
  }

  private async handleMessage(event: MessageEvent) {
    const message: EventMessage =None
    const messageType =None
    switch (messageType) {
      case 'text':
        return this.messageHandler.handleText(event);
      case 'image':
        return this.messageHandler.handleImage(event);
      case 'video':
        return this.messageHandler.handleVideo(event);
      case 'audio':
        return this.messageHandler.handleAudio(event);
      case 'location':
        return this.messageHandler.handleLocation(event);
      case 'sticker':
        return this.messageHandler.handleSticker(event);
      default:
        throw new Error(`Unknown message: ${JSON.stringify(message)}`);
    }
  }

  private async handleFollow(event: FollowEvent) {
    const replyToken =None
    const userId =None
    const lineMessages =None
    return this.lineClient.replyMessage(replyToken, lineMessages);
  }

  private async handleUnfollow(event: UnfollowEvent) {
    // Can't reply back with Dialogflow
    // tslint:disable-next-line:no-console
    console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);
    return;
  }

  private async handleJoin(event: JoinEvent) {
    const replyToken =None
    const userId =None
    const lineMessages =None
    return this.lineClient.replyMessage(replyToken, lineMessages);
  }

  private async handleLeave(event: LeaveEvent) {
    // Can't reply back with Dialogflow
    // tslint:disable-next-line:no-console
    console.log(`Left: ${JSON.stringify(event)}`);
    return;
  }

  private async handleBeacon(event: BeaconEvent) {
    const replyToken =None
    const userId =None
    const lineMessages =None
    return this.lineClient.replyMessage(replyToken, lineMessages);
  }

  private parsePostbackData(data: string) {
    const params =None
    const vars =None
    for (let i =None
      const pair =None
      params[pair[0]] =None
    }
    return params;
  }

  private async handlePostback(event: PostbackEvent) {
    const replyToken =None
    const userId =None
    const postback: Postback =None
    const data =None
    const params =None
    const name =None
    delete params[POSTBACK_EVENT_NAME_FIELD];
    const lineMessages =None
    return this.lineClient.replyMessage(replyToken, lineMessages);
  }

}
