/*
// Command: Help
// Description: Supplying a list of bot commands.
*/

const Discord = require("discord.js");
const responseCount = require("../responseCount.json");

module.exports = (message, expr) => {

    if (expr = "meme" || "memes") {
        var embed = new Discord.RichEmbed()
            .setTitle("Webm Commands")
            .setDescription("Get a video of something, be it something retarded that ANTIFA did, something cute, \
            or just something to get your sides hurting. Wanna dance or just enjoy a nice cup of tea with calming music? I have it all.")
            .addField(responseCount.antifa + ", !!meme antifa", "They do stupid shit.")
            .addField(responseCount.birb + ", !!meme birb", "BIRRRRRRRRRB.")
            .addField(responseCount.bongocat + ", !!meme bongocat", "This meme does not deserve to die. Ever.")
            .addField(responseCount.comphy + ", !!meme comphy", "Grab a nice cup of tea, a blanket, and get comphy.")
            .addField(responseCount.cool + ", !!meme cool", "This shit is fucking cool!")
            .addField(responseCount.cute + ", !!meme cute", "Cute shit.")
            .addField(responseCount.groovy + ", !!meme groovy", "Lets dance!")
            .addField(responseCount.iwanttodie + ", !!meme iwanttodie", "Of course you do. Everyone does.")
            .addField(responseCount.kek + ", !!meme kek", "Funny shit.")
            .addField(responseCount.reee + ", !!meme REEE", "People being autistic and REEEing.")
            .addField(responseCount.savagefuckingworld + ", !!meme savagefuckingworld", "It's a savage fucking world out there.")
            .addField(responseCount.windowsupdate + ", !!meme windowsupdate", "We all fucking hate it. Some more than others.")
            .addField(responseCount.youhaveautism + ", !!meme youhaveautism", "Yes, you do.")
            .setFooter("Note: You can use \"!!meme [command] [Number]\" to see a specific webm. \
            Numbers above the number shown next to the command are ignored.")
            .setImage("https://raw.githubusercontent.com/llamasking/badboi/master/assets/rainbow.gif")
            .setColor(0x7289DA);
        message.channel.send({embed});
    } else {
        var embed = new Discord.RichEmbed()
            .setTitle("Commands")
            .setDescription("All the other shit that I do that everyone else does better.")
            .addField("!!cdate @user", "When was someone's account created?")
            .addField("!!meme", "Send me memes. Requires categories. Use !!help meme to list.")
            .addField("!!ping", "How shitty is my DSL internet today? http://www.speedtest.net/result/7799955707")
            .addField("!!penis @user", "How long is that guy's dick? 100% accurate. Works on chicks. @user is required!")
            .setImage("https://raw.githubusercontent.com/llamasking/badboi/master/assets/rainbow.gif")
            .setColor(0x7289DA)
            .setFooter("If you ever run into issues, feel free to join the support server. https://discord.gg/zFxjHYp")
        message.channel.send({embed});
    }
}
