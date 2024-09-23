const Monark = require("../../src/schema/monarkSchema"); // Ajuste o caminho conforme necessário
const { EmbedBuilder } = require("discord.js");

module.exports = async function balance(interaction, targetUser) {
  try {
    // Consulta o banco de dados para obter o saldo do usuário
    const userData = await Monark.findOne({ userId: targetUser.id });

    // Cria o embed com o saldo
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle(`Saldo de ${targetUser.username}`)
      .setDescription(
        `O saldo atual é: ${userData ? userData.balance : "Não disponível"}`
      )
      .setTimestamp()
      .setFooter({ text: "Consulta de saldo" });

    // Envia o embed como resposta
    await interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error("Erro ao consultar o saldo:", error);
    await interaction.reply("Ocorreu um erro ao consultar o saldo.");
  }
};
