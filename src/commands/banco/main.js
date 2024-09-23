const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const path = require("path");
const fs = require("fs");

// Lista de poderes com seus respectivos arquivos de comandos
const powers = [
  {
    name: "Consultar o saldo da lojinha",
    description: "Consulta seu saldo no servidor",
    command: "saldo",
  },
  {
    name: "Transferir x🪙 para outro usuário ",
    description: "Transfere moedas para outro usuário",
    command: "transferir",
  },
  {
    name: "Adiciona um Emoji ao nick de alguém. Custo: 3 🪙",
    description: "Entrega um OK no chat.",
    command: "emoji",
  },
  {
    name: "Derruba um cartão na contagem total. Custo: 5 🪙",
    description: "Derruba um cartão.",
    command: "delete",
  },
  {
    name: "Cancela um Cartão e devolve 2. Custo: 10 🪙",
    description: "Entrega um OK no chat.",
    command: "uno",
  },
  {
    name: "Dá um cartão sem motivo nenhum. Custo: 10 🪙",
    description: "Entrega um OK no chat.",
    command: "cardRandom",
  },

  {
    name: "Toque seus cartões pelos de outra pessoa. Custo: 100 🪙",
    description: "Entrega um OK no chat.",
    command: "laranja",
  },
];

// Carrega todos os comandos de poder a partir da pasta
const commands = {};
const commandsDir = path.join(__dirname, "../../functions/poderes");
fs.readdirSync(commandsDir).forEach((file) => {
  if (file.endsWith(".js")) {
    const commandName = path.basename(file, ".js");
    commands[commandName] = require(path.join(commandsDir, file));
  }
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lojinha")
    .setDescription("Veja os poderes disponíveis na lojinha.")
    .addStringOption((option) =>
      option
        .setName("poder")
        .setDescription("Escolha um poder")
        .setAutocomplete(true)
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Escolha o alvo para aplicar o poder")
        .setRequired(true)
    ),

  async autocomplete(interaction) {
    const focusedValue = interaction.options.getFocused();

    // Filtra os poderes com base no valor focado
    const filteredPowers = powers.filter((power) =>
      power.name.toLowerCase().includes(focusedValue.toLowerCase())
    );

    await interaction.respond(
      filteredPowers.map((power) => ({
        name: power.name,
        value: power.name,
      }))
    );
  },

  async execute(interaction) {
    const selectedPowerName = interaction.options.getString("poder");
    const targetUser = interaction.options.getUser("target");
    const selectedPower = powers.find(
      (power) => power.name === selectedPowerName
    );

    if (!selectedPower) {
      return await interaction.reply({
        content: "Poder não encontrado.",
        ephemeral: true,
      });
    }

    // Executa o comando associado ao poder selecionado
    const commandFunction = commands[selectedPower.command];

    if (commandFunction) {
      await commandFunction(interaction, targetUser); // Passa a interação e o usuário como parâmetros
    } else {
      await interaction.reply({
        content: "Comando não encontrado.",
        ephemeral: true,
      });
    }
  },
};
