const { SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("xandão")
    .setDescription(
      "Faz o bot falar uma mensagem em um canal de texto associado a um canal de voz."
    )
    .addChannelOption((option) =>
      option
        .setName("canal_de_voz")
        .setDescription("O canal de voz que tem um canal de texto associado.")
        .addChannelTypes(ChannelType.GuildVoice)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("mensagem")
        .setDescription("A mensagem que o bot vai enviar.")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      await interaction.deferReply();

      const canalDeVoz = interaction.options.getChannel("canal_de_voz");
      const mensagem = interaction.options.getString("mensagem");

      // Encontrar o canal de texto associado ao canal de voz
      const canaisDeTexto = interaction.guild.channels.cache.filter(
        (canal) => canal.type === ChannelType.GuildText
      );

      const canalDeTexto = canaisDeTexto.find((canal) => {
        return canal.name.includes(canalDeVoz.name); // Assumindo que o nome do canal de texto inclui o nome do canal de voz
      });

      if (!canalDeTexto) {
        await interaction.editReply(
          "❌ Não há canais de texto associados ao canal de voz selecionado."
        );
        return;
      }

      // Enviar a mensagem no canal de texto
      await canalDeTexto.send(mensagem);

      await interaction.editReply(
        `✅ A mensagem foi enviada para o canal de texto ${canalDeTexto}.`
      );
    } catch (error) {
      console.error(error);
      if (interaction.deferred || interaction.replied) {
        await interaction.editReply("❌ Ocorreu um erro ao enviar a mensagem.");
      } else {
        await interaction.reply("❌ Ocorreu um erro ao enviar a mensagem.");
      }
    }
  },
};
