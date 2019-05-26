"use strict";
require("dotenv").config();
const Reminder = require("./models/Reminder").default;
const Bot = require("./bot").bot;
const Scenario = require("./lib/Scenario");
const getFromGoogleApi = require("./lib/utils/googleApi").getFromGoogleApi;

const scenario1 = new Scenario(Bot, [
  {
    listener: /Matin|Aprèm|Nuit/i,
    actions: [
      {
        type: "say object",
        text: "À quelle heure ?",
        quickReplies: [
          {
            content_type: "text",
            title: "C'est mort 💀",
            payload: "PIL_REM_PROTEC_DETAILS_NOTED"
          }
        ]
      }
    ]
  },
  {
    type: "on",
    listener: "quick_reply:PIL_REM_PROTEC_DETAILS_NOTED",
    actions: [
      {
        type: "say text",
        text: "Result"
      },
      {
        type: "sendTextMessage",
        text: "Result {1}",
        quickReplies: ["aa", "bbbb"]
      },
    ],
  }
]);

scenario1.playScenario();

Bot.start(process.env.PORT);
