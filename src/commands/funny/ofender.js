const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Feanor = require("../../schema/feanor");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ofensa")
    .setDescription("Gerencia as ofensas.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("registrar")
        .setDescription("Registra uma nova ofensa no banco de dados.")
        .addStringOption((option) =>
          option
            .setName("conteudo")
            .setDescription("A ofensa a ser registrada.")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("ofender")
        .setDescription("Ofende um usuário aleatoriamente.")
        .addUserOption((option) =>
          option
            .setName("usuario")
            .setDescription("O usuário que será ofendido.")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === "registrar") {
      await handleRegisterOffense(interaction);
    } else if (subcommand === "ofender") {
      await handleOffendUser(interaction);
    }
  },
};

async function handleRegisterOffense(interaction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const conteudo = interaction.options.getString("conteudo");

    const newOffense = new Feanor({ ofensa: conteudo });
    await newOffense.save();

    await interaction.editReply({
      content: `✅ A ofensa foi registrada com sucesso!`,
      ephemeral: true,
    });
  } catch (error) {
    console.error(error);
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply("❌ Ocorreu um erro ao registrar a ofensa.");
    } else {
      await interaction.reply("❌ Ocorreu um erro ao registrar a ofensa.");
    }
  }
}

async function handleOffendUser(interaction) {
  try {
    await interaction.deferReply();

    const usuario = interaction.options.getUser("usuario");

    const offenses = await Feanor.find();
    if (offenses.length === 0) {
      await interaction.editReply(
        "❌ Nenhuma ofensa encontrada na base de dados."
      );
      return;
    }

    const randomOffense =
      offenses[Math.floor(Math.random() * offenses.length)].ofensa;

    await interaction.editReply({
      content: `${usuario}, ${randomOffense}`,
    });
  } catch (error) {
    console.error(error);
    await interaction.editReply("❌ Ocorreu um erro ao ofender o usuário.");
  }
}
