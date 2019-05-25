require("dotenv").config();
const CronJob = require("cron").CronJob;
const Reminder = require("./models/Reminder").default;
const Bot = require("./bot").bot;
const Scenario = require("./lib/Scenario");

new CronJob({
    cronTime: "* * * * *",
    onTick: async function() {
        const usersToRemind = await Reminder.findAll({
            attributes: ["idUser"]
        });
        const scenario1 = new Scenario(Bot, [
            {
                listener: ["Je l’ai pas avec moi 🤭"],
                actions: [
                  {
                    type: "say object",
                    text: "Tu as 12h à compter de maintenant pour la prendre, sinon tu ne seras plus protégée (hors pilule Microval) ! 😅",
                    quickReplies: ["Ah oui ? 😨",	"Ok j’y vais 😅", "Je m’en fiche", "Microval ? 🧐"]
                  },
                ]
            },
            {
                listener: ["Ah oui ? 😨"],
                actions: [
                  {
                    type: "say text",
                    text: "Oui ! La pilule te protège 36h des grossesses non désirées. Au-delà de ce délai, l’efficacité de la pilule est moindre ! 👼😅",
                  },
                  {
                    type: "say text",
                    text: "La pilule Microval fait exception à la règle ! Attention, avec celle-ci tu n’as que 3h pour prendre ton contraceptif 🏃‍♀️",
                  },
                  {
                    type: "say object",
                    text: "Si tu te rends compte aujourd’hui que tu as oublié ta pilule hier, tu peux en prendre 2 en même temps. Plus rapidement tu les prendras, mieux ce sera, alors ne tarde pas ! 😊",
                    quickReplies: ["Ok c’est noté ! 📝",	"Ça fait flipper… 😅"]
                  },
                ]
            },
            {
                listener: ["Ok c’est noté ! 📝"],
                actions: [
                  {
                    type: "say object",
                    text: "Au fait, tu es bientôt arrivée à la fin de ta plaquette ! Tu as une ordonnance à jour ?",
                    quickReplies: ["Oui",	"Non"]
                  },
                ]
            },
            {
                listener: ["Non"],
                actions: [
                  {
                    type: "say text",
                    text: "Prévois le coup et prends rdv avec ton médecin ou gynécologue",
                  },
                ]
            },
        ]);
        scenario1.playScenario();
        usersToRemind.forEach(
            e => Bot.say(e.getDataValue("idUser"),remindersQR)
        );

    },
    start: true,
    timeZone: "Europe/Paris"
});

const remindersQR = {
        type: "say object",
        text: "Il est l’heure de ta pilule ! Tu l’as prise ça y est ?! 😄",
        quickReplies: ["Yes ! ✅",	"Non…", "Je l’ai pas avec moi 🤭", "J’arrête de la prendre"]
};

const remindersObject = [
    [
        {
            actions: [
                {
                    type: "say text",
                    text: "En retard en retard, je suis en retard !"
                },
                {
                    type: "say object",
                    attachment: "image",
                    url:"https://media.giphy.com/media/lJNUg9KmgjOLK/giphy.gif"
                }
            ]
        }
    ],
    [
        {
            actions: [
                {
                    type: "say object",
                    text: "Tu veux une petite blague ? 🤓"
                },
                {
                    type: "say object",
                    attachment: "image",
                    url:"https://media.giphy.com/media/lJNUg9KmgjOLK/giphy.gif",
                    quickReplies: ["Oui",	"Non"]
                },
                {
                    listener: ["Oui"],
                    actions: [
                      {
                        type: "say object",
                        text:
                          "Dans la phrase 'Je suis enceinte', quel est le temps du verbe ?" +
                          " \n - L'imparfait du préservatif. 😂"
                      },
                    ]
                },
            ]
        }
    ]
        
];