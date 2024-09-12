const mongoose = require("mongoose");
const wordWarning = require("./src/utils/wordWarning");
const checkAndUpdateRoles = require("./src/events/giveRolebyLvl");
const EventScheduler = require("./src/events/eventSchedulers"); // Importe o módulo de eventos

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
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
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

// Inicializa o gerenciador de eventos
const eventScheduler = new EventScheduler(client);

client.once("ready", () => {
  // Inicia o agendamento dos eventos
  eventScheduler.initEvents();
});

///
/////
///////

////////
//////////
client.on("messageReactionAdd", async (reaction, user) => {
  if (user.bot) return; // Ignora reações de bots

  console.log(
    `Reação adicionada: ${reaction.emoji.name} na mensagem ${reaction.message.id} por ${user.tag}`
  );

  const messageId = "1282826286229753897"; // Substitua pelo ID da mensagem
  const roleId = "1278136388767973470"; // Substitua pelo ID do cargo

  if (reaction.message.id === messageId) {
    const guild = reaction.message.guild;
    if (guild) {
      try {
        const member = await guild.members.fetch(user.id);
        if (member && !member.roles.cache.has(roleId)) {
          await member.roles.add(roleId);
          console.log(`Cargo adicionado a ${user.tag}`);
        }
      } catch (error) {
        console.error("Erro ao adicionar o cargo:", error);
      }
    } else {
      console.error("Guild não encontrada para a mensagem.");
    }
  }
});

client.on("messageReactionRemove", async (reaction, user) => {
  if (user.bot) return; // Ignora reações de bots

  console.log(
    `Reação removida: ${reaction.emoji.name} na mensagem ${reaction.message.id} por ${user.tag}`
  );

  const messageId = "1282826286229753897"; // Substitua pelo ID da mensagem
  const roleId = "1278136388767973470"; // Substitua pelo ID do cargo

  if (reaction.message.id === messageId) {
    const guild = reaction.message.guild;
    if (guild) {
      try {
        const member = await guild.members.fetch(user.id);
        if (member && member.roles.cache.has(roleId)) {
          await member.roles.remove(roleId);
          console.log(`Cargo removido de ${user.tag}`);
        }
      } catch (error) {
        console.error("Erro ao remover o cargo:", error);
      }
    } else {
      console.error("Guild não encontrada para a mensagem.");
    }
  }
});

//ADICIONAR O EMOJI PARA TER A PORRA DO CARALHO
client.once("ready", async () => {
  try {
    const channel = await client.channels.fetch("1140345961634353235"); // Substitua pelo ID do canal
    const message = await channel.messages.fetch("1282826286229753897"); // Substitua pelo ID da mensagem

    await message.react("👍"); // Substitua pelo emoji desejado
    console.log("Emoji adicionado à mensagem.");
  } catch (error) {
    console.error("Erro ao adicionar a reação:", error);
  }
});
