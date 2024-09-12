const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// Função para rolar um dado de seis lados
function rolarD6() {
    return Math.floor(Math.random() * 6) + 1;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Rola contra o NH")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("nh")
        .setDescription("Roll against NH")
        .addNumberOption((option) =>
          option
            .setName("query")
            .setDescription("Informe o nível de habilidade")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("dices")
        .setDescription("Roll d6")
        .addNumberOption((option) =>
          option
             .setName("query")
             .setDescription("How many d6?")
             .setRequired(true)
        )
    ),
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();


    if (subcommand === "nh") {
      const embed = new EmbedBuilder();

      const nh = interaction.options.getNumber("query");
      var dado1 = Math.floor(Math.random() * 6) + 1;
      var dado2 = Math.floor(Math.random() * 6) + 1;
      var dado3 = Math.floor(Math.random() * 6) + 1;
      var roll = dado1 + dado2 + dado3;

      if (roll < nh && roll !== 16 && roll !== 17 && roll <= nh - 10) {
        embed
          .setColor("Yellow")
          .setThumbnail("https://i.imgur.com/Iso6SyT.png")
          .setTitle("Sucesso Decisivo!")
          .addFields({
            name: `Resultado:`,
            value: `\nVocê rolou contra ${nh} e tirou um **sucesso decisivo** na rolagem! \n*${dado1}* + *${dado2}* + *${dado3}* = **${roll}**`,
            inline: true,
          });
      } else if (roll < nh && (roll === 16 || roll === 17)) {
        embed
          .setColor("White")
          .setThumbnail("https://i.imgur.com/PjQkhE8.png")
          .setTitle("Falhou!")
          .addFields({
            name: `Resultado:`,
            value: `\nVocê rolou contra ${nh} e *falhou* na rolagem! \n*${dado1}* + *${dado2}* + *${dado3}* = **${roll}**`,
            inline: true,
          });
      } else if (roll === 18) {
        embed
          .setColor("Black")
          .setThumbnail("https://i.imgur.com/PWWFewM.png")
          .setTitle("Crítico")
          .addFields({
            name: `Resultado:`,
            value: `\nVocê rolou contra ${nh} e tirou um *Crítico* na rolagem! \n*${dado1}* + *${dado2}* + *${dado3}* = **${roll}**`,
            inline: true,
          });
      } else if (roll > nh) {
        embed
          .setColor("Red")
          .setThumbnail("https://i.imgur.com/w4j2xUx.png")
          .setTitle("Falha")
          .addFields({
            name: `Resultado:`,
            value: `\nVocê rolou contra ${nh} e tirou uma *Falha* na rolagem! \n*${dado1}* + *${dado2}* + *${dado3}* = **${roll}**`,
            inline: true,
          });
      } else {
        embed
          .setColor("Green")
          .setThumbnail("https://i.imgur.com/VJPhbAX.png")
          .setTitle("Sucesso")
          .addFields({
            name: `Resultado:`,
            value: `\nVocê rolou contra ${nh} e teve *Sucesso* na rolagem! \n*${dado1}* + *${dado2}* + *${dado3}* = **${roll}**`,
            inline: true,
          });
      }

      await interaction.reply({ embeds: [embed] });
    }

    if (subcommand === "dices") {
      const embed = new EmbedBuilder();
      const qtd = interaction.options.getNumber("query");

      const resultados = [];
      let somaResultados = 0;

      for (let i = 0; i < qtd; i++) {
          const resultado = rolarD6();
          resultados.push(resultado);
          somaResultados += resultado;
      }

      let resultadoFormatado = resultados.join(" + ");
      embed
        .setColor("Green")
        .setThumbnail("https://i.imgur.com/6wqPtuq.png")
        .setTitle(`You rolled: ${somaResultados}`)
        .addFields({
          name: `Rolls:`,
          value: `\n${resultadoFormatado} = ${somaResultados}`,
          inline: true,
        });

        await interaction.reply({ embeds: [embed] });
      }
  },
};
