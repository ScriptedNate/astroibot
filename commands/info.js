const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
      let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("Bot Information")
  .setColor("#15f153")
  .addField("Bot Name", bot.user.username)
  .addField("Help", "!help")
  .addField("Creator", "astrovibes#8096/Pyrotenics")
  .addField("Discord", "https://discord.gg/ytCCSNy")
  .addField("Created On", bot.user.createdAt)
  .setThumbnail(bicon);

  message.channel.send(botembed)
}
module.exports.help = {
    name: "info"
}
