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
    listener: ["comment prendre pilule"],
    actions: [
      {
        type: "say text",
        text:
          "Je peux te donner plein de conseils pour l'aider à bien prendre ta pilule ! Mais commençons par les plus importants :"
      },
      {
        type: "say text",
        text: `💡Pour commencer la première fois la pilule, tu as deux possibilités : 
          1️⃣  tu peux la prendre le 1er jour de tes règles 
          2️⃣ ou tu peux la prendre à n’importe quel moment de ton cycle 🚨MAIS tu dois utiliser un préservatif pendant 7j. Après ce délai, tu seras protégée d’une éventuelle grossesse non désirée.
          `
      },
      {
        type: "say text",
        text: `⏰ Ensuite, il faut que tu sois régulière : tu devras la prendre tous les jours, plus ou moins à la même heure`
      },
      {
        type: "say object",
        quickReplies: ["Ça fait beaucoup d’infos 😨", "D’autres conseils ! 😍", "Je savais déjà tout 😇"]
      }
    ]
  }
]);

scenario1.playScenario();

bot.start(3000);
