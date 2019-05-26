const moment = require("moment-timezone")

module.exports = {
    dayTimeGenerator: (dayTime) => {
        let schedules = [];
        if (dayTime === "Matin") {
            for (let i = 7; i < 13; i++) {
                schedules.push(`${i === 12 ? "Midi" : `${i}h`}`);
            }
        } else if (dayTime === "Aprèm") {
            for (let i = 13; i < 22; i++) {
                schedules.push(`${i}h`);
            }
        } else if (dayTime === "Nuit") {
            schedules = schedules.concat(["22h", "23h"])
            for (let i = 0; i < 7; i++) {
                schedules.push(`${i === 0 ? "Minuit" : `${i}h`}`);
            }
        }
        return schedules;
    },
    timeGenerator: (hour) => {
        let times = [];
        if (hour === "Midi") {
            return ["Midi !", "12h15", "12h30", "12:45"]
        } else if (hour === "Minuit") {
            return ["Minuit !", "00h15", "00h30", "00:45"]
        } else {
            const time = +hour.split("h")[0];
            return [`${time}h00`, `${time}h15`, `${time}h30`, `${time}h45`]
        }
    },
    formatTimeFromInput: (time) => {
        if (time === "Midi !") {
            return moment().tz("Europe/Paris").hour(12).minute(0).second(0).format()
        } else if (time === "Minuit !") {
            return moment().tz("Europe/Paris").hour(0).minute(0).second(0).format()
        } else {
            const formattedTime = time.replace("h", ":").split(":");
            const hour = +formattedTime[0]
            const minute = +formattedTime[1]
            return moment().tz("Europe/Paris").hour(hour).minute(minute).second(0).format()
        }
    },
}
