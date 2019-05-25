"use strict";
require("dotenv").config();
const Reminder = require("./models/Reminder").default;
const Bot = require("./bot").bot;

const BootBot = require("./lib/BootBot");
const Scenario = require("./lib/Scenario");

const bot = new BootBot({
  accessToken: process.env.FB_ACCESS_TOKEN,
  verifyToken: process.env.FB_VERIFY_TOKEN,
  appSecret: process.env.FB_APP_SECRET
});

const scenario1 = new Scenario(bot, [
  [
    ["hello", "hi", /hey( there)?/i],
    [{ text: "Get fucked!" }, { text: "How are you today?" }]
  ]
]);

// Bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
//     Reminder.create ({
//         idUser: payload.sender.id
//     });
// 	chat.say('Get fucked!').then(() => {
// 		chat.say('How are you today?', { typing: true });
// 	});
// });

scenario1.playScenario();

bot.start(process.env.PORT);
