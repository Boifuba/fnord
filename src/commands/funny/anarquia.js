const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Anarquia = require("../../schema/anarquia"); // Ajuste o caminho conforme sua estrutura de arquivos

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
          { name: "Ativar", value: "on" },
          { name: "Desativar", value: "off" }
        )
    ),

  async execute(interaction) {
    const estado = interaction.options.getString("estado");

    // Consulta o estado atual da anarquia na base de dados
    let anarquia = await Anarquia.findOne();
    if (!anarquia) {
      // Se não houver um registro, cria um novo
      anarquia = new Anarquia({ estado: false });
      await anarquia.save();
    }

    if (estado === "on") {
      anarquia.estado = true;
      const embedOn = new EmbedBuilder()
        .setColor("#00FF00")
        .setTitle("🟢 Liberdade Expressão - Mode ON")
        .setImage("https://i.imgur.com/aYduPDh.jpeg")
        .setDescription(
          "O Monark garante que aqui tem liberdade de expressão e pode falar o quê pensa sem ser punido! - <@&830188485791973387>"
        );

      await interaction.reply({ embeds: [embedOn] });
    } else if (estado === "off") {
      anarquia.estado = false;
      const embedOff = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("🔴 Liberdade de expressão é o caralho!")
        .setImage("https://i.imgur.com/oJCM0ib.jpeg")
        .setDescription(
          "A democracia exige respeito às instituições e à vontade popular e a  liberdade de expressão não é liberdade de agressão. <@&830188485791973387>"
        );

      await interaction.reply({ embeds: [embedOff] });
    }

    // Salva o novo estado no banco de dados
    await anarquia.save();
  },

  async isAnarquiaAtiva() {
    const anarquia = await Anarquia.findOne();
    return anarquia ? anarquia.estado : false;
  },
};
