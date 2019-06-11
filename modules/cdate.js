/*
// Command: CDate
// Description: Find the date a user's account was created.
*/

module.exports = (message, expr) => {
    message.channel.send(`${message.mentions.users.first().username}'s account was created on \`${message.mentions.users.first().createdAt}\`.`);
}