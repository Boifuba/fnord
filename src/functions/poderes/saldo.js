const Monark = require("../../schema/monarkSchema");
const { EmbedBuilder } = require("discord.js");

module.exports = async function balance(interaction, targetUser) {
  try {
    const userData = await Monark.findOne({ userId: targetUser.id });

    // Cria o embed com o saldo
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setImage("https://i.imgur.com/ZRkSeR2.png")
      .setTitle(`Banco Nacional do Desenvolvimento Rolando Dados`)
      .setDescription(
        ` O saldo de ${targetUser.displayName} é de **${
          userData ? userData.balance : "Não disponível"
        }** moedas`
      )

      .setFooter({
        text: "Saldo sujeito à alteração até o fim do expediente bancário.",
      });

    // Envia o embed como resposta
    await interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error("Erro ao consultar o saldo:", error);
    await interaction.reply("Ocorreu um erro ao consultar o saldo.");
  }
};
