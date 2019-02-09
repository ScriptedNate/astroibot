const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let embedbot = new Discord.RichEmbed()

    .setColor("#15f153")
    .setDescription("Bot Commands", "User Commands")
    .addField("Join our discord server for more info", "https://discord.gg/SDvdseP")
    .addField("**!help**", "List of commands and additional info")
    .addField("**!info**", "Information on the bot")
    .addField("**!hello**", "  will greet you!")
    .addField("**!serverinfo**", "Server Information")
    .addField("**!report**", "Report someone who has done something bad!" )
    .addField("**!ban**","Bans someone who broke the rules")
    .addField("**!kick**", "Kicks someone who broke the rules")
    .addField("**!ping**","Gives you your latency")
    .addField("**!tempmute**", "Mutes someone for a certain time")
    .addField("**!addrole**", "Adds a role")
    .addField("**!removerole**", "Removes a role")
    .addField("**!doggo**","shows a picture of a doggo")
    .addField("**!cat**", "shows a picture of a cat")
    .addField("**!8ball**", "Ask the bot a question and he will reply you the answer.")
    .addField("**!announce**", "The bot will announce something that you said")
    .addField("**!clear**","Clear words")
    .addField("**!prefix <prefix>**", "Changes the default prefix to the new prefix.");
  
    return message.channel.send(embedbot);
  }

module.exports.help = {
    name: "help"
}
