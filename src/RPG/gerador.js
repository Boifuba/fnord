const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gerador")
    .setDescription("Gerador")
    .addNumberOption((option) =>
      option
        .setName("base")
        .setDescription("Informe a quantidade de dados d6.")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("d6")
        .setDescription("Informe multiplicador.")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("mult")
        .setDescription("Informe multiplicador.")
        .setRequired(true)
    ),

  async execute(interaction) {
    let d6 = interaction.options.getNumber("d6");
    let mult = interaction.options.getNumber("mult");
    let base = interaction.options.getNumber("base");

    // Cria variáveis
    let soma = 0;
    let resultado = 0;

    var dados = [];
    // Calcula o resultado

    // Cria o array de dados
    for (let i = 1; i <= d6; i++) {
      dados.push(Math.floor(Math.random() * 6) + 1);
    }

    const somaDados = dados.reduce((a, b) => a + b, 0);

    console.log("somaDados:" + somaDados);
    console.log("mult" + mult);
    resultado = somaDados * mult + base;
    console.log("resultado:" + resultado);

    // Cria o embed
    const embed = new EmbedBuilder()
      .setColor("Yellow")
      .setTitle(`Você tem ${resultado} pontos.`)
      .setDescription(
        ` [${dados}] = ${somaDados} x ${mult} + ${base}= ${resultado}`
      );

    // Envia o embed
    await interaction.reply({ embeds: [embed] });
  },
};
