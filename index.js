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
        quickReplies: [{
          "content_type":"text",
          "title":"C'est mort 💀",
          "payload": "ORDO_NO_MORE",
        },]
      }
    ]
  },
  {
    type: "quickReplies",
    listener: "quick_reply:ORDO_NO_MORE",
    text: "Ok! Je peux te chercher un.e gynécologue 👩‍⚕️👨‍⚕️! J'ai besoin de ton adresse stp",
    quickReplies: [
      {
        "content_type":"text",
        "title":"C'est mort 💀",
        "payload":"<HOUR_SET_21H>",
      },
      {
        "content_type":"location",
        "title":"Géolocalise-moi !"
      }
    ],
  },
  {
    type: "quickReplies",
    listener: "quick_reply:PIL_REM_DNT_HAVE",
    text: "Tu as 12h à compter de maintenant pour la prendre, sinon tu ne seras plus protégée (hors pilule Microval) ! 😅",
    quickReplies: [
      {
        "content_type":"text",
        "title":"C'est mort 💀",
        "payload":"<HOUR_SET_21H>",
      },
      {
        "content_type":"location",
        "title":"Géolocalise-moi !"
      }
    ],
  },
  {
    type: "quickReplies",
    listener: "quick_reply:ORDO_NO_MORE",
    text: "Ok! Je peux te chercher un.e gynécologue 👩‍⚕️👨‍⚕️! J'ai besoin de ton adresse stp",
    quickReplies: [
      {
        "content_type":"text",
        "title":"Ah oui ? 😨",
        "payload":"PIL_REM_PROTEC_DETAILS",
      },
      {
        "content_type":"text",
        "title":"Ok j’y vais 😅",
        "payload":"<HOUR_SET_21H>",
      },
      {
        "content_type":"text",
        "title":"Je m’en fiche",
        "payload":"<HOUR_SET_21H>",
      },
      {
        "content_type":"text",
        "title":"Microval ? 🧐",
        "payload":"<HOUR_SET_21H>",
      }
    ],  
  },
  {
    type: "quickReplies",
    listener: "quick_reply:PIL_REM_PROTEC_DETAILS",
    text: "Ok! Je peux te chercher un.e gynécologue 👩‍⚕️👨‍⚕️! J'ai besoin de ton adresse stp",
    quickReplies: [
      {
        "content_type":"text",
        "title":"Ok c’est noté ! 📝",
        "payload":"PIL_REM_PROTEC_DETAILS_NOTED",
      },
      {
        "content_type":"text",
        "title":"Ça fait flipper… 😅",
        "payload":"<HOUR_SET_21H>",
      },
    ],
  }
]);

Bot.on('quick_reply:PIL_REM_PROTEC_DETAILS_NOTED', (payload, chat) => {
  chat.say("Au fait, tu es bientôt arrivée à la fin de ta plaquette ! Tu as une ordonnance à jour ?", {
    quickReplies: [
      {
        "content_type":"text",
        "title":"Oui",
        "payload":"<HOUR_SET_21H>",
      },
      {
        "content_type":"text",
        "title":"Non",
        "payload":"ORDO_NO_MORE",
      },
    ],
  });
});

scenario1.playScenario();

Bot.start(process.env.PORT);
