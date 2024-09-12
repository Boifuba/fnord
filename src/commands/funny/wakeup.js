const { SlashCommandBuilder, ChannelType } = require("discord.js");

const ORIGEM_ID = "1283469968037384305"; // ID fixo da sala de origem

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wakeup")
    .setDescription("Move o usuário 5 vezes rapidamente entre duas salas.")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setDescription("Usuário que será movido")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("destino")
        .setDescription("Escolha a sala de destino")
        .setRequired(true)
        .setAutocomplete(true)
    ), // Agora usando autocomplete para listar as salas de voz

  async execute(interaction) {
    const usuario = interaction.options.getUser("usuário");
    const destinoNome = interaction.options.getString("destino");
    const member = await interaction.guild.members.fetch(usuario.id);

    if (!member.voice.channel) {
      return interaction.reply({
        content: "Este usuário não está em um canal de voz!",
        ephemeral: true,
      });
    }

    // Busca o canal de destino pelo nome
    const destino = interaction.guild.channels.cache.find(
      (channel) =>
        channel.name === destinoNome && channel.type === ChannelType.GuildVoice
    );
    if (!destino) {
      return interaction.reply({
        content: "Não foi encontrada uma sala de voz com esse nome!",
        ephemeral: true,
      });
    }

    const origem = interaction.guild.channels.cache.get(ORIGEM_ID);
    if (!origem || origem.type !== ChannelType.GuildVoice) {
      return interaction.reply({
        content: "A sala de origem fixa é inválida ou não é uma sala de voz!",
        ephemeral: true,
      });
    }

    await interaction.reply(
      `Movendo ${usuario.username} rapidamente entre as salas...`
    );

    for (let i = 0; i < 3; i++) {
      try {
        await member.voice.setChannel(destino.id);
        await new Promise((resolve) => setTimeout(resolve, 500));
        await member.voice.setChannel(origem.id);
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error(error);
        return interaction.followUp({
          content: `Ocorreu um erro ao mover o usuário: ${error.message}`,
          ephemeral: true,
        });
      }
    }

    interaction.followUp(`${usuario.username} foi chacoalhado entre as salas`);
  },

  // Função para autocomplete que lista todas as salas de áudio do servidor
  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();
    const channels = interaction.guild.channels.cache
      .filter((channel) => channel.type === ChannelType.GuildVoice) // Filtra apenas canais de voz
      .map((channel) => ({ name: channel.name, value: channel.name }));

    const filtered = channels.filter((channel) =>
      channel.name.toLowerCase().startsWith(focusedValue.toLowerCase())
    );

    await interaction.respond(
      filtered.slice(0, 25) // Limita o autocomplete a 25 opções
    );
  },
};
