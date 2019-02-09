const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    //!8ball <question fjfjfjfjjf>
    if(!args[2]) return message.reply("Please ask a full question!");
    let replies = ["Yes.", "No.", "I don't know.", "Ask again later", "Maybe"];

    let result = Math.floor((Math.random() * replies.length))
    let question = args.slice(0).join(" ");

    let ballembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("#00a5ff")
    .addField("Question", question)
    .addField("Answer", replies[result]);

    message.channel.send(ballembed);



}

module.exports.help = {
    name: "8ball"
}