const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let coins = require("./coins.json");
let xp = require("./xp.json");
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 5;

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});
bot.on("ready", async () => {
    console.log(`Bot is online`);
bot.user.setActivity("3 Servers || !help !info",{type: "WATCHING"});
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  if(!coins[message.author.id]){
      coins[message.author.id] = {
        coins: 0
      };
    }

    let coinAmt = Math.floor(Math.random() * 15) + 1;
    let baseAmt = Math.floor(Math.random() * 15) + 1;
    console.log(`${coinAmt} ; ${baseAmt}`);

    if(coinAmt === baseAmt){
      coins[message.author.id] = {
        coins: coins[message.author.id].coins + coinAmt
      };
    fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
      if (err) console.log(err)
    });
    let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("#0000FF")
    .addField("💸", `${coinAmt} coins added!`);

    message.channel.send(coinEmbed).then(msg => {msg.delete(5000)});
    }

    let xpAdd = Math.floor(Math.random() * 7) + 8;
    console.log(xpAdd);

    if(!xp[message.author.id]){
      xp[message.author.id] = {
        xp: 0,
        level: 1
      };
    }


    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl = xp[message.author.id].level * 300;
    xp[message.author.id].xp =  curxp + xpAdd;
    if(nxtLvl <= xp[message.author.id].xp){
      xp[message.author.id].level = curlvl + 1;
      let lvlup = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setColor(purple)
      .addField("New Level", curlvl + 1);

      message.channel.send(lvlup).then(msg => {msg.delete(5000)});
    }
    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
      if(err) console.log(err)
    });
    let prefix = prefixes[message.guild.id].prefixes;
    if(!message.content.startsWith(prefix)) return;
    if(cooldown.has(message.author.id)){
      message.delete();
      return message.reply("You have to wait 5 seconds between commands.")
    }
    if(!message.member.hasPermission("ADMINISTRATOR")){
      cooldown.add(message.author.id);
//if(cmd === `${prefix}kick`){

//   //!kick @daeshan askin for it

//   let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
//   if(!kUser) return message.channel.send("Can't find user!");
//   let kReason = args.join(" ").slice(22);
//   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
//   if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

//   let kickEmbed = new Discord.RichEmbed()
//   .setDescription("~Kick~")
//   .setColor("#e56b00")
//   .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
//   .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
//   .addField("Kicked In", message.channel)
//   .addField("Time", message.createdAt)
//   .addField("Reason", kReason);

//   let kickChannel = message.guild.channels.find(`name`, "incidents");
//   if(!kickChannel) return message.channel.send("Can't find incidents channel.");

//   message.guild.member(kUser).kick(kReason);
//   kickChannel.send(kickEmbed);

//   return;
// }

// if(cmd === `${prefix}ban`){

//   let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  // if(!bUser) return message.channel.send("Can't find user!");
  // let bReason = args.join(" ").slice(22);
  // if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
  // if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
  //
  // let banEmbed = new Discord.RichEmbed()
  // .setDescription("~Ban~")
  // .setColor("#bc0000")
//   .addField("Banned User", `${bUser} with ID ${bUser.id}`)
//   .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
//   .addField("Banned In", message.channel)
//   .addField("Time", message.createdAt)
//   .addField("Reason", bReason);

//   let incidentchannel = message.guild.channels.find(`name`, "incidents");
//   if(!incidentchannel) return message.channel.send("Can't find incidents channel.");

//   message.guild.member(bUser).ban(bReason);
//   incidentchannel.send(banEmbed);


//   return;
// }

// if(cmd === `${prefix}serverinfo`){

//   let sicon = message.guild.iconURL;
//   let serverembed = new Discord.RichEmbed()
//   .setDescription("**Server Information**")
//   .setColor("#15f153")
//   .setThumbnail(sicon)
//   .addField("Server Name", message.guild.name)
//   .addField("Created On", message.guild.createdAt)
//   .addField("You Joined", message.member.joinedAt)
//   .addField("Total Members", message.guild.memberCount);


// return message.channel.send(serverembed);
// }



// if(cmd === `${prefix}help`){

//   let embedbot = new Discord.RichEmbed()

//   .setColor("#15f153")
//   .setDescription("Bot Commands", "User Commands")
//   .addField("Join our discord server for more info", "https://discord.gg/ytCCSNy")
//   .addField("**!help**", "List of commands and additional info")
//   .addField("**!info**", "Information on the bot")
//   .addField("**!hello**", "Astroi will greet you!")
//   .addField("**!serverinfo**", "Server Information")
//   .addField("**!report**", "Report someone who has done something bad!" )
//   .addField("**!ban**","Bans someone who broke the rules")
//   .addField("**!kick**", "Kicks someone who broke the rules")
//   .addField("**!ping**","Pongs you back!");

//   return message.author.send(embedbot);
// }



// if(cmd === `${prefix}ping`){
//   return message.channel.send(`Pong! :ping_pong:`)
// }



// if(cmd === `${prefix}info`){

//   let bicon = bot.user.displayAvatarURL;
//   let botembed = new Discord.RichEmbed()
//   .setDescription("Bot Information")
//   .setColor("#15f153")
//   .addField("Bot Name", bot.user.username)
//   .addField("Help", "!help")
//   .addField("Creator", "astrovibes#8096/Pyrotenics")
//   .addField("Discord", "https://discord.gg/ytCCSNy")
//   .addField("Created On", bot.user.createdAt)
//   .setThumbnail(bicon);

//  return message.channel.send(botembed);
// }
// if(cmd === `${prefix}hello`){
//    return message.channel.send(`Hello, Nice to meet you buddy! ${message.author}`);
//   }

setTimeout(() => {
   cooldown.delete(message.author.id)
 }, cdseconds * 1000)

});

});
bot.login(process.env.BOT_TOKEN);
