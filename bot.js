// Load and prep Discord and client.
let Discord = require("discord.js");
let client = new Discord.Client();

// Load configs. 
let config = require("./config.json");
let responseCount = require("./responseCount.json");
let responseText = require("./responseText.json");

// Set revision.
let rev = 'Better boi'

client.on("ready", () => {
  console.log(`\nBot online! \nRevision: ${rev} \nTime: ${new Date().toLocaleTimeString()}`);
  console.log(`Serving ${client.guilds.size} servers with ${client.users.size} users. \n`)
  client.user.setActivity(config.activity);
});

client.on("guildCreate", guild => {
  console.log(`Time: ${new Date().toLocaleTimeString()} Joined new server: ${guild.name} with ${guild.memberCount} members.`)
})

client.on("message", async message => {
  // Cut out bots, non-prefix, and group chats/dms.
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  if(message.guild === null) return;

  let args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();
  let expr = args[0];

  // Set limit to responseCount[cmd]; -> limit
  let limit = responseCount[cmd];
  
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
        var embed = new Discord.RichEmbed()
          .setTitle("Webm Commands")
          .setDescription("Get a video of something, be it something retarded that ANTIFA did, something cute, \
          or just something to get your sides hurting. Wanna dance or just enjoy a nice cup of tea with calming music? I have it all.")
          .setAuthor(client.user.username, client.user.avatarURL)
          .addField(responseCount.antifa + ", !!antifa", "They do stupid shit.")
          .addField(responseCount.birb + ", !!birb", "BIRRRRRRRRRB.")
          .addField(responseCount.bongocat + ", !!bongocat", "This meme does not deserve to die. Ever.")
          .addField(responseCount.comphy + ", !!comphy", "Grab a nice cup of tea, a blanket, and get comphy.")
          .addField(responseCount.cool + ", !!cool", "This shit is fucking cool!")
          .addField(responseCount.cute + ", !!cute", "Cute shit.")
          .addField(responseCount.groovy + ", !!groovy", "Lets dance!")
          .addField(responseCount.iwanttodie + ", !!iwanttodie", "Of course you do. Everyone does.")
          .addField(responseCount.kek + ", !!kek", "Funny shit.")
          .addField(responseCount.reee + ", !!REEE", "People being autistic and REEEing.")
          .addField(responseCount.savagefuckingworld + ", !!savagefuckingworld", "It's a savage fucking world out there.")
          .addField(responseCount.windowsupdate + ", !!windowsupdate", "We all fucking hate it. Some more than others.")
          .addField(responseCount.youhaveautism + ", !!youhaveautism", "Yes, you do.")
          .addField("Note:", "You can use \"!![command] [Number]\" to see a specific webm. \
          Numbers above the number shown next to the command are ignored.")
          .setImage("https://raw.githubusercontent.com/llamasking/badboi/master/assets/rainbow.gif")
          .setColor(0x7289DA);
        message.channel.send({embed});

        var embed = new Discord.RichEmbed()
          .setTitle("Other Commands")
          .setDescription("All the other shit that I do that everyone else does better.")
          .setAuthor(client.user.username, client.user.avatarURL)
          .addField("!!cdate @user", "When was someone's account created?")
          .addField("!!ping", "How shitty is my DSL internet today? http://www.speedtest.net/result/7799955707")
          .addField("!!penis @user", "How long is that guy's dick? 100% accurate. Works on chicks. @user is required!")
          .setImage("https://raw.githubusercontent.com/llamasking/badboi/master/assets/rainbow.gif")
          .setColor(0x7289DA);
        message.channel.send({embed});
        break;
    }

     // Account Creation Date
    case "cdate": {
        message.channel.send(`${message.mentions.users.first().username}'s account was created on \`${message.mentions.users.first().createdAt}\`.`)
        break;
    }

     // Penis
    case "penis": {
      // 100% Fair. Not rigged at all. Totally fair! 

      /* 
       * Warn to @ person if not already done.
       * Slice <@530900836596056073> to one digit number.
       * Inititate shaft.
       * Add one = per length.
       * Send message.
      */ 

      if (expr == undefined) {
        message.reply("You need to @ someone.");
        break;
      }
      var length = expr.slice(12, -8);
      var shaft = "8"
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

    // Purge -- DISABLED
    case "purge": {
      //message.channel.bulkDelete(99);
      //break;
    }

    // Send response if nothing custom is set.
    default: {
      if (response === undefined) {
        console.log(`Time: ${new Date().toLocaleTimeString()} -- Sender ${message.author.username} -- Command: ${cmd} -- Arguments: ${args}`)
        return
      }
      message.channel.send(response)
        .catch(error => console.error(`Time: ${new Date().toLocaleTimeString()} Error: "${error}"`));
      break;
    }
  }

  // Logging <READ THE TERMS ON THE GITHUB REPO>
  console.log(`Time: ${new Date().toLocaleTimeString()} -- Sender ${message.author.username} -- Command: ${cmd} -- Arguments: ${args}`)
});

client.login(config.token);
