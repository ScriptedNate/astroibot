const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    //!addrole @andrew Dog Person
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry pal, you can't do that.");
  let rMember = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("Couldn't find that user, yo.");
  let role =  args.slice(1).join(" ");
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(g => g.name === role);
  if(!gRole) return message.reply("Couldn't find that role.");

  if(rMember.roles.has(gRole.id)) return message.reply("They already have that role.");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`Congrats, you have been given the role ${gRole.name}`)
  }catch(e){
    message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
  }
}

module.exports.help = {
  name: "addrole"
}



