const { Events } = require("discord.js");
const Mural = require("../../src/schema/Message"); // Adicione a importação do modelo Mural

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isButton()) return;

    const userId = interaction.user.id;

    if (interaction.customId.startsWith("read_message_")) {
      const messageId = interaction.customId.split("read_message_")[1];
      const mural = await Mural.findOne({ userId: userId });

      if (!mural) {
        return interaction.reply({
          content: "Nenhum mural encontrado para o usuário.",
          ephemeral: true,
        });
      }

      const message = mural.messages.find((msg) => msg.id === messageId);

      if (!message) {
        return interaction.reply({
          content: "Mensagem não encontrada.",
          ephemeral: true,
        });
      }

      // Atualiza o status da mensagem para lido
      message.readed = true;
      await mural.save();

      // Responde com o título e conteúdo da mensagem
      return interaction.reply({
        content: `**Título:** ${message.title}\n**Mensagem ${message.index}:** ${message.content}`,
        ephemeral: true,
      });
    }

    if (interaction.customId === "list_all_messages") {
      const mural = await Mural.findOne({ userId: userId });

      if (!mural || mural.messages.length === 0) {
        return interaction.reply({
          content: "Você não tem mensagens no mural.",
          ephemeral: true,
        });
      }

      // Exibe todas as mensagens
      const allMessages = mural.messages
        .map((message) => {
          return `**Título:** ${message.title}\n**Mensagem ${
            message.index
          }:** ${message.content} - Lida: ${message.readed ? "Sim" : "Não"}`;
        })
        .join("\n");

      return interaction.reply({ content: allMessages, ephemeral: true });
    }
  },
};
