const { SlashCommandBuilder } = require("discord.js");
const profileModel = require("../../schema/quoteSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Comando de administrador")
    .setDefaultPermission(true)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Adicionar Quote")
        .addUserOption((option) =>
          option.setName("user").setDescription("Jogador").setRequired(true)
        )
        .addStringOption((option) =>
          option.setName("quote").setDescription("Quote").setRequired(true)
        )
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const adminSubcommand = interaction.options.getSubcommand();

    if (adminSubcommand === "add") {
      const user = interaction.options.getUser("user");
      const quote = interaction.options.getString("quote");
      const guildName = interaction.guild.name;

      try {
        let userProfile = await profileModel.findOne({
          userId: user.id,
        });

        if (!userProfile) {
          userProfile = new profileModel({
            userId: user.id,
            quotes: [quote], // Start the array with the new quote
          });
        } else {
          userProfile.quotes.push(quote); // Add the new quote to the existing array
        }

        await userProfile.save();

        await interaction.editReply(
          `Added "${quote}" to ${user.username}'s profile in ${guildName}.`
        );
      } catch (error) {
        console.error("Error executing quote:", error);
        await interaction.editReply(
          "An error occurred while executing the quote command."
        );
      }
    }
  },
};
