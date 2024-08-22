const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const axios = require("axios"); // Importe a biblioteca axios

module.exports = {
  data: new SlashCommandBuilder()
    .setName("space4")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription("space npc")
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
        "https://campanhasdoboi.com.br:25000/api/data/space.json"
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
        "https://campanhasdoboi.com.br:25000/api/data/space.json"
      ); // Substitua "URL_DA_SUA_API" pela URL da sua API
      const npcData = response.data;

      const npc = npcData.find(
        (npc) => npc.name.toLowerCase() === query.toLowerCase()
      );

      if (!npc) {
        await interaction.reply("NPC não encontrado.");
        return;
      }
      const embed = new EmbedBuilder();

      embed.addFields(
        { name: "Cargo", value: `${npc.cargo}` },
        { name: "Planeta", value: `${npc.planet}`, inline: true },
        { name: "Quadrante", value: `${npc.quadrante}`, inline: true },
        { name: "Raça", value: `${npc.race}`, inline: true }
      );

      embed
        .setColor(0x5506ce)
        .setImage(npc.image)
        .setTitle(npc.name)
        .setDescription(npc.description);

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      await interaction.reply("Erro ao buscar dados da API.");
    }
  },
};
