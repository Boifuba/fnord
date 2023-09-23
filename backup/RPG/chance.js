const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chance")
    .setDescription("Probabilidade de rolagem")
    .addNumberOption((option) =>
      option
        .setName("nh")
        .setDescription("The amount of coins to subtract")
        .setRequired(true)
    ),

  async execute(interaction) {
    let table = [
      {
        skill: 3,
        critical_success: "1.85",
        success: 0,
        failure: "72.22",
        critical_failure: "25.93",
      },
      {
        skill: 4,
        critical_success: "1.85",
        success: "0",
        failure: "81.94",
        critical_failure: "16.2",
      },
      {
        skill: 5,
        critical_success: "1.85",
        success: "2.78",
        failure: "86.11",
        critical_failure: "9.26",
      },
      {
        skill: 6,
        critical_success: "1.85",
        success: "7.41",
        failure: "86.11",
        critical_failure: "4.63",
      },
      {
        skill: 7,
        critical_success: "1.85",
        success: "14.35",
        failure: "81.94",
        critical_failure: "1.85",
      },
      {
        skill: 8,
        critical_success: "1.85",
        success: "24.07",
        failure: "72.22",
        critical_failure: "1.85",
      },
      {
        skill: 9,
        critical_success: "1.85",
        success: "35.65",
        failure: "60.65",
        critical_failure: "1.85",
      },
      {
        skill: 10,
        critical_success: "1.85",
        success: "48.15",
        failure: "48.15",
        critical_failure: "1.85",
      },
      {
        skill: 11,
        critical_success: "1.85",
        success: "60.65",
        failure: "35.65",
        critical_failure: "1.85",
      },
      {
        skill: 12,
        critical_success: "1.85",
        success: "72.22",
        failure: "24.07",
        critical_failure: "1.85",
      },
      {
        skill: 13,
        critical_success: "1.85",
        success: "81.94",
        failure: "14.35",
        critical_failure: "1.85",
      },
      {
        skill: 14,
        critical_success: "1.85",
        success: "88.89",
        failure: "7.41",
        critical_failure: "1.85",
      },
      {
        skill: 15,
        critical_success: "4.63",
        success: "90.74",
        failure: "2.78",
        critical_failure: "1.85",
      },
      {
        skill: 16,
        critical_success: "9.26",
        success: "88.89",
        failure: "1.39",
        critical_failure: "0.46",
      },
    ];
    const skillToSearch = interaction.options._hoistedOptions[0].value;

    let foundObject = table.find((obj) => obj.skill === skillToSearch);
    let critical_success, success, failure, critical_failure; // Define the variables here

    if (foundObject) {
      let { critical_success, success, failure, critical_failure } =
        foundObject;

      console.log("critical_success:", critical_success);
      console.log("success:", success);
      console.log("failure:", failure);
      console.log("critical_failure:", critical_failure);

      const embed = new EmbedBuilder();

      embed.setColor(0x5506ce).addFields(
        {
          name: "Sucesso Crítico",
          value: `${critical_success}%`,
          inline: true,
        },
        { name: "\u200B", value: "\u200B", inline: true },

        {
          name: "Sucesso Comum",
          value: `${success}%`,
          inline: true,
        },

        {
          name: "Falha Comum",
          value: `${failure}%`,
          inline: true,
        },
        { name: "\u200B", value: "\u200B", inline: true },

        {
          name: "Falha Crítica",
          value: `${critical_failure}%`,
          inline: true,
        }
      );

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } else {
      console.log(`Nenhum objeto com a skill ${skillToSearch} foi encontrado.`);
    }
  },
};
