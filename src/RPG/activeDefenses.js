const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("active-defenses")
    .setDescription("Maneuvers")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Input a query")
        .setRequired(true)
        .setAutocomplete(true)
    ),
  async autocomplete(interaction, client) {
    const value = interaction.options.getFocused().toLowerCase();

    let choices = [
      "Dodge",
      "Parry Weapons",
      "Parry Unarmed - Hands",
      "Parry Unarmed - Legs",
      "Block",
      "Retreat",
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

    if (query === "Dodge")
      desc = `
    **Drop / Dive**: +3 to Dodge - may take a step before drop, ranged attacks only
                     If you make your dodge roll, you get hit - if you fail, original  
                     victim gets his defense roll\n
    **Acrobatic**: -2/+2 to Dodge - once per turn, can be combined with retreat.
`;

    if (query === "Parry Weapons")
      desc = `Parry (Weapon, all Parries against an attack coming from the back are at -2)\n
        **Flail**: -4, fencing weapons can’t parry at all.\n
        **Thrown**: -1 if (Large, eg. spear), -2 if (Small, eg. knife)\n
        **Consecutive**: -4 if you use the same hand in the same round
        -2 if you use fencing or with Weapon Master/Trained by a Master
        -1 if you use fencing with Weapon Master/Trained by a Master.\n
        **Cross**: Commit two ready melee weapons to a single Parry, using the better Parry score +2 and combining their weights (for purposes of breaking). Neither hand can Parry
        again this turn.\n
        **Supported**: Use a ready (empty) hand to support a parrying weapon for +1 as if it were a two-handed weapon. Neither hand can parry again".
        `;
    if (query === "Parry Unarmed - Hands")
      desc = `Same rules from Parry Weapon apply as well.\n
      **DX / Karate / Brawling**: Use highest to Parry with one free hand Boxing Parry two different attacks per turn, one with each hand.
      **Wrestling / Sumo**: Need to use two hands to Parry.\n
      **Weapon Swing Attack**: -3, 0 if you use Karate or Judo.
        `;
    if (query === "Parry Unarmed - Legs")
      desc = `Same rules from Parry Weapon apply as well.\n
        **Karate / Brawling**: Needs Karate / Brawling - can only parry attacks below the waist, can not retreat, once per Turn`;

    if (query === "Block")
      desc = `
    **Consecutive**: -5\n
    **Flail**: -2\n
    **Close Combat**: No block possible\n
    `;

    if (query === "Retreat")
      desc = `
    **Dodge**: +3\n
    **Parry**: +1, +3 if using Fencing Weapon / Judo / Karate\n
    **Block**: +1
    `;
    const embed = new EmbedBuilder();

    embed.setColor(0x5506ce).setTitle(query).setDescription(desc);

    await interaction.reply({ embeds: [embed] });
  },
};
