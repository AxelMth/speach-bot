"use strict";
require("dotenv").config();

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

scenario1.playScenario();

bot.start();