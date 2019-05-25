'use strict';
const BootBot = require('./lib/BootBot');

const bot = new BootBot({
    accessToken: 'EAAIaxxzUj9MBAEq7gDSJSw4WkO2h4p5a3SLOaHxEW3ixxWWq5VtujSmPT04JZCxZAtnVEKHbljOCverfLJKusZCI7WczOZB2sc5rnLIIXL68CkHus9spA5QaNCq2DH4B8wca591JZASi5xPSLZB2vSxTMFSZBDDgpnqHP3ikrkmbQZDZD',
    verifyToken: 'speach_for_medidays',
    appSecret: '1373668129093fdf00bb475ab68d05be'
});

bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
	chat.say('Get fucked!').then(() => {
		chat.say('How are you today?', { typing: true });
	});
});

bot.start();

module.exports = BootBot;
