"use strict";
require("dotenv").config();
const Reminder = require("./models/Reminder").default;
const Bot = require("./bot").bot;
const getFromGoogleApi = require("./lib/utils/googleApi").getFromGoogleApi;

const BootBot = require("./lib/BootBot");
const Scenario = require("./lib/Scenario");

const {
  dayTimeGenerator,
  timeGenerator,
  formatTimeFromInput
} = require("./lib/utils/generate-midday-schedules");

const bot = new BootBot({
  accessToken: process.env.FB_ACCESS_TOKEN,
  verifyToken: process.env.FB_VERIFY_TOKEN,
  appSecret: process.env.FB_APP_SECRET
});

const scenario1 = new Scenario(bot, [
  {
    listener: ["test"],
    actions: [
      {
        type: "say object",
        text: "Team matin, après-midi ou soir ?",
        quickReplies: ["Matin", "Aprèm", "Nuit"]
      }
    ]
  },
  {
    listener: /Matin|Aprèm|Nuit/i,
    actions: [
      {
        type: "say object",
        text: "À quelle heure ?",
        quickRepliesGenerator: dayTimeGenerator
      }
    ]
  },
  {
    listener: /^[0-9]{1}([0-9]{1})?h$|^Minuit$|^Midi$/i,
    actions: [
      {
        type: "say object",
        text: "Allez, t'as le meme le choix des minutes !",
        quickRepliesGenerator: timeGenerator
      }
    ]
  },
  {
    listener: /^[0-9]{1}([0-9]{1})?h[0-9]{2}$|^Minuit !$|^Midi !$/i,
    callback: async (idUser, reminderTime) => {
      try {
        const foundUser = await Reminder.findOne({
          where: {
            idUser
          }
        });
        if (foundUser) {
          await Reminder.update(
            {
              idUser,
              sequenceStep: 0,
              time: formatTimeFromInput(reminderTime)
            },
            {
              where: {
                idUser
              }
            }
          );
        } else {
          await Reminder.create({
            idUser,
            sequenceStep: 0,
            time: formatTimeFromInput(reminderTime)
          });
        }
      } catch (err) {
        console.error(err);
      }
    },
    actions: [
      {
        type: "say text",
        text:
          "C’est bien noté :note:, je te rappellerai de prendre ta pilule à cette heure-là ! :réveil"
      }
    ]
  }
]);

scenario1.playScenario();

bot.start(3000);
