const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear chat messages.")
    .addIntegerOption((option) =>
      option
        .setName("qtd")
        .setDescription("Insert how many messages you want to delete.")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      const quantidade = interaction.options.getInteger("qtd");
      const channel = interaction.channel;

      // Deferir a resposta inicial para evitar erros de timeout
      await interaction.deferReply({ ephemeral: true });

      // Verifica se a quantidade é maior que 100
      if (quantidade > 100) {
        return await interaction.editReply(
          "You can only delete up to 100 messages at a time."
        );
      }

      // Busca as mensagens no canal, limitando ao número solicitado
      const messages = await channel.messages.fetch({ limit: quantidade });

      // Filtra as mensagens que têm menos de 14 dias de idade
      const mensagensParaExcluir = messages.filter((msg) => {
        const diff = Date.now() - msg.createdTimestamp;
        const days = diff / (1000 * 60 * 60 * 24);
        return days < 14;
      });

      // Exclui as mensagens filtradas
      if (mensagensParaExcluir.size > 0) {
        // Realmente exclui as mensagens e retorna o número de mensagens excluídas
        const deletedMessages = await channel.bulkDelete(
          mensagensParaExcluir,
          true
        );
        await interaction.editReply(
          `${deletedMessages.size} messages were deleted successfully.`
        );
      } else {
        await interaction.editReply(
          "No messages to delete that are less than 14 days old."
        );
      }
    } catch (error) {
      console.error(error);
      await interaction.followUp({
        content: "Something went wrong!",
        ephemeral: true,
      });
    }
  },
};
