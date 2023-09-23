const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("extra-effort")
    .setDescription("Autocomplete test")
    .addStringOption((o) =>
      o
        .setName("query")
        .setDescription("Input a query")
        .setRequired(true)
        .setAutocomplete(true)
    ),
  async autocomplete(interaction, client) {
    const value = interaction.options.getFocused().toLowerCase();

    let choices = [
      "Flurry of Blows",
      "Giant Step",
      "Great Lunge",
      "Heroic Charge",
      "Mighty Blow ",
    ];

    const filtered = choices
      .filter((choice) => choice.toLowerCase().includes(value))
      .slice(0, 25);

    if (!interaction) return;

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },

  async execute(interaction) {
    const query = interaction.options.getString("query");
    if (query === "Flurry of Blows")
      text = `Spend 1 FP per attack to halve the penalty for Rapid Strike to -3 (B370, usually -6, if you spend 1 FP you half it to -3)`;
    if (query === "Giant Step")
      text = `Spend 1 FP for one extra step (before or after your attack) during an Attack or Defensive Attack.`;
    if (query === "Great Lunge")
      text = `Spend 1 FP to get the effects of All-Out Attack (Long) without losing defenses (incompatible with All-Out Attack, Defensive Attack, Defensive Grip).`;
    if (query === "Heroic Charge")
      text = `Spend 1 FP during a Move and Attack to ignore the skill penalty and cap (except for Acrobatic Attack or Flying Attack).`;
    if (query === "Mighty Blow ")
      text = `Spend 1 FP per attack to get the All-Out Attack (Strong) damage bonus to an Attack without losing defenses.`;

    const embed = new EmbedBuilder();

    embed.setColor(0x5506ce).setTitle(query).setDescription(text);
    await interaction.reply({ embeds: [embed] });
  },
};
