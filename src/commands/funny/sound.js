const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

const {
  joinVoiceChannel,
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
  getVoiceConnection,
} = require("@discordjs/voice");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sound")
    .setDescription("test")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("ChooseS")
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async autocomplete(interaction) {
    const value = interaction.options.getString("query").toLowerCase();

    const currentDir = path.dirname(__dirname);

    const audioFiles = fs.readdirSync(
      path.join(currentDir, "../../src/sounds/")
    );

    const choices = audioFiles.map((audioFile) => {
      const fileParts = path.parse(audioFile);
      return fileParts.name;
    });

    const filtered = choices
      .filter((choice) => choice.toLowerCase().includes(value))
      .slice(0, 25);

    if (!interaction) return;

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },
  /////
  async execute(interaction) {
    const query = interaction.options.getString("query");
    const channel = interaction.member.voice.channel;
  
    if (!channel) {
      return interaction.followUp(
        "Você precisa estar em um canal de voz para usar este comando."
      );
    }
  
    let connection = getVoiceConnection(channel.guild.id);
  
    if (!connection) {
      connection = await joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
    }
  
    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      },
    });
  
    const audioFilePath = path.join(__dirname, `../../sounds/${query}.mp3`);
  
    const resource = createAudioResource(audioFilePath);
    connection.subscribe(player);
    player.play(resource);
  
    player.on("error", (error) => {
      console.error("Erro no player:", error);
    });
  
    player.on("stateChange", (oldState, newState) => {
      if (newState.status === "idle") {
        if (connection) {
          connection.destroy();
        }
      }
    });
  
    // Envie uma resposta inicial aqui
    await interaction.reply({ content: `*${query}*`, ephemeral: true });
  }
  
};

//save version
