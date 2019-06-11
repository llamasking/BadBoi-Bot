/*
// Command: Hash
// Description: Verifying the bot is runnign the most updated version through a command.
*/

// Except for one dir change, this is the exact same as the hashing in bot.js.

// Load framework
const fs = require("fs");
const hashthis = require("../framework/hashthis.js")

// Detect modules
modhash = [];
const mods = fs.readdirSync('./modules', 'utf-8');
for(i=mods.length; i--;) {
  modhash[i] = hashthis(fs.readFileSync('./modules/'+mods[i]));
}

// Overall hash of everything
const botjshash = hashthis(fs.readFileSync('./bot.js'));
const totalhash = hashthis(modhash.toString()+botjshash);

module.exports = (message, expr) => {
    message.channel.send(`\`\`Bot.js Hash: ${botjshash}\n\Total Hash: ${totalhash}\`\``);
}