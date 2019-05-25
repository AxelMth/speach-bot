'use strict';
require("dotenv").config();
const Reminder = require("./models/Reminder").default;
const Bot = require("./bot").bot;

Bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
    Reminder.create ({
        idUser: payload.sender.id
    });
	chat.say('Get fucked!').then(() => {
		chat.say('How are you today?', { typing: true });
	});
});


bot.start(process.env.PORT);
