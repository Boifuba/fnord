const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionsBitField } = require("discord.js");
const Cards = require("../../schema/card"); // Ajuste o caminho conforme a sua estrutura de arquivos

module.exports = {
  data: new SlashCommandBuilder()
    .setName("habeascorpus")
    .setDescription("Remove a entrada de um usuário do banco de dados.")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setDescription("Usuário a ser removido do banco de dados.")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      // Verifica se o usuário que executa o comando é administrador
      if (
        !interaction.member.permissions.has(
          PermissionsBitField.Flags.Administrator
        )
      ) {
        return interaction.reply({
          content: "Você precisa ser administrador para usar este comando!",
          ephemeral: true, // Visível apenas para o usuário que executou o comando
        });
      }

      const user = interaction.options.getUser("usuário");

      // Tenta remover a entrada do usuário no banco de dados
      const result = await Cards.findOneAndDelete({ user: user.id });

      if (result) {
        await interaction.reply({
          content: `Entrada do usuário ${user.tag} removida com sucesso.`,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: `Nenhuma entrada encontrada para o usuário ${user.tag}.`,
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error("Erro ao processar o comando:", error);
      await interaction.reply({
        content: "Ocorreu um erro ao tentar remover a entrada.",
        ephemeral: true,
      });
    }
  },
};
