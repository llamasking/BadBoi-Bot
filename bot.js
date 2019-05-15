// Load and prep Discord and client.
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const crypto = require("crypto");

// Load configs. 
const config = require("./config.json");
const responseCount = require("./responseCount.json");
const responseText = require("./responseText.json");

// Load command modules.
const help = require("./modules/help.js");

// Set revision
fs.readFile('bot.js', (err, data) => {
  if (err) throw err
  hash = crypto.createHash('md5').update(data, 'utf8').digest('hex')
  console.log(`Hash: ${hash}}`)
})

client.on("ready", () => {
  console.log(`
    Logged in as ${client.user.username}.
    Revision: 
    Time: ${new Date()}
    Serving ${client.guilds.size} servers with ${client.users.size} users.`);
  client.user.setActivity(config.activity);
});

client.on("guildCreate", guild => {
  console.log(`Time: ${new Date().toLocaleTimeString()} Joined new server: ${guild.name} with ${guild.memberCount} members.`)
})

client.on("message", async message => {
  // Cut out bots and group chats/dms.
  if(message.author.bot) return;
  if(message.guild === null) return;

  // @Bot help
  if(message.isMentioned(client.user.id) && message.content.includes("help")) {
    help(Discord, message.channel)
    console.log(`Time: ${new Date().toLocaleTimeString()} -- Sender ${message.author.username} -- Command: ${cmd} -- Arguments: ${args[0]}`)
  }
  
  // Cut out commands not starting with prefix.
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const expr = args[0];

  // Set limit to responseCount[cmd]; -> limit
  const limit = responseCount[cmd];
  
  // Only do if command is listed in responseCount.json.
  if (responseCount[cmd] !== undefined) {
    /* 
    Generate number using limits in responseCount.json -> number 
    Change number to user defined number if within limits -> number
    Generate response -> response 
    */
    var number = Math.floor(Math.random() * limit) + 1;
    if (0 < expr && expr <= limit) var number = expr;
    var response = (responseText[cmd] + "\n" + responseCount.git_url + cmd + "/" + number + ".mp4");
  }

  switch (cmd) {
    // Help
    case "help":
    case "commands": {
      help(Discord, message.channel);
      break;
    }

     // Account Creation Date
    case "cdate": {
      message.channel.send(`${message.mentions.users.first().username}'s account was created on \`${message.mentions.users.first().createdAt}\`.`);
      break;
    }

    case "hash": {
      message.channel.send(`Hash: ${hash}`);
      break;
    }

     // Penis
    case "penis": {
      // 100% Fair. Not rigged at all. Totally fair! 

      /* 
       * Warn to @ person if not already done.
       * Slice ID <@530900836596056073> to one digit number.
       * Inititate shaft.
       * Add one = per length.
       * Send message.
      */ 

      if (expr == undefined) {
        message.reply("You need to @ someone.");
        break;
      }
      var length = expr.slice(12, -8);
      var shaft = "8";
      for(length > 0; length--;) var shaft = shaft + "=";
      message.channel.send(shaft + "D \n``This is 100% accurate.``")
      break;
    }

    // Ping
    case "ping": {
      // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
      // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
      const m = await message.channel.send("Testing ping!");
      m.edit(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
      break;
    }

    // Send response if nothing custom is set.
    default: {
      if (response === undefined) {
        return;
      } else {
        message.channel.send(response)
          .catch(error => console.error(`Time: ${new Date().toLocaleTimeString()} Error: "${error}"`));
        break;
      }
    }
  }

  // Logging <READ THE TERMS ON THE GITHUB REPO>
  console.log(`Time: ${new Date().toLocaleTimeString()} -- Sender ${message.author.username} -- Command: ${cmd} -- Arguments: ${args[0]}`)
});

client.login(config.token);