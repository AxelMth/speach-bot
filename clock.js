const CronJob = require("cron").CronJob;

new CronJob({
    cronTime: "* * * * *",
    onTick: function() {
        console.log("rap regle");
    },
    timeZone: "Europe/Paris"
});