'use strict';
require("dotenv").config();
const Reminder = require("./models/Reminder").default;

const BootBot = require('./lib/BootBot');

const bot = new BootBot({
    accessToken: process.env.FB_ACCESS_TOKEN,
    verifyToken: process.env.FB_VERIFY_TOKEN,
    appSecret: process.env.FB_APP_SECRET
});

bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
    Reminder.create ({
        idUser: payload.idUser
    });
	chat.say('Get fucked!').then(() => {
		chat.say('How are you today?', { typing: true });
	});
});


bot.start(process.env.PORT);
