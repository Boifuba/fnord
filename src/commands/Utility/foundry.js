const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const todayGame = require("../../utils/diaDaSemana");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("foundry")
    .setDescription("Mostra a URL do FoundryVTT"),
  async execute(interaction) {
    const { todayImg, todayThumbnail, todayText, todayTitle, todayTime } =
      todayGame();

    const exampleEmbed = new EmbedBuilder()
      .setImage(todayImg)
      .setDescription(todayText)
      .setURL("https://campanhasdoboi.com.br/game")
      .setColor(todayColor)
      .setTitle(todayTitle)
      .addFields(todayTime);

    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
