const { SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mover")
    .setDescription(
      "Move todos os membros do canal de voz atual para outro canal."
    )
    .addChannelOption(
      (option) =>
        option
          .setName("canal_destino")
          .setDescription(
            "O canal de voz para onde mover os membros selecionados"
          )
          .setRequired(true)
          .addChannelTypes(ChannelType.GuildVoice) // Certifica que apenas canais de voz podem ser selecionados
    ),
  async execute(interaction) {
    // Verifica se o usuário está em um canal de voz
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply(
        "Você precisa estar em um canal de voz para usar este comando."
      );
    }

    // Pega o canal de voz de destino
    const targetChannel = interaction.options.getChannel("canal_destino");

    // Pega os membros no canal de voz
    const members = voiceChannel.members.map((member) => member);

    // Se o canal estiver vazio
    if (members.length === 0) {
      return interaction.reply("Não há pessoas no canal de voz para mover.");
    }

    // Move os membros para o canal de destino
    for (const member of members) {
      try {
        await member.voice.setChannel(targetChannel);
      } catch (error) {
        console.error(
          `Não foi possível mover ${member.user.displaName}: ${error}`
        );
      }
    }

    // Printa os nomes movidos no chat
    const memberUsernames = members
      .map((member) => member.user.displayName)
      .join(", ");
    await interaction.reply(
      `As seguintes pessoas foram movidas para ${targetChannel.name}: ${memberUsernames}`
    );
  },
};
