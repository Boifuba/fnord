const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Presence = require("../../schema/presence"); // Ajuste o caminho conforme necessário

module.exports = {
  data: new SlashCommandBuilder()
    .setName("top10")
    .setDescription("Lista os 10 usuários com mais pontos"),

  async execute(interaction) {
    try {
      // Obtém os 10 usuários com mais pontos
      const topUsers = await Presence.find().sort({ points: -1 }).limit(10);

      if (topUsers.length === 0) {
        return interaction.reply("Nenhum dado encontrado.");
      }

      // Obtém a guilda e seus membros
      const guild = interaction.guild;
      const members = await guild.members.fetch();

      // Formata a lista de usuários e pontos
      const topList = topUsers
        .map((user, index) => {
          // Encontra o membro correspondente na guilda
          const member = members.find((m) => m.user.id === user.userId);
          const displayName = member
            ? member.nickname || member.user.username
            : "Desconhecido";
          return `${index + 1}. ${displayName} - ${user.points} pontos`;
        })
        .join("\n");

      // Cria o embed
      const embed = new EmbedBuilder()
        .setTitle("Top 10 Usuários com Mais Pontos")
        .setDescription(topList)
        .setColor(0x00ff00); // Opcional: define uma cor para o embed

      // Envia o embed
      await interaction.reply({
        embeds: [embed],
      });
    } catch (err) {
      console.error(err);
      await interaction.reply("Ocorreu um erro ao buscar os dados.");
    }
  },
};
