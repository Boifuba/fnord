const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Cards = require("../../schema/card");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("listcards")
    .setDescription(
      "Lista todos os usuários com advertências, ordenados pelo número de advertências."
    ),

  async execute(interaction) {
    try {
      await handleListCards(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply(
        "❌ Ocorreu um erro ao listar os usuários com advertências."
      );
    }
  },
};

async function handleListCards(interaction) {
  try {
    const allUsers = await Cards.find().sort({ cards: -1 });

    if (allUsers.length === 0) {
      return await interaction.reply({
        content: "🔍 Não há usuários com advertências registradas.",
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Lista de Usuários com Advertências")
      .setDescription(
        allUsers
          .map((userData) => {
            const user = interaction.guild.members.cache.get(userData.user);
            return `**${
              user ? user.displayName : "Usuário não encontrado"
            }**: ${userData.cards} advertências`;
          })
          .join("\n")
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  } catch (error) {
    console.error(error);
    await interaction.reply(
      "❌ Ocorreu um erro ao listar os usuários com advertências."
    );
  }
}
