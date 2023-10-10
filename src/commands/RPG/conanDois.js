const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const axios = require("axios"); // Importe a biblioteca axios

module.exports = {
  data: new SlashCommandBuilder()
    .setName("conanteste")
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

    // Faça uma solicitação à sua API para obter os dados
    try {
      const response = await axios.get(
        "http://campanhasdoboi.com.br:25000/api/data"
      ); // Substitua "URL_DA_SUA_API" pela URL da sua API
      const npcData = response.data;

      const choices = npcData.map((npc) => npc.name);
      const filtered = choices
        .filter((choice) => choice.toLowerCase().includes(value))
        .slice(0, 25);

      await interaction.respond(
        filtered.map((choice) => ({ name: choice, value: choice }))
      );
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      await interaction.reply("Erro ao buscar dados da API.");
    }
  },

  async execute(interaction) {
    const query = interaction.options.getString("query");

    // Faça uma solicitação à sua API para obter os dados
    try {
      const response = await axios.get(
        "http://campanhasdoboi.com.br:25000/api/data"
      ); // Substitua "URL_DA_SUA_API" pela URL da sua API
      const npcData = response.data;

      // Encontre o NPC correspondente nos dados da API
      const npc = npcData.find(
        (npc) => npc.name.toLowerCase() === query.toLowerCase()
      );

      if (!npc) {
        await interaction.reply("NPC não encontrado.");
        return;
      }

      // Exiba as informações da vantagem
      if (npc.country === "Ciméria") {
        local = "Tribo";
        clan = "Clã";
      } else {
        local = "Província";
        clan = "\u200B";
      }
      // Exiba as informações do NPC
      const embed = new EmbedBuilder();
      embed
        .setColor(0x5506ce)
        .setImage(npc.image)
        .setTitle(npc.name)
        .setDescription(npc.description)
        .addFields(
          { name: "Título", value: `${npc.title}` },
          { name: "País", value: `${npc.country}`, inline: true },
          { name: `${local}`, value: `${npc.tribe}`, inline: true },
          { name: `${clan}`, value: `${npc.clan}`, inline: true }
        );
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      await interaction.reply("Erro ao buscar dados da API.");
    }
  },
};
