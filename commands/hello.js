const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
       return message.channel.send(`Hello, Nice to meet you ${message.author}!`);
  }

  module.exports.help = {
    name: "hello"
}
