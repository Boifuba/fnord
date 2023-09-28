const { SlashCommandBuilder,  PermissionFlagsBits, EmbedBuilder } = require("discord.js");


const vantagensJSON = require("../../json/conan/npc.json"); 

module.exports = {
  data: new SlashCommandBuilder()
    .setName("conan")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("conan npc")
    .addStringOption((o) =>
      o
        .setName("query")
        .setDescription("Input a query")
        .setRequired(true)
        .setAutocomplete(true)
    ),
  async autocomplete(interaction) {
    const value = interaction.options.getString("query").toLowerCase();

    
    const choices = vantagensJSON.map((vantagem) => vantagem.name);
    const filtered = choices
      .filter((choice) => choice.toLowerCase().includes(value))
      .slice(0, 25);

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },

  async execute(interaction) {
    const query = interaction.options.getString("query");

    // Encontre a vantagem correspondente no JSON
    const vantagem = vantagensJSON.find((vantagem) =>
      vantagem.name.toLowerCase() === query.toLowerCase()
    );

    if (!vantagem) {
      await interaction.reply("Vantagem não encontrada.");
      return;
    }

    // Exiba as informações da vantagem
    const embed = new EmbedBuilder();
    embed.setColor(0x5506ce)
         .setImage(vantagem.image)
         .setTitle(vantagem.name)
         .setDescription(vantagem.description
          );
    
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
