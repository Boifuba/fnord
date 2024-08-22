const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const Mural = require("../../schema/Message"); // Importa o modelo Mural

module.exports = {
  data: new SlashCommandBuilder()
    .setName("torpedo")
    .setDescription("Ler mensagens não lidas")
    .addSubcommand((subcommand) =>
      subcommand.setName("novos").setDescription("Listar mensagens não lidas")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("todos").setDescription("Listar todas as mensagens")
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const userId = interaction.user.id;

    // Busca mensagens no banco de dados
    const mural = await Mural.findOne({ userId: userId });
    if (!mural || mural.messages.length === 0) {
      return interaction.reply({
        content: "Você não tem mensagens no mural.",
        ephemeral: true,
      });
    }

    let messagesToDisplay;

    if (subcommand === "novos") {
      messagesToDisplay = mural.messages.filter((msg) => !msg.readed);
      if (messagesToDisplay.length === 0) {
        return interaction.reply({
          content: "Você não tem mensagens não lidas.",
          ephemeral: true,
        });
      }
    } else if (subcommand === "todos") {
      messagesToDisplay = mural.messages;
    }

    // Cria botões para cada mensagem usando o título
    const buttons = messagesToDisplay.map((message) => {
      return new ButtonBuilder()
        .setCustomId(`read_message_${message.id}`)
        .setLabel(message.title) // Exibe o título da mensagem
        .setStyle(ButtonStyle.Primary);
    });

    // Adiciona um botão para listar todas as mensagens
    const listAllButton = new ButtonBuilder()
      .setCustomId("list_all_messages")
      .setLabel("Listar todas as mensagens")
      .setStyle(ButtonStyle.Secondary);

    // Adiciona os botões em uma linha
    const row = new ActionRowBuilder().addComponents([
      ...buttons,
      listAllButton,
    ]);

    // Envia a mensagem com os botões
    await interaction.reply({
      content: "Selecione uma mensagem para ler:",
      components: [row],
      ephemeral: true,
    });
  },
};
