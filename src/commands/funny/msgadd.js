const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Mural = require("../../schema/Message");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("msgadd")
    .setDescription("Adiciona uma mensagem para um usuário.")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("O usuário para o qual a mensagem será adicionada")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("A mensagem que será adicionada")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      await interaction.deferReply({ ephemeral: true }); // Resposta somente visível para o autor do comando

      const user = interaction.options.getUser("user");
      const message = interaction.options.getString("message");

      // Pesquisa o membro na guilda usando o ID do usuário
      const member = await interaction.guild.members.fetch(user.id);
      const displayName = member.displayName;

      let userData = await Mural.findOne({ userId: user.id });

      if (!userData) {
        userData = new Mural({
          userId: user.id,
          displayName: displayName,
          messages: [], // Inicializa com uma lista vazia de mensagens
        });
      }

      // Determina o próximo índice disponível
      const nextIndex =
        userData.messages.length > 0
          ? Math.max(...userData.messages.map((msg) => msg.index)) + 1
          : 1;

      userData.messages.push({
        index: nextIndex,
        id: nextIndex.toString(),
        content: message,
      });

      await userData.save();

      // Envia a resposta com as mensagens armazenadas, visível apenas para o autor
      await interaction.editReply({
        content: `💣 ## Torpedos de ${displayName}\n${userData.messages
          .map((msg) => `${msg.index} - *"${msg.content}"*`)
          .join("\n")}`,
        ephemeral: true, // Apenas o autor do comando verá esta mensagem
      });

      // Cria um embed para a notificação pública
      const embed = new EmbedBuilder()
        .setColor("#0099ff") // Cor do embed
        .setTitle("Você tem uma nova mensagem secreta!")
        .setDescription(
          `*Olá ${user}, você recebeu uma nova mensagem! Digite /msgread para ler!*`
        )
        .setTimestamp();

      // Envia a mensagem pública mencionando o usuário com o embed
      await interaction.followUp({
        content: `${user}`, // Menciona o usuário
        embeds: [embed],
      });
    } catch (error) {
      console.error(error);

      if (interaction.deferred || interaction.replied) {
        await interaction.editReply(
          "🧨 Ocorreu um erro ao adicionar a mensagem."
        );
      } else {
        await interaction.reply("Ocorreu um erro ao adicionar a mensagem.");
      }
    }
  },
};
