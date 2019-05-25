"use strict";
require("dotenv").config();
const Reminder = require("./models/Reminder").default;
const Bot = require("./bot").bot;

<<<<<<< Updated upstream
const BootBot = require("./lib/BootBot");
const Scenario = require("./lib/Scenario");

const bot = new BootBot({
  accessToken: process.env.FB_ACCESS_TOKEN,
  verifyToken: process.env.FB_VERIFY_TOKEN,
  appSecret: process.env.FB_APP_SECRET
=======
Bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
    Reminder.create ({
        idUser: payload.sender.id,
        sequenceStep: 0
    });
	chat.say('Get fucked!').then(() => {
		chat.say('How are you today?', { typing: true });
	});
>>>>>>> Stashed changes
});

const scenario1 = new Scenario(bot, [
    {
      listener: /(.*)comment (.*)prendre (.*)pilule ?/i,
      actions: [
        {
          type: "say text",
          text: "Je peux te donner plein de conseils pour l'aider à bien prendre ta pilule ! Mais commençons par les plus importants :",
        },
        {
          type: "say text",
          text: "Je peux te donner plein de conseils pour l'aider à bien prendre ta pilule ! Mais commençons par les plus importants :",
        }
      ]
    },]);

// Bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
//     Reminder.create ({
//         idUser: payload.sender.id
//     });
// 	chat.say('Get fucked!').then(() => {
// 		chat.say('How are you today?', { typing: true });
// 	});
// });

scenario1.playScenario();

bot.start(3000);
