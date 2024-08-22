const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require('fs');

// Carregue o JSON e armazene-o em uma variável global
let jsonData = null;

fs.readFile('Osberht_of_Northumbria_rev.gcs', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo JSON:', err);
  } else {
    jsonData = JSON.parse(data);
  }
});

// Função para buscar as habilidades do JSON
function getSkills() {
  if (jsonData && jsonData.skills) {
    return jsonData.skills.map(element => element.name);
  }
  return [];
}

// Função para obter o NH da habilidade
function getNHForSkill(skillName) {
  if (jsonData && jsonData.skills) {
    const skill = jsonData.skills.find(element => element.name === skillName);
    if (skill) {
      return skill.calc.level;
    }
    return null;
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("boi")
    .setDescription("Rola contra uma habilidade")
    .addSubcommand(subcommand =>
      subcommand
        .setName("skill")
        .setDescription("Rola contra uma habilidade")
        .addStringOption(option =>
          option
            .setName("skill_name")
            .setDescription("Selecione uma habilidade")
            .setRequired(true)
            .addChoices(getSkills().map(skillName => [skillName, skillName]))
        )
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === "skill") {
      const embed = new EmbedBuilder();
      const skillName = interaction.options.getString("skill_name");
      const nh = getNHForSkill(skillName);

      if (nh === null) {
        await interaction.reply("Habilidade não encontrada no JSON.");
        return;
      }

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
  },
};
