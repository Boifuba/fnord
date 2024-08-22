const { SlashCommandBuilder } = require("discord.js");
const Mural = require("../../schema/Message");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("msgdelete")
    .setDescription(
      "Deleta uma mensagem de um usuário pelo número da mensagem."
    )
    .addIntegerOption((option) =>
      option
        .setName("index")
        .setDescription("O número da mensagem que será deletada")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      await interaction.deferReply(); // Adia a resposta para evitar o erro "Unknown Interaction"

      const index = interaction.options.getInteger("index");
      const userId = interaction.user.id; // ID do usuário que executou o comando

      // Pesquisa o membro na guilda usando o ID do usuário
      let userData = await Mural.findOne({ userId: userId });

      if (!userData || userData.messages.length === 0) {
        await interaction.editReply("Nenhuma mensagem encontrada para você.");
        return;
      }

      // Verifica se o índice da mensagem existe
      const messageIndex = userData.messages.findIndex(
        (msg) => msg.index === index
      );

      if (messageIndex === -1) {
        await interaction.editReply(
          `Mensagem com índice ${index} não encontrada.`
        );
        return;
      }

      // Remove a mensagem
      userData.messages.splice(messageIndex, 1);

      // Atualiza os índices dos itens restantes
      userData.messages.forEach((msg, idx) => {
        msg.index = idx + 1;
      });

      await userData.save();

      await interaction.editReply(
        `Mensagem com índice ${index} deletada. Mensagens restantes:\n${userData.messages
          .map((msg) => `${msg.index} - *${msg.content}*`)
          .join("\n")}`
      );
    } catch (error) {
      console.error(error);

      if (interaction.deferred || interaction.replied) {
        await interaction.editReply("Ocorreu um erro ao deletar a mensagem.");
      } else {
        await interaction.reply("Ocorreu um erro ao deletar a mensagem.");
      }
    }
  },
};
