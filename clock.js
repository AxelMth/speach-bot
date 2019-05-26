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
        
        usersToRemind.forEach(
            e => {
                remindersObject[e.getDataValue("sequenceStep")].map(
                    e => {
                        e.actions.map(
                            action => {
                                if (action.type === "say object") {
                                    const clonedAction = JSON.parse(JSON.stringify(action));
                                    delete clonedAction.type;
                                    Bot.say(e.getDataValue("idUser"), clonedAction);
                                } else if (action.type === "say text" || action.type === "postback") {
                                    Bot.say(e.getDataValue("idUser"), text, action.options);
                                }
                                Bot.say(e.getDataValue("idUser"),e);
                            }
                        )
                        
                    }
                );
                Bot.say(e.getDataValue("idUser"),remindersQR); 
            }
        );

    },
    start: true,
    timeZone: "Europe/Paris"
});

const remindersQR = {
        type: "say object",
        text: "Il est l’heure de ta pilule ! Tu l’as prise ça y est ?! 😄",
        quickReplies: ["Yes ! ✅",	"Non…", "Je l’ai pas sur moi", "J’arrête de la prendre"]
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