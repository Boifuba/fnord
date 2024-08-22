const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("boneco")
    .setDescription(
      "Mostra uma imagem com a mensagem para um usuário específico"
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("O usuário que você quer mencionar")
        .setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const imageUrl = "https://i.imgur.com/Zxl2hlh.jpg"; // URL direta da imagem

    const embed = new EmbedBuilder()
      .setTitle("Mostre aqui onde ele te tocou!")
      .setDescription(`**${user}**`)
      .setImage(imageUrl)
      .setColor(0xff0000); // Opcional: define uma cor para o embed

    await interaction.reply({
      embeds: [embed],
    });
  },
};
