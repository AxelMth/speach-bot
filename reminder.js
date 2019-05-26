require("dotenv").config();
const Bot = require("./bot").bot;
const Scenario = require("./lib/Scenario");

async function reminderScenario() {
    await Bot.say("2416670891718055","Tu veux une petite blague ? 🤓");
    await Bot.say("2416670891718055","Dans la phrase 'Je suis enceinte', quel est le temps du verbe ?"); 
    await Bot.say("2416670891718055","L'imparfait du préservatif. 😂",{typing: true});
    await Bot.sendTextMessage("2416670891718055", "Il est l’heure de ta pilule ! Tu l’as prise ça y est ?! 😄", [
        {
            "content_type":"text",
            "title":"Yes ! ✅",
            "payload":"<PIL_REM_YES>",
        },
        {
            "content_type":"text",
            "title":"Non…",
            "payload":"PIL_REM_NO",
        },
        {
            "content_type":"text",
            "title":"Je l’ai pas sur moi",
            "payload":"PIL_REM_DNT_HAVE",
        },
        {
            "content_type":"text",
            "title":"J’arrête de la prendre",
            "payload":"PIL_REM_STOP",
        },
    ]);
}

reminderScenario();


