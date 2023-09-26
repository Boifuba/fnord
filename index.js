const mongoose = require("mongoose"); //It's my database
const wordWarning = require("./src/utils/wordWarning"); //Warning system to badwords.
const handleMessage = require("./src/utils/wordtracker"); //A trackers to sniff the channel looking for words
const checkAndUpdateRoles = require("./src/events/giveRolebyLvl");
const eventHandler = require("./src/handlers/eventHandlers");
const youtube = require("./src/events/youtube");
const sanitizeDatabase = require("./src/utils/sanitizador");

const {
  Client,
  GatewayIntentBits,
  ActivityType,
  Collection,
} = require(`discord.js`);
const fs = require("fs");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

client.commands = new Collection();
//this will get the passwd and id. Those are hidden to public view. Check .env file on root.
require("dotenv").config();

const functions = fs
  .readdirSync("./src/functions")
  .filter((file) => file.endsWith(".js"));
const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");
(async () => {
  for (file of functions) {
    require(`./src/functions/${file}`)(client);
  }
  client.handleEvents(eventFiles, "./src/events");
  client.handleCommands(commandFolders, "./src/commands");
  client.login(process.env.token);
})();

client.login(process.env.TOKEN);

/*****************************************************
 ********************** Events ************************
 *****************************************************/

//wordTracking
client.on("messageCreate", handleMessage);

//Bad words
client.on("messageCreate", (message) => {
  wordWarning(message);
});

//autocomplete
client.on("interactionCreate", async (interaction) => {
  if (interaction.isAutocomplete()) {
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      return;
    }
    try {
      await command.autocomplete(interaction);
    } catch (err) {
      console.error(err);
    }
  }
});

// //Youtube checker
// client.once("ready", () => {
//   console.log(`✅ Youtube Announcer is runnning fine!`);
//   youtube.youtube(client);

//   setInterval(() => {
//     youtube.youtube();
//   }, 70 * 60 * 1000);
// });

//Mongoose connection
(async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_SRV);
    console.log(`✅ Mongoose is working`);

    client.login(process.env.TOKEN);
    eventHandler(client);
  } catch (error) {
    console.log(` ⛔ Connection error with mongoose: ${error}`);
  }
})();
checkAndUpdateRoles(client);

/*
func sanitizeDatabase()

This function is related to the word registration system. The word JSON is filled in manually 
and sometimes words that you don't want can enter the database. Whenever you feed the filter 
with new words, this function will iterate through the database looking for the filter words 
and delete them. It does not have a significant impact on resources if your server has few users. 
Only activate it when you are actively cleaning your filter. In the future, I will make a slash command 
for this, which is the right thing to do.
*/
client.once("ready", () => {
  setTimeout(async () => {
    await sanitizeDatabase();
  }, 10000);
});

//This need to me removed from here for aesthetics and functionalities
const membersList = [];

client.on("voiceStateUpdate", (oldState, newState) => {
  const guild = newState.guild;
  const channelID = "808369408241696818"; // ID do canal de voz desejado

  if (oldState.channelID === channelID && !newState.channelID) {
    // Membro saiu do canal de voz desejado
    const member = guild.members.cache.get(newState.id);
    if (member) {
      const index = membersList.indexOf(member);
      if (index !== -1) {
        membersList.splice(index, 1);
        console.log(
          `❌ ${member.user.username} saiu do canal de voz desejado.`
        );
      }
    }
  } else if (!oldState.channelID && newState.channelID === channelID) {
    // Membro entrou no canal de voz desejado
    const member = guild.members.cache.get(newState.id);
    if (member) {
      membersList.push(member);
      console.log(
        `✅ ${member.user.username} entrou no canal de voz desejado.`
      );
    }
  }
});

//pick presence


let status = [
  {
    name: "Tem regras para cavar buraco",
    type: ActivityType.Custom,
  },
  {
    name: "Sistema muito lento",
    type: ActivityType.Custom,
  },
  {
    name: "GURPS é difícil.",
    type: ActivityType.Custom,
  },
  {
    name: "Tem regra para tudo.",
    type: ActivityType.Custom,
  },
];
client.on("ready", (c) => {
  console.log(`✅ ActivityType is working.`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000);
});
