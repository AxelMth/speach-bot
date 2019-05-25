require("dotenv").config();
const CronJob = require("cron").CronJob;
const Reminder = require("./models/Reminder").default;
const Bot = require("./bot").bot;

new CronJob({
    cronTime: "* * * * *",
    onTick: async function() {
        const usersToRemind = await Reminder.findAll({
            attributes: ["idUser"]
        });
        usersToRemind.forEach(e => Bot.say(e.getDataValue("idUser"),"I'll harass you now"));

    },
    start: true,
    timeZone: "Europe/Paris"
});