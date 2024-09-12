const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

function extractTextFromNotes(notes, result = []) {
  notes.forEach((note) => {
    if (note.type === "note") {
      result.push({
        text: note.text,
        reference: note.reference, // Assumindo que a referência está disponível no objeto de nota
      });
    } else if (note.children) {
      extractTextFromNotes(note.children, result);
    }
  });
}

const jsonFiles = [
  path.resolve(__dirname, "../../json/rules.json"),
  path.resolve(__dirname, "../../json/rules_ma.json"),
  path.resolve(__dirname, "../../json/rules_m.json"),
];

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
    .setName("rules")
    .setDescription("Busca regras pelo índice")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Insiria o nome da regra.")
        .setRequired(true)
        .setAutocomplete(true)
    ),
  async autocomplete(interaction) {
    const value = interaction.options.getString("query").toLowerCase();

    const filtered = choices
      .filter((choice) => choice.text.toLowerCase().includes(value))
      .slice(0, 25);

    if (!interaction) return;

    await interaction.respond(
      filtered.map((choice) => ({ name: choice.text, value: choice.text }))
    );
  },

  async execute(interaction) {
    const query = interaction.options.getString("query").toLowerCase();

    const chosenNote = choices.find(
      (choice) => choice.text.toLowerCase() === query
    );

    if (chosenNote) {
      await interaction.reply({
        content: `A Regra ${chosenNote.text} está na página ${chosenNote.reference}`,
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "Eu não criei essa regra.",
        ephemeral: true,
      });
    }
  },
};
