const mongoose = require("mongoose");
const wordWarning = require("./src/utils/wordWarning"); // Importe a função wordFilter, ajuste o caminho conforme necessário
const handleMessage = require("./src/utils/wordtracker");
const checkAndUpdateRoles = require("./src/events/giveRolebyLvl");
const eventHandler = require("./src/handlers/eventHandlers");
const youtube = require("./src/events/youtube");
const sanitizeDatabase = require("./src/utils/sanitizador");
const Level = require("./src/schema/Level");

const {
  Client,
  GatewayIntentBits,
  Collection,
  ActivityType,
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
//wordTracking
client.on("messageCreate", handleMessage);

// Evento `messageCreate`
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

/////YOUTUBE
client.once("ready", () => {
  console.log(`✅ Youtube Announcer is runnning fine!`);
  youtube.youtube(client);

  setInterval(() => {
    youtube.youtube();
  }, 60 * 60 * 1000);
});

let status = [
  {
    name: "O quê você deve pensar.",
    type: ActivityType.Streaming,
  },
  {
    name: "Verdades no mundo!",
    type: ActivityType.Custom,
  },
  {
    name: "Você.",
    type: ActivityType.Watching,
  },
  {
    name: "Seus pensamentos.",
    type: ActivityType.Listening,
  },
];
client.on("ready", (c) => {
  console.log(`✅ ActivityType is working.`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 180 * 60 * 1000);
});

client.login(process.env.TOKEN);

(async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGODB_SRV);
    console.log(`✅ Mongoose is working`);

    client.login(process.env.TOKEN);
    eventHandler(client);
  } catch (error) {
    console.log(` ⛔ Erro de conexão do mongoose: ${error}`);
  }
})();


client.once("ready", () => {
  setTimeout(async () => {
    await sanitizeDatabase();
  }, 10000);
});

// const membersList = [];

// client.on("voiceStateUpdate", (oldState, newState) => {
//   const guild = newState.guild;
//   const channelID = "808369408241696818"; // ID do canal de voz desejado

//   if (oldState.channelID === channelID && !newState.channelID) {
//     // Membro saiu do canal de voz desejado
//     const member = guild.members.cache.get(newState.id);
//     if (member) {
//       const index = membersList.indexOf(member);
//       if (index !== -1) {
//         membersList.splice(index, 1);
//         console.log(
//           `❌ ${member.user.username} saiu do canal de voz desejado.`
//         );
//       }
//     }
//   } else if (!oldState.channelID && newState.channelID === channelID) {
//     // Membro entrou no canal de voz desejado
//     const member = guild.members.cache.get(newState.id);
//     if (member) {
//       membersList.push(member);
//       console.log(
//         `✅ ${member.user.username} entrou no canal de voz desejado.`
//       );
//     }
//   }
// });
// client.on("ready", () => {
//   function checkOnlineUsers() {
//     console.log("🔼 Checking online users");

//     const xpToGive = 1;
//     const guild = client.guilds.cache.get("721359044383866971");
//     const channel = guild.channels.cache.get("808369408241696818");

//     if (channel.type !== 2) return; // Verifique se o canal é um canal de voz

//     channel.members.each(async (member) => {
//       // Verifica se o usuário entrou no canal de voz desejado
//       const query = {
//         userId: member.user.id,
//         guildId: guild.id,
//       };

//       try {
//         const level = await Level.findOne(query);

//         if (level) {
//           level.xp += xpToGive;
//           await level.save();
//           console.log(
//             `✅ ${member.user.displayName} ganhou ${xpToGive} XP por entrar no canal de voz desejado.`
//           );
//         } else {
//           const newLevel = new Level({
//             userId: member.user.id,
//             guildId: guild.id,
//             xp: xpToGive,
//           });

//           await newLevel.save();
//           console.log(
//             `✅ ${member.user.displayName} ganhou ${xpToGive} XP por entrar no canal de voz desejado.`
//           );
//         }
//       } catch (error) {
//         console.log(`⛔ Error giving xp: ${error}`);
//       }
//     });
//   }

//   // Executa a função a cada 10 minutos (10000 milissegundos)
//   setInterval(async () => {
//     await checkOnlineUsers();
//   }, 10000);
// });


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
client.on("ready", () => {
  function checkOnlineUsers() {
    console.log("🔼 Checking online users");

    const xpToGive = 1;
    const guild = client.guilds.cache.get("721359044383866971");
    const channel = guild.channels.cache.get("808369408241696818");

    if (channel.type !== 2) return; // Verifique se o canal é um canal de voz

    channel.members.each(async (member) => {
      // Verifica se o usuário entrou no canal de voz desejado
      const query = {
        userId: member.user.id,
        guildId: guild.id,
      };

      try {
        const level = await Level.findOne(query);

        if (level) {
          level.xp += xpToGive;
          await level.save();
          console.log(
            `✅ ${member.user.displayName} ganhou ${xpToGive} XP por entrar no canal de voz desejado.`
          );
        } else {
          const newLevel = new Level({
            userId: member.user.id,
            guildId: guild.id,
            xp: xpToGive,
          });

          await newLevel.save();
          console.log(
            `✅ ${member.user.displayName} ganhou ${xpToGive} XP por entrar no canal de voz desejado.`
          );
        }
      } catch (error) {
        console.log(`⛔ Error giving xp: ${error}`);
      }
    });
  }

  // Executa a função a cada 10 minutos (10000 milissegundos)
  setInterval(async () => {
    await checkOnlineUsers();
  }, 600000);
});
