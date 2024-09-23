const mongoose = require("mongoose");
const wordWarning = require("./src/utils/wordWarning");
const checkAndUpdateRoles = require("./src/events/giveRolebyLvl");
const EventScheduler = require("./src/events/eventSchedulers");
const eventHandler = require("./src/handlers/eventHandlers");
const cowsay = require("cowsay");
const xpToGive = require("./src/events/giveUserXp");
const checkAndRemoveRole = require("./src/functions/removeRoleCards");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const voiceChannelJoinHandler = require("./src/events/isOnline"); // Ajuste o caminho conforme necessário

const fs = require("fs");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.commands = new Collection();

const functions = fs
  .readdirSync("./src/functions")
  .filter((file) => file.endsWith(".js"));
const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

// Função para inicializar o bot
(async () => {
  try {
    // Carregar funções
    for (const file of functions) {
      require(`./src/functions/${file}`)(client);
    }

    // Carregar eventos e comandos
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");

    // Log dos eventos carregados
    eventFiles.forEach((file) => {
      console.log(`- ${file}`);
    });

    // Conectar ao MongoDB
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_SRV);
    console.log(`💾 Conectado ao MongoDB`);

    // Logar o bot no Discord
    await client.login(process.env.TOKEN);
    console.log(`🔥 ${client.user.displayName} está online!`);

    // Inicializar os event handlers
    eventHandler(client);
  } catch (error) {
    console.error(`⛔ Erro durante a inicialização: ${error}`);
  }
})();

/*****************************************************
 ********************** Events ************************
 *****************************************************/

// Comandos
const commandsList = client.commands
  .map((command) => `- ${command.data.name}`)
  .join("\n");

const cowText = `${commandsList}`;
const cowOptions = {
  e: "cO",
  T: " U",
};

console.log(
  cowsay.think({
    text: cowText,
    ...cowOptions,
  })
);

// Monitorar mensagens para palavras proibidas
client.on("messageCreate", (message) => {
  wordWarning(message);
});

// Autocomplete para comandos
client.on("interactionCreate", async (interaction) => {
  if (interaction.isAutocomplete()) {
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.autocomplete(interaction);
    } catch (err) {
      console.error(err);
    }
  }
});

// Eventos de membro adicionado
const welcomeEvent = require("./src/events/welcomeEvent");
const logAddEvent = require("./src/events/logAdd");
client.on("guildMemberAdd", (member) => {
  welcomeEvent(member);
  logAddEvent(member);
});

// Evento de membro removido
const guildMemberRemove = require("./src/events/logRemove");
client.on("guildMemberRemove", (member) => {
  guildMemberRemove(member);
  console.log("🔥 Evento de Log rodando");
});

// Atribuição e remoção de cargos e sistema de XP
const roleId = "1275620987257229322"; // Substitua pelo ID real do cargo

client.on("messageCreate", async (message) => {
  xpToGive(client, message);
  await checkAndRemoveRole(client, roleId);
});

// Função para checar e atualizar roles
checkAndUpdateRoles(client);

// Log de erro para login do bot
client.login(process.env.TOKEN).catch((err) => {
  console.error("Erro ao logar o bot:", err);
});

client.on("voiceStateUpdate", (oldState, newState) => {
  if (!oldState.channel && newState.channel) {
    // O membro entrou em um canal de voz
    voiceChannelJoinHandler(newState.member);
  }
});
