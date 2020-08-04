/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const { WebAdapter } = require('botbuilder-adapter-web');

module.exports = function(controller) {

    controller.hears('food','message,direct_message', async(bot, message) => {
        await bot.reply(message, 'Would you like to see our menu?');
    });

    controller.on('hello', async(bot, message) => {
        await bot.reply(message, {type: 'typing'});
        setTimeout(async () => {
            await bot.reply(message, 'Welcome to the Movie Database!');
        }, 1000);
    })

}
