const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wiper")
    .setDescription("NÃO USE ISSO SE NÃO SOUBER DO QUÊ SE TRATA."),
  async execute(interaction) {
    // xereca se quem tá rodando é admin. É um redundância com a proteção do discord.
    try {
      if (
        !interaction.member.permissions.has(
          PermissionsBitField.Flags.Administrator
        )
      ) {
        return interaction.reply({
          content: "Precisa ser admin para usar este comando!",
          ephemeral: true,
        });
      }

      // Obtém os canais de voz do servidor
      const voiceChannels = interaction.guild.channels.cache.filter(
        (channel) => channel.type === 2
      ); // type 2 é canal de voz

      if (voiceChannels.size === 0) {
        return interaction.reply({
          content: "Não há canais de voz para duplicar!",
          ephemeral: true,
        });
      }

      await interaction.deferReply(); // Adia a resposta para evitar expiração

      try {
        for (const [channelId, voiceChannel] of voiceChannels) {
          await interaction.guild.channels.create({
            name: voiceChannel.name,
            type: 2, // 2 = Tipo de canal de voz
            bitrate: voiceChannel.bitrate,
            userLimit: voiceChannel.userLimit,
            parent: voiceChannel.parent, // Coloca o canal na mesma hierarquia para ficar com a organização anterior
            permissionOverwrites: voiceChannel.permissionOverwrites.cache.map(
              (overwrite) => ({
                id: overwrite.id,
                allow: overwrite.allow.toArray(),
                deny: overwrite.deny.toArray(),
              })
            ),
          });

          await voiceChannel.delete();
        }

        await interaction.editReply({
          content:
            "Os canais foram duplicados e deletados corretamente, verifique manualmente!",
        });
      } catch (error) {
        console.error("Erro ao duplicar e deletar canais:", error);
        await interaction.editReply(
          "Ocorreu um erro ao duplicar os canais de voz."
        );
      }
    } catch (error) {
      console.error("Erro ao processar interação:", error);
      if (!interaction.replied) {
        await interaction.reply("Ocorreu um erro ao processar seu comando.");
      }
    }
  },
};
