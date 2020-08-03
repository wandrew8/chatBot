/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {

    controller.hears('food','message,direct_message', async(bot, message) => {
        await bot.reply(message, 'Would you like to see our menu?');
    });

    controller.on('message,direct_message', async(bot, message) => {
        await bot.reply(message, `Susan: ${ message.text }`);
    });

}
