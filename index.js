"use strict";
require("dotenv").config();
const Reminder = require("./models/Reminder").default;
const Bot = require("./bot").bot;
const Scenario = require("./lib/Scenario");

Bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
    Reminder.create ({
        idUser: payload.sender.id,
        sequenceStep: 0
    });
	chat.say('Get fucked!').then(() => {
		chat.say('How are you today?', { typing: true });
	});
});

const scenario1 = new Scenario(Bot, [
  {
    listener: /(.*)comment(.*)prendre(.*)pilule(.*)/i,
    actions: [
      {
        type: "say text",
        text:
          "Je peux te donner plein de conseils pour l'aider à bien prendre ta pilule ! Mais commençons par les plus importants :"
      },
      {
        type: "say text",
        text: "💡Pour commencer la première fois la pilule, tu as deux possibilités : " +
          " \n 1️⃣  tu peux la prendre le 1er jour de tes règles " +
          " \n 2️⃣ ou tu peux la prendre à n’importe quel moment de ton cycle "+
          " \n 🚨MAIS tu dois utiliser un préservatif pendant 7j. Après ce délai, tu seras protégée d’une éventuelle grossesse non désirée."
          
      },
      {
        type: "say object",
        text: `⏰ Ensuite, il faut que tu sois régulière : tu devras la prendre tous les jours, plus ou moins à la même heure`,
        quickReplies: ["Ça fait beaucoup 😨", "+ de conseils ! 😍", "Je savais tout 😇"]
      },
      // {
      //   type: "say object",
      // }
    ]
  }
]);

scenario1.playScenario();

Bot.start(process.env.PORT);
