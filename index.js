'use strict';
require("dotenv").config();

const BootBot = require('./lib/BootBot');

const bot = new BootBot({
    accessToken: process.env.FB_ACCESS_TOKEN,
    verifyToken: process.env.FB_VERIFY_TOKEN,
    appSecret: process.env.FB_APP_SECRET
});

let chat;

bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
    chat = chat;
	chat.say('Get fucked!').then(() => {
		chat.say('How are you today?', { typing: true });
	});
});


bot.start(process.env.PORT);


sleep(3000);
if(chat)
    chat.say('forced message');