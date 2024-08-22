const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Mural = require("../../schema/Message");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("msgread")
    .setDescription("Lista as mensagens de um usuário.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("O usuário cujas mensagens serão listadas")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      // Defer a resposta para indicar que está processando
      await interaction.deferReply();

      const user = interaction.options.getUser("user");
      const member = await interaction.guild.members.fetch(user.id);
      const displayName = member.displayName;

      let userData = await Mural.findOne({ userId: user.id });

      if (!userData || userData.messages.length === 0) {
        // Edita a resposta deferida se nenhuma mensagem for encontrada
        await interaction.editReply(
          `Nenhuma mensagem encontrada para ${displayName}.`
        );
      } else {
        const embed = new EmbedBuilder()
          .setTitle(`🔥 Torpedos de ${displayName} 🔥`)
          .setColor("#FFC0CB") // Cor do embed (vermelho)
          .setImage("https://i.imgur.com/jvuAtOZ.jpeg"); // Adiciona a imagem ao embed

        // Adiciona mensagens ao embed
        userData.messages.forEach((msg, index) => {
          embed.addFields({
            name: `Mensagem ${index + 1}`,
            value: msg.content,
            inline: false,
          });
        });

        // Envia o embed como resposta
        await interaction.editReply({ embeds: [embed] });
      }
    } catch (error) {
      console.error(error);

      if (interaction.deferred) {
        // Se a interação já foi deferida, edita a resposta
        await interaction.editReply("Ocorreu um erro ao listar as mensagens.");
      } else {
        // Se a interação não foi deferida, responde com erro
        await interaction.reply("Ocorreu um erro ao listar as mensagens.");
      }
    }
  },
};
