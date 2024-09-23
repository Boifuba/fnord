const {
  SlashCommandBuilder,
  PermissionsBitField,
  ChannelType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("toggle_camera")
    .setDescription("Ativa ou desativa o uso de câmeras em todos os canais")
    .addBooleanOption((option) =>
      option
        .setName("permitir")
        .setDescription(
          "Escolha se deseja permitir (on) ou negar (off) o uso de câmeras"
        )
        .setRequired(true)
    ),

  async execute(interaction) {
    const permitir = interaction.options.getBoolean("permitir");
    const guild = interaction.guild;

    if (!guild) {
      return interaction.reply({
        content: "⛔ Não foi possível encontrar a guilda.",
        ephemeral: true,
      });
    }

    try {
      // Obter todos os canais da guilda
      const channels = guild.channels.cache;

      // Percorrer todos os canais e ajustar as permissões de câmera (vídeo)
      channels.forEach(async (channel) => {
        if (
          channel.type === ChannelType.GuildText ||
          channel.type === ChannelType.GuildVoice ||
          channel.type === ChannelType.GuildStageVoice
        ) {
          try {
            // Alterar as permissões de câmera (STREAM) para todos os membros (everyone)
            await channel.permissionOverwrites.edit(guild.roles.everyone, {
              [PermissionsBitField.Flags.Stream]: permitir, // Permissão de vídeo (câmera)
            });

            console.log(
              `🔄 Permissões de câmera ${
                permitir ? "permitidas" : "negadas"
              } no canal: ${channel.name}`
            );
          } catch (error) {
            console.error(
              `⛔ Falha ao modificar permissões no canal ${channel.name}:`,
              error.message
            );
          }
        }
      });

      // Responder a interação após a execução
      await interaction.reply({
        content: `Câmeras foram ${
          permitir ? "permitidas" : "negadas"
        } em todos os canais.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error("⛔ Erro ao atualizar permissões de câmera:", error);
      await interaction.reply({
        content: "⛔ Ocorreu um erro ao atualizar as permissões.",
        ephemeral: true,
      });
    }
  },
};
