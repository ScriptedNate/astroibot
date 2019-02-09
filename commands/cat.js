const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot,message,args) =>{
    let {body} = await superagent
.get('https://aws.random.cat//meow');

let dogembed = new Discord.RichEmbed()
.setColor("#f20206")
.setTitle("Cat :cat:")
.setImage(body.file);

message.channel.send(dogembed);

}

module.exports.help = {
    name: "cat"

}