const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warp")
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

    let choices = ["Distance", "Preparation Time"];

    const filtered = choices
      .filter((choice) => choice.toLowerCase().includes(value))
      .slice(0, 25);

    if (!interaction) return;

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },

  async execute(interaction) {
    let name;
    let value;
    let title;
    let text;
    let a;
    let b;
    const query = interaction.options.getString("query");

    if (query === "Distance") {
      name = `Distance`;
      value = `Penalty`;
      title = `Warp Distance Table`;
      text = `If actual distance falls between two values, use the higher. Add an additional -1 for each 10x increase in distance.`;
      a = `
10 yards
20 yards
100 yards
500 yards
2 miles
10 miles
100 miles
1,000 miles
`;
      b = `
-0
-1
-2
-3
-4
-5
-6
-7
`;
    }
    if (query === "Preparation Time") {
      name = `Preparation Time`;
      value = `IQ Modifier`;
      title = `Preparation Time Table`;
      text = `The amount of
      time taken to prepare for the teleport affects the IQ roll. This table is not open-ended; +10 is the maximum possible bonus.`;
      a = `
None 
1 second 
2 seconds
4 seconds
8 seconds
15 seconds
30 seconds
1 minute 
2 minutes 
4 minutes 
8 minutes 
15 minutes 
30 minutes 
1 hour 
2 hours 
4 hours 
8 hours `;
      b = `
-10
-5
-4
-3
-2
-1
=0
+1
+2
+3
+4
+5
+6
+7
+8
+9
+10

`;
    }

    const embed = new EmbedBuilder();

    embed
      .setColor(0x5506ce)
      .setTitle(title)
      .setDescription(text)
      .setThumbnail("https://i.imgur.com/MaLBvJU.png")
      .addFields([
        { name: `${name}`, value: `${a}`, inline: true },
        { name: `${value}`, value: `${b}`, inline: true },
      ]);

    await interaction.reply({ embeds: [embed] });
  },
};
