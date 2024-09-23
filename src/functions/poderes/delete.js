const Cards = require("../../schema/card");
const Monark = require("../../schema/monarkSchema");
const { EmbedBuilder } = require("discord.js");

module.exports = async function removeLastCard(interaction, targetUser) {
  try {
    // Encontra os dados do usuário para verificar o saldo
    const userBalance = await Monark.findOne({ userId: targetUser.id });

    // Verifica se o usuário possui um registro no esquema de saldo
    if (!userBalance) {
      return interaction.reply(
        `Nenhum registro de saldo encontrado para ${targetUser.displayName}.`
      );
    }

    // Verifica se o saldo é suficiente
    if (userBalance.balance >= 5) {
      // Subtrai 5 moedas do saldo do usuário
      userBalance.balance -= 5;
      await userBalance.save();

      // Encontra os dados do cartão do usuário
      const userData = await Cards.findOne({ user: targetUser.id });

      // Verifica se o usuário possui registros de cartão
      if (!userData) {
        return interaction.reply(
          `Nenhum registro de cartões encontrado para ${targetUser.displayName}.`
        );
      }

      // Verifica se o usuário tem algum cartão e motivos registrados
      if (userData.totalCards > 0 && userData.reasons.length > 0) {
        // Remove 1 de totalCards e o último item do array de reasons
        userData.totalCards -= 1;
        userData.reasons.pop(); // Remove o último motivo do array

        // Salva as alterações no banco de dados
        await userData.save();

        // Cria um embed para confirmar a remoção
        const embed = new EmbedBuilder()
          .setColor("#ff0000")
          .setTitle(`Remoção de Cartão`)
          .setDescription(
            `1 cartão foi removido de ${targetUser.displayName}. Total de cartões agora: **${userData.totalCards}**. 5 moedas foram descontadas do saldo.`
          )
          .setFooter({
            text: "Último cartão e motivo removidos com sucesso.",
          });

        // Envia a resposta com o embed
        return interaction.reply({ embeds: [embed] });
      } else {
        return interaction.reply(
          `${targetUser.displayName} não possui cartões ou motivos registrados.`
        );
      }
    } else {
      return interaction.reply(
        `${targetUser.displayName} não possui saldo suficiente para remover um cartão.`
      );
    }
  } catch (error) {
    console.error("Erro ao remover o cartão:", error);
    return interaction.reply("Ocorreu um erro ao tentar remover o cartão.");
  }
};
