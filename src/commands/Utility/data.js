const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("date")
    .setDescription("Captura a data")
    .addNumberOption((option) =>
      option
        .setName("year")
        .setDescription("Informe o ano desejado")
        .setRequired(true)
    ),
  async execute(interaction) {
    const year = interaction.options._hoistedOptions[0].value;
    const apiUrl = `http://numbersapi.com/${year}/year?fragment`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Falha na solicitação à API");
      }

      const data = await response.text();
      console.log("Conteúdo da API:", data);

      await interaction.reply(`${data} `);
    } catch (error) {
      console.error(error);
    }
  },
};
