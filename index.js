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
    ]
  },
  {
    listener: ["+ de conseils ! 😍"],
    actions: [
      {
        type: "say object",
        text:
          "Je peux t’aider à te rappeler à prendre ta pilule tous les jours ! Finis les oublis ou le stress que ton rappel de téléphone sonne à tue-tête. Je t’enverrai une petite discrétos via Messenger. Ça t’intéresse ? 🤓 #ninja",
        quickReplies: ["Carrément !",	"Non merci !"]
      },
    ]
  },
  {
    listener: ["Carrément !"],
    actions: [
      {
        type: "say text",
        text: "Ok super!"
        
      },
      {
        type: "say object",
        attachment: "image",
        url:"https://media.giphy.com/media/5zbM9JbyO7nGQKS9bl/giphy.gif"
        }
      ,
      {
        type: "say text",
        text: "Pour bien choisir un horaire, je te conseille d’être : " +
        " \n ✅ toujours réveillée à ce moment (c’est quand même + pratique 🤗) " +
        " \n ✅ pas très loin de ton tel (c’est pas le moment d’être à la piscine ou en boîte de nuit 🤓)"+
        " \n ✅ avoir ta pilule à proximité (par exemple le soir, sur ta table de nuit ? 🌙)"
        
      },
      {
        type: "say object",
        text:
          "Alors, à quelle heure je t’envoie un rappel ? 😄",
        quickReplies: ["Carrément !",	"Non merci !"]
      },
    ]
  },{
      actions: [
      
      ]
    },
]);

scenario1.playScenario();

Bot.start(process.env.PORT);
