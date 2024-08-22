const { SlashCommandBuilder } = require("discord.js");
const Mural = require("../../schema/Message");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("msgclear")
    .setDescription("Deleta todas as mensagens de um usuário.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("O usuário cujas mensagens serão deletadas")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      await interaction.deferReply(); // Adia a resposta para evitar o erro "Unknown Interaction"

      const user = interaction.options.getUser("user");

      // Pesquisa o membro na guilda usando o ID do usuário
      const member = await interaction.guild.members.fetch(user.id);
      const displayName = member.displayName;

      let userData = await Mural.findOne({ userId: user.id });

      if (!userData || userData.messages.length === 0) {
        await interaction.editReply(
          `Nenhuma mensagem encontrada para ${displayName}.`
        );
        return;
      }

      // Remove todas as mensagens do usuário
      userData.messages = [];
      await userData.save();

      await interaction.editReply(
        `Todas as mensagens foram deletadas para ${displayName}.`
      );
    } catch (error) {
      console.error(error);

      if (interaction.deferred || interaction.replied) {
        await interaction.editReply("Ocorreu um erro ao deletar as mensagens.");
      } else {
        await interaction.reply("Ocorreu um erro ao deletar as mensagens.");
      }
    }
  },
};
