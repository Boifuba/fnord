const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mega")
    .setDescription("Access to admin commands")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
      subcommand.setName("gurps").setDescription("Mostra Link de Download")
    ),
  async execute(interaction) {
    const exampleEmbed = new EmbedBuilder()
      .setImage("https://i.imgur.com/3jnzmdJ.png")
      .setDescription(
        "~~DIGA NÃO À PIRATARIA~~  \n O Google drive precisa de autorizaçào para que você tenha acesso. Clique no link e aguarde!"
      )
      .setURL("https://bit.ly/WarehouseTwentyFree")
      .setColor(0x5506ce)
      .setTitle("GURPS COMPLETE COLLECTION")
      .addFields(
        {
          name: "\u200B",
          value: "\u200B",
        },
        {
          name: "MEGA1",
          value: "[DOWNLOAD](https://bit.ly/WarehouseTwentyFree)",
          inline: true,
        },
        {
          name: "MEGA2",
          value:
            "[DOWNLOAD](https://mega.nz/folder/QxkXGCIa#5xXDaK5bX-ThKceVFdXr7g)",
          inline: true,
        },
        {
          name: "Livros pt_BR",
          value:
            "[DOWNLOAD](https://drive.google.com/drive/folders/1fFD-8-qAidbAuyB5SIb8jjm6AaXM-r2B?usp=drive_link)",
          inline: true,
        }
      );
    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
