// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler } = require('botbuilder');
var unirest = require("unirest");

var req = unirest("GET", "https://priaid-symptom-checker-v1.p.rapidapi.com/symptoms");

req.query({
    "format": "json",
    "language": "en-gb"
});

req.headers({
    "x-rapidapi-host": "priaid-symptom-checker-v1.p.rapidapi.com",
    "x-rapidapi-key": "6ed5a4c15dmsh298e8f8ca3c9affp1155dcjsn6605bf47af0b"
});





class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            var p = context.activity.text;
            req.end(function (p) {
                if (p.error) throw new Error(p.error);

                console.log(p.body);
            });
            await context.sendActivity(p.body);

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('Hello and welcome!');
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
