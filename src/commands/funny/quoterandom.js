const { SlashCommandBuilder } = require("discord.js");
const profileModel = require("../../schema/quoteSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("randomquote")
    .setDescription("Escolher uma Quote Aleatória"),
  async execute(interaction) {
    await interaction.deferReply();

    try {
      const usersWithQuotes = await profileModel.find({
        "quotes.0": { $exists: true },
      });

      if (usersWithQuotes.length > 0) {
        const randomUserIndex = Math.floor(
          Math.random() * usersWithQuotes.length
        );
        const randomUser = usersWithQuotes[randomUserIndex];

        const userId = randomUser.userId;
        const user = await interaction.client.users.fetch(userId);

        const displayName = user ? user.displayName : user.usernname;

        const randomQuoteIndex = Math.floor(
          Math.random() * randomUser.quotes.length
        );
        const randomQuote = randomUser.quotes[randomQuoteIndex];

        const formattedQuote = `*"${randomQuote}"*`;

        const embed = {
          color: 0x0099ff,
          title: `Quote Aleatória de ${displayName}`,
          description: formattedQuote,
          thumbnail: {
            url: user.displayAvatarURL({ format: "png", dynamic: true }),
          },
        };

        await interaction.editReply({ embeds: [embed] });
      } else {
        await interaction.editReply("Nenhum usuário com citações encontrado.");
      }
    } catch (error) {
      console.error("Erro ao executar randomquote:", error);
      await interaction.editReply(
        "Ocorreu um erro ao executar o comando randomquote."
      );
    }
  },
};
