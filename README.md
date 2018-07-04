# Line-Dialogflow Adapter for Express 

Line-Dialogflow Adapter helps pass events from [Line Messaging API](https://developers.line.me/en/docs/messaging-api/overview/) to [Dialogflow](https://dialogflow.com/). Normally, the events such as [Follow event](https://developers.line.me/en/docs/messaging-api/reference/#follow-event) and [Postback event](https://developers.line.me/en/docs/messaging-api/reference/#postback-event) are not supported out-of-the-box by Dialogflow yet. Hence, the bot can only send text query to get the response from Dialogflow. This code seeks to translate [Line webhook events](https://developers.line.me/en/docs/messaging-api/reference/#webhook-event-objects) to Dialogflow custom events. Click [here](http://qr-official.line.me/L/oVd9bvJ4qG.png) to see the bot in action.

__*Note:__ This code will deploy the adapter on [Express](http://expressjs.com/).


## Quickstart

1. Create a bot in [Dialogflow](https://dialogflow.com/). Remember your `project-id` and `language`. No need to set up the Integrations for Line.

2. Enable the [Dialogflow API](https://console.cloud.google.com/flows/enableapi?apiid=dialogflow.googleapis.com) in Google Cloud console for your project.

3. Obtain the channel access token of your Line bot from [Line Developer console](https://developers.line.me/console/).

4. Set up the config in `.env` with
```
LINE_CHANNEL_ACCESS_TOKEN=
DIALOGFLOW_PROJECT_ID=
DIALOGFLOW_LANGUAGE_CODE=
PORT=
```

5. Deploy express with
```
cd line-dialogflow-adapter-express
npm install
npm start
```

6. Go to the [Line Channel Setting](https://developers.line.me/console/) of your bot. 
	- Enable webhook and add the Webhook URL to point to your web server. 
	- Disable Auto-reply messages and Greeting messages
  
__*Tips:__ If you are developing locally. You can use [ngrok](https://ngrok.com/) to tunnel your request to local machine and use ngrok provided url as webhook.

7. Go to Dialogflow console. For `Default Welcome Intent`, add `LINE_FOLLOW` event to greet your audience from Dialogflow!   

## Line webhook event to Dialogflow event
- __Message event__ is simply sent to Dialogflow as text. 
- __Follow, Join, Beacon event__ are sent as custom Dialogflow events below:

|  Line  |  Dialogflow |
|:------:|:-----------:|
| Follow | `LINE_FOLLOW` |
|  Join  |  `LINE_JOIN`  |
| Beacon | `LINE_BEACON` |

- __Postback event__ are sent as `<EVENT_NAME>` to Dialogflow with all the followed parameters. The parameters may be used in the Dialogflow responses as `#your_event_name.param` (ie. `My store id is #your_event_name.storeid` will return `My store id is 1234` from the example below).
```
{  
   "type":"postback",
   "replyToken":"b60d432864f44d079f6d8efe86cf404b",
   "source":{  
      "userId":"U91eeaf62d...",
      "type":"user"
   },
   "timestamp":1513669370317,
   "postback":{  
      "data":"action=<EVENT NAME>&storeid=1234",
      "params":{  
         "datetime":"2017-12-25T01:00"
      }
   }
}
```

Feel free to customize the name of the predefined Dialogflow events and `<EVENT_NAME>` selector (default is `action`) in `config.ts`.

### Documentation
- [View Line webhook event](https://developers.line.me/en/docs/messaging-api/reference/#common-properties)
- [View Dialogflow event](https://dialogflow.com/docs/events)
