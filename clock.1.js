require("dotenv").config();
const Bot = require("./bot").bot;
const Scenario = require("./lib/Scenario");

Bot.say("2416670891718055","Tu veux une petite blague ? 🤓");
Bot.say("2416670891718055","Dans la phrase 'Je suis enceinte', quel est le temps du verbe ?"); 
Bot.say("2416670891718055","L'imparfait du préservatif. 😂",{typing: true});

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