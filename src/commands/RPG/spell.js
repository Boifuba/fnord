const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const vantagensJSON = require("../../json/spells.json"); 

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spells")
    .setDescription("Autocomplete test")
    .addStringOption((o) =>
      o
        .setName("query")
        .setDescription("Input a query")
        .setRequired(true)
        .setAutocomplete(true)
    ),
  async autocomplete(interaction) {
    const value = interaction.options.getString("query").toLowerCase();

    // Correção aqui: Mapeie os nomes das magias com base na estrutura do JSON
    const choices = vantagensJSON.rows.map((spell) => spell.name);
    const filtered = choices
      .filter((choice) => choice.toLowerCase().includes(value))
      .slice(0, 25);

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },

  async execute(interaction) {
    const query = interaction.options.getString("query");

    // Encontre a spell correspondente no JSON
    const spell = vantagensJSON.rows.find((spell) =>
      spell.name.toLowerCase() === query.toLowerCase()
    );

    if (!spell) {
      await interaction.reply("spell não encontrada.");
      return;
    }
    const difficultyUppercase = spell.difficulty.toUpperCase();

    // Exiba as informações da spell
    const embed = new EmbedBuilder();
    embed.setColor(0x5506ce)
         .setTitle(spell.name, )
         .setThumbnail('https://i.imgur.com/Yf1v9jh.jpg')
         .setDescription(`${spell.description}\n`)
         .addFields(
          { name: 'College', value: `${spell.tags}`, inline: true  },
          { name: 'Type', value: `${spell.spell_class}`, inline: true  },
          { name: 'Difficulty', value: `${difficultyUppercase}`, inline: true },
          { name: 'Cost', value: `${spell.casting_cost}`, inline: true },
          { name: 'Durantion', value: `${spell.duration}`, inline: true },
          { name: 'Maintenance', value: `${spell.maintenance_cost}`, inline: true },
          { name: 'Casting Time', value: `${spell.casting_time}`, inline: true },
          { name: '\u200B', value: '\u200B' },
          { name: 'Page', value: `${spell.reference}`, inline: true },

        )
    
    await interaction.reply({ embeds: [embed] });
  },
};
