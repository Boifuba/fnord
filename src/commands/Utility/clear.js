const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("limpar")
    .setDescription("Limpa mensagens do chat.")
    .addIntegerOption((option) =>
      option
        .setName("quantidade")
        .setDescription("Quantidade de mensagens a serem apagadas.")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      const quantidade = interaction.options.getInteger("quantidade");
      const channel = interaction.channel;

      // Deferir a resposta inicial para evitar erros de timeout
      await interaction.deferReply({ ephemeral: true });

      const messages = await channel.messages.fetch({ limit: quantidade });

      // Filtra as mensagens que têm menos de 14 dias de idade
      const mensagensParaExcluir = messages.filter((msg) => {
        const diff = Date.now() - msg.createdTimestamp;
        const days = diff / (1000 * 60 * 60 * 24);
        return days < 14;
      });

      // Exclui as mensagens individualmente
      await channel.bulkDelete(mensagensParaExcluir);

      await interaction.editReply(
        `${mensagensParaExcluir.size} mensagens foram apagadas por ${interaction.user}.`
      );
    } catch (error) {
      console.error(error);
      await interaction.followUp({
        content: "Houve um erro ao executar este comando!",
        ephemeral: true,
      });
    }
  },
};
