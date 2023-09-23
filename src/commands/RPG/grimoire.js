const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

function extractTextFromNotes(notes, result = []) {
  notes.forEach((note) => {
    if (note.type === "spell") {
      result.push({
        name: note.name,
        reference: note.reference,
        difficulty: note.difficulty,
        college: note.college,
        spell_class: note.spell_class,
        resist: note.resist,
        casting_cost: note.casting_cost,
        maintenance_cost: note.maintenance_cost,
        casting_time: note.casting_time,
        duration: note.duration,
      });
    } else if (note.prereqs && note.prereqs.prereqs) {
      extractTextFromNotes(note.prereqs.prereqs, result);
    }
  });
}

const jsonFiles = [path.resolve(__dirname, "../../json/spells.json")];

const choices = [];
jsonFiles.forEach((jsonFile) => {
  try {
    const jsonData = fs.readFileSync(jsonFile, "utf-8");
    const jsonObject = JSON.parse(jsonData);
    extractTextFromNotes(jsonObject.rows, choices);
  } catch (error) {
    console.error(`❌ Erro ao ler o arquivo JSON ${jsonFile}:`, error);
  }
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("grimoire")
    .setDescription("Busca regras pelo índice")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Insira o nome da regra.")
        .setRequired(true)
        .setAutocomplete(true)
    ),
  async autocomplete(interaction) {
    const value = interaction.options.getString("query").toLowerCase();

    const filtered = choices
      .filter((choice) => choice.name.toLowerCase().includes(value))
      .slice(0, 25);

    if (!interaction) return;

    await interaction.respond(
      filtered.map((choice) => ({ name: choice.name, value: choice.name }))
    );
  },

  async execute(interaction) {
    const query = interaction.options.getString("query").toLowerCase();

    const chosenNote = choices.find(
      (choice) => choice.name.toLowerCase() === query
    );

    if (chosenNote) {
      const embed = new EmbedBuilder();
      let dc = chosenNote.difficulty.toUpperCase;

      embed
        .setColor(0x5506ce)
        .setTitle(chosenNote.name)
        .setThumbnail("https://i.imgur.com/Yf1v9jh.jpg").setDescription(`
            \n**Reference**: ${chosenNote.reference}
      **Difficulty**: ${String(chosenNote.difficulty).toUpperCase()} 
      **College**: ${chosenNote.college}
      **Spell Class**: ${chosenNote.spell_class}
      **Resist**: ${chosenNote.resist}
      **Casting Cost**: ${chosenNote.casting_cost}
      **Maintenance Cost**: ${chosenNote.maintenance_cost}
      **Casting Time**: ${chosenNote.casting_time}
      **Duration**: ${chosenNote.duration}
            `);

      await interaction.reply({ embeds: [embed] });
    } else {
      await interaction.reply({
        content: "Eu não criei essa regra.",
        ephemeral: true,
      });
    }
  },
};
