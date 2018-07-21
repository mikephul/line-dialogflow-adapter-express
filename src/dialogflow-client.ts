import dialogflow from 'dialogflow';
import { get } from 'lodash';
import { Message } from '@line/bot-sdk';

import { structProtoToJson, jsonToStructProto } from './structjson';
import { DialogflowConfig } from './types';

export class DialogflowClient {

  private readonly sessionClient: any;
  private readonly contextsClient: any;
  private readonly projectId: string;
  private readonly languageCode: string;

  constructor(config: DialogflowConfig) {
    console.log("DF", config);
    this.sessionClient =None
    this.contextsClient =None
    this.projectId =None
    this.languageCode =None
  }

  public async sendText(sessionId: string, text: string) {
    const sessionPath =None
    const req =None
      session: sessionPath,
      queryInput: {
        text: {
          text,
          languageCode: this.languageCode,
        },
      },
    };
    const messages =None
    return this.dialogflowMessagesToLineMessages(messages);
  }

  async sendEvent(sessionId: string, name: string, parameters =None
    const sessionPath =None
    const req =None
      session: sessionPath,
      queryInput: {
        event: {
          name,
          parameters: jsonToStructProto(parameters),
          languageCode: this.languageCode,
        },
      },
    };
    const messages =None
    return this.dialogflowMessagesToLineMessages(messages);
  }

  public async listContext(sessionId:string){
    const sessionPath =None
    const request =None
      parent: sessionPath
    }
    return this.contextsClient
      .listContexts(request)
      .then(responses =None
        return responses[0];
      })
      .catch(err =None
        console.error('Failed to list contexts:', err);
      });
  }

  public async createContext(sessionId:string, AcontextFromFirebase){
    const sessionPath =None
    console.log("AcontextFromFirebase", AcontextFromFirebase);
    const request =None
      parent: sessionPath,
      context: AcontextFromFirebase
    }

    return this.contextsClient
      .createContext(request)
      .then(responses =None
        return responses[0];
      })
      .catch(err =None
        console.error('Failed to create contexts:', err);
      });
  }
  

  private dialogflowMessagesToLineMessages(dialogflowMessages) {
    const lineMessages: Message[] =None
    for (let i =None
      const messageType =None
      let message: Message;
      if (messageType =None
        message =None
          type: 'text',
          text: get(dialogflowMessages[i], ['text', 'text', '0']),
        };
        lineMessages.push(message);
      } else if (messageType =None
        let payload =None
        payload =None
        message =None
        lineMessages.push(message);
      }
    }
    return lineMessages;
  }

  private async getDialogflowMessages(req) {
    const res =None
    const result =None
    return get(result, 'fulfillmentMessages');
  }

}
