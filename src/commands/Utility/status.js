const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Access to admin commands"),
  async execute(interaction) {
    if (!interaction) {
      console.error("This command must be used as a Discord interaction.");
      return;
    }

    const guild = interaction.guild; // Obter a guild da interação

    const a = guild.memberCount;
    const b = guild.members.cache.filter(
      (x) => x.presence?.status === "online"
    ).size;
    const c = guild.members.cache.filter(
      (x) => x.presence?.status === "idle"
    ).size;
    const d = guild.members.cache.filter(
      (x) => x.presence?.status === "dnd"
    ).size;

    let embed = new EmbedBuilder()
      .setTitle("Status do servidor")
      .setDescription("Lista os membros do servidor de acordo com seus status!")
      .setThumbnail("https://i.imgur.com/IzUOBY3.gif")
      .setColor(0x5506ce)
      .addFields({
        name: "Online",
        value: `  🟢  ${b} membros`,
      })
      .addFields({
        name: "Ausentes",
        value: `  🟡  ${c} membros`,
      })
      .addFields({
        name: "Ocupados",
        value: `  🔴  ${d} membros`,
      })
      .addFields({
        name: "Membros totais",
        value: `👥 ${a} membros`,
      });

    await interaction.reply({ embeds: [embed] });
  },
};
