/*
// Command: Penis
// Description: 100% Fair. Not rigged at all. Totally fair! 
*/

module.exports = (message, expr) => {
    /* 
    * Warn to @ person if not already done.
    * Slice ID <@530900836596056073> to one digit number.
    * Inititate shaft.
    * Add one = per length.
    * Send message.
    */ 

    if (expr == undefined) {
        message.reply("You need to @ someone.");
        return;
    }

    var length = expr.substring(12, 13)
    var shaft = "8";
    for(length > 0; length--;) var shaft = shaft + "==";
    message.channel.send(shaft + "D \n``This is 100% accurate.``")
}

