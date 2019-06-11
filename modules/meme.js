/*
// Command: Meme
// Description: Sends meme
*/

const config = require("../config.json")
const responseCount = require("../responseCount.json");
const responseText = require("../responseText.json");

module.exports = (message, cmd) => {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const expr = args[2]

    // Set limit to responseCount[cmd]; -> limit
    var limit = responseCount[cmd];

    // Only do if command is listed in responseCount.json.
    if (limit != undefined || "") {
        /* 
        Generate number using limits in responseCount.json -> number
        Change number to user defined number if within limits -> number
        Generate response -> response 
        */ 
        var number = Math.floor(Math.random() * limit) + 1;
        if (0 < expr && expr <= limit) var number = expr;
        var response = (responseText[cmd] + "\n" + responseCount.git_url + cmd + "/" + number + ".mp4");
    } else {
        message.reply(`You need to define the type of meme. Please use !!help meme`)
    }

    // Send message
    message.channel.send(response);
}