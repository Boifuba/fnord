const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("critical")
    .setDescription("Critical Tables!")
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
      "Critical Hit",
      "Critical Miss",
      "Critical Spell",
      "Critical Unarmed Miss",
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

    const rollDice = () => {
      const results = [];
      for (let i = 0; i < 3; i++) {
        results.push(Math.floor(Math.random() * 6) + 1);
      }
      return results;
    };

    let jsonData;

    if (query === "Critical Hit") {
      jsonData = require("../../json/criticalHit.json");
    }
    if (query === "Critical Miss") {
      jsonData = require("../../json/criticalMiss.json");
    }
    if (query === "Critical Spell") {
      jsonData = require("../../json/criticalSpell.json");
    }
    if (query === "Critical Unarmed Miss") {
      jsonData = require("../../json/criticalUnarmed.json");
    }

    const removeHTMLTags = (html) => {
      return html.replace(/<\/?[^>]+(>|$)/g, "");
    };

    const crawler = (results) => {
      const resultsArray = jsonData.results;
      for (const result of resultsArray) {
        if (
          results.reduce((a, b) => a + b) >= result.range[0] &&
          results.reduce((a, b) => a + b) <= result.range[1]
        ) {
          const text = removeHTMLTags(result.text);

          return text;
        }
      }
      return null;
    };

    const main = () => {
      const results = rollDice();
      const text = crawler(results);

      const displayResults = results.join(" + ");

      const embed = new EmbedBuilder();

      embed
        .setColor(0x5506ce)
        .setTitle(query)
        .setDescription(text)
        .setThumbnail("https://i.imgur.com/MaLBvJU.png")
        .addFields([
          {
            name: "Rolls",
            value: `${displayResults} = ${results.reduce((a, b) => a + b)}`,
            inline: true,
          },
        ]);

      interaction.reply({ embeds: [embed] });
    };

    main();
  },
};
