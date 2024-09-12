const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Cards = require("../../schema/card");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("maistotal")
    .setDescription(
      "Mostra o usuário com mais advertências totais e um top 3."
    ),

  async execute(interaction) {
    try {
      // Busca os 3 usuários com mais advertências totais
      const topUsers = await Cards.find().sort({ totalCards: -1 }).limit(3);

      if (topUsers.length === 0) {
        return await interaction.reply({
          content: "🔍 Não há usuários com advertências totais registradas.",
        });
      }

      // Encontra o primeiro usuário e os demais membros no servidor pelo ID
      const topUser = interaction.guild.members.cache.get(topUsers[0].user);
      const secondUser = topUsers[1]
        ? interaction.guild.members.cache.get(topUsers[1].user)
        : null;
      const thirdUser = topUsers[2]
        ? interaction.guild.members.cache.get(topUsers[2].user)
        : null;

      // Checa se o primeiro usuário foi encontrado
      if (!topUser) {
        return await interaction.reply({
          content: "❌ Usuário não encontrado no servidor.",
        });
      }

      // Cria o embed com os detalhes do primeiro usuário e a imagem
      const embed = new EmbedBuilder()
        .setColor("#ff0000")
        .setTitle(`Top 3 Membros criminosos!`)
        .setDescription(
          `O usuário **${topUser.displayName}** acha que é o Monark  e pode falar a merda que quiser!`
        )
        .setImage(topUser.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setTimestamp();

      // Adiciona o top 3 como um campo separado no embed
      embed.addFields({
        name: "🏆 Top 3 Usuários com mais advertências:",
        value: `
1. **${topUser.displayName}** - ${topUsers[0].totalCards} advertências
2. **${secondUser ? secondUser.displayName : "Nenhum"}** - ${
          topUsers[1] ? topUsers[1].totalCards : "N/A"
        } advertências
3. **${thirdUser ? thirdUser.displayName : "Nenhum"}** - ${
          topUsers[2] ? topUsers[2].totalCards : "N/A"
        } advertências`,
      });

      // Envia o embed para o canal (não ephemeral)
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply("❌ Ocorreu um erro ao buscar os dados.");
    }
  },
};
