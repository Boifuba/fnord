const mongoose = require("mongoose");
const wordWarning = require("./src/utils/wordWarning");
const checkAndUpdateRoles = require("./src/events/giveRolebyLvl");
const eventHandler = require("./src/handlers/eventHandlers");
const cowsay = require("cowsay");
const xpToGive = require("./src/events/giveUserXp");
const checkAndRemoveRole = require("./src/functions/removeRoleCards");
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

// Seu código de obtenção de comandos...
const commandsList = client.commands
  .map((command) => `- ${command.data.name}`)
  .join("\n");

const cowText = `${commandsList}`;
const cowOptions = {
  e: "cO",
  T: " U",
  //f: "cow"
};

console.log(
  cowsay.think({
    text: cowText,
    ...cowOptions,
  })
);

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
    client.on("someEvent", async (member) => {
      // 'someEvent' pode ser o evento que deseja usar
      const roleId = "1146369948613103627"; // Substitua pelo ID do cargo que deseja adicionar
      await checkAndAddRole(member, roleId);
    });
  }
})();

checkAndUpdateRoles(client);

const welcomeEvent = require("./src/events/welcomeEvent");
client.on("guildMemberAdd", (member) => {
  welcomeEvent(member);
});
const logAddEvent = require("./src/events/logAdd");
client.on("guildMemberAdd", (member) => {
  logAddEvent(member);
});

const guildMemberRemove = require("./src/events/logRemove");
client.on("guildMemberRemove", (member) => {
  guildMemberRemove(member);
});

//log de entrada em canal, nada haver com o sistema de xp

// client.on("voiceStateUpdate", (oldState, newState) => {
//   if (!oldState.channel && newState.channel) {
//     console.log(
//       `🔥 ${newState.member.user.displayName} is on: ${newState.channel.name}`
//     );
//   }
// });
const roleId = "1275620987257229322"; // Substitua pelo ID real do cargo

client.on("messageCreate", async (message) => {
  xpToGive(client, message);
  await checkAndRemoveRole(client, roleId);
});

// client.once("ready", () => {
//   console.log(`Bot logado como ${client.user.tag}`);
// });
