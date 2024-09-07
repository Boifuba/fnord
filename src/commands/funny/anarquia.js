const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

let anarquiaAtiva = false; // Variável para armazenar o estado de "anarquia"

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anarquia")
    .setDescription("Ativa ou desativa o modo anarquia.")
    .addStringOption((option) =>
      option
        .setName("estado")
        .setDescription("Escolha 'on' para ativar e 'off' para desativar.")
        .setRequired(true)
        .addChoices(
          { name: "Ativar", value: "on" }, // Corrigido os nomes para serem mais legíveis
          { name: "Desativar", value: "off" }
        )
    ),

  async execute(interaction) {
    const estado = interaction.options.getString("estado");

    if (estado === "on") {
      anarquiaAtiva = true;

      // Embed para anarquia ativada
      const embedOn = new EmbedBuilder()

        .setColor("#00FF00")
        .setTitle("🟢 Liberdade Expressão - Mode ON")
        .setImage("https://i.imgur.com/aYduPDh.jpeg")

        .setDescription(
          "O Monark garante que aqui tem liberdade de expressão e pode falar o quê pensa sem ser punido! - <@&830188485791973387>"
        );

      await interaction.reply({ embeds: [embedOn] });
    } else if (estado === "off") {
      anarquiaAtiva = false;

      // Embed para anarquia desativada
      const embedOff = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("🔴 Liberdade de expressão é o caralho!")
        .setImage("https://i.imgur.com/oJCM0ib.jpeg")

        .setDescription(
          "A democracia exige respeito às instituições e à vontade popular e a  liberdade de expressão não é liberdade de agressão. <@&830188485791973387>"
        );

      await interaction.reply({ embeds: [embedOff] });
    }
  },

  // Função para verificar o estado de "anarquia"
  isAnarquiaAtiva() {
    return anarquiaAtiva;
  },
};
