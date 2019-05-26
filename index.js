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
        quickReplies: ["jhh", "hjcdduifbd"]
      }
    ]
  },
  {
    type: "quickReplies",
    listener: "quick_reply:ORDO_NO_MORE",
    text: "Ok! Je peux te chercher un gynécologue ‍! J’ai besoin de ton adresse stp",
    actions: [
      {
        "content_type":"text",
        "title": "C’est mort :crâne:",
        "payload": "<HOUR_SET_21H>",
      },
      {
        "content_type": "location",
        "title": "Géolocalise-moi !"
      }
    ],
  }
]);

scenario1.playScenario();

Bot.start(3000);
