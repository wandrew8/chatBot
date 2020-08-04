/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
module.exports = async function(controller) {
    const apiKey = "2488b5dd";

    controller.hears(['hi','hello','howdy','hey','aloha', 'huh', 'hmm', 'hola','bonjour','oi'],['message'], async (bot,message) => {      
        await bot.reply(message, {type: 'typing'});
        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.say('Hello and welcome to the movie database!'); 
            await bot.reply(message, {type: 'typing'});
      setTimeout(async () => {
        await bot.changeContext(message.reference);
        await bot.reply(message,{
            text: 'How can I help you?',
            quick_replies: [
                {
                    title: 'Search Movies',
                    payload: 'search',
                },
                {
                    title: 'Nothing',
                    payload: 'nothing',
                }
            ]
        });
    }, 2000);   
        }, 1000);
    });
    
    controller.hears(['bye','goodbye','exit','leave','nothing'],['message'], async (bot,message) => {  
        await bot.reply(message, {type: 'typing'});
        setTimeout(async () => {
            await bot.changeContext(message.reference);
            await bot.say('Have a nice day!'); 
        }, 1000);
    }); 

    // use a function to match a condition in the message
    controller.hears(async (message) => message.text && message.text.toLowerCase() === 'search', ['message'], async (bot, message) => {


            bot.reply(message, 'What is the name of the movie you would like to search for?', async function(response,bot) {
                controller.hears('.*','message', async(bot, message) => {

                    await bot.reply(message, 'I am searching for information on ' + message.text);
                
                });
              
        })

    controller.hears('.*','message', async(bot, message) => {
        const movie = message.text;
        await bot.reply(message, 'Looking for information on the movie ' + movie);
        const fetchRequest = await fetch(`http://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.Response === 'True') {
                    bot.reply(message, {
                        text: `<h2>${data.Title} | ${data.Year} | ${data.Rated}</h2> <br> ${data.Plot} <br><br> ${data.Production} | ${data.Runtime} | ${data.Country} <br><br>`,
                        files: [
                          {
                            image: true,
                            url:
                              data.Poster,
                          },
                        ],
                      });
                      bot.reply(message, {type: 'typing'});
                      setTimeout(async () => {
                        await bot.changeContext(message.reference);
                        await bot.reply(message,{
                            text: 'Would you like to search for another movie?',
                            quick_replies: [
                                {
                                    title: 'Search Movies',
                                    payload: 'search',
                                },
                                {
                                    title: 'No Thanks',
                                    payload: 'goodbye',
                                }
                            ]
                        });
                    }, 2000);   
                } else {
                    bot.reply(message, 'Oh no, we could not find the movie you were looking for');
                }

            })
            .catch(err => console.log(err))
        });
    
    });

    controller.hears(async (message) => message.text && message.text.toLowerCase() === 'nothing', ['message'], async (bot, message) => {
        await bot.reply(message, {type: 'typing'});
      setTimeout(async () => {
        await bot.changeContext(message.reference);
        await bot.reply(message, 'Okay, have a nice day!');
    }, 2000);
    });

    // match any one of set of mixed patterns like a string, a regular expression
    controller.hears(['allcaps', new RegExp(/^[A-Z\s]+$/)], ['message','direct_message'], async function(bot, message) {
        await bot.reply(message,{ text: 'Please calm down. There is no reason to shout at me.' });
    });

}