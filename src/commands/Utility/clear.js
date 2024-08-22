const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear chat messages.")
    .addIntegerOption((option) =>
      option
        .setName("qty")
        .setDescription("Insert how many messages you want to delete.")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      const quantidade = interaction.options.getInteger("qty");
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
        `${mensagensParaExcluir.size} mmessages was deleted by ${interaction.user}.`
      );
    } catch (error) {
      console.error(error);
      await interaction.followUp({
        content: "Something went wrong!",
        ephemeral: true,
      });
    }
  },
};
