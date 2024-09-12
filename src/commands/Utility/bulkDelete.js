const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bulkdelete")
    .setDescription("Deleta até 100 mensagens de uma lista padrão de canais."),

  async execute(interaction) {
    // Lista de IDs de canais padrão
    const canaisPadrao = [
      "1283362178652573749", //1
      "1283364602008047626", // 2
      "1283364536258396232", //3
      "1283364319253368883", //4
      "1283364403089117246", //Darkroom
      // Adicione mais IDs conforme necessário
    ];

    try {
      // Itera sobre cada canal na lista
      for (const canalId of canaisPadrao) {
        const canal = await interaction.client.channels.fetch(canalId);
        if (!canal || !canal.isTextBased()) {
          continue; // Ignora canais que não existem ou que não são de texto
        }

        // Busca e deleta até 100 mensagens do canal
        const fetchedMessages = await canal.messages.fetch({ limit: 100 });
        await canal.bulkDelete(fetchedMessages, true); // 'true' ignora mensagens com mais de 14 dias
        console.log(`Deletadas até 100 mensagens do canal: ${canalId}`);
      }

      await interaction.reply("Mensagens deletadas com sucesso!");
    } catch (error) {
      console.error(error);
      await interaction.reply(
        "Ocorreu um erro ao tentar deletar as mensagens."
      );
    }
  },
};
