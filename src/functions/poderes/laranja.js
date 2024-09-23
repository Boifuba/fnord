const Monark = require("../../schema/monarkSchema");
const Card = require("../../schema/card");
const { EmbedBuilder } = require("discord.js");

module.exports = async function trocaCartoes(interaction, targetUser) {
  try {
    const userId = interaction.user.id;
    const targetId = targetUser.id;

    // Busca os dados de cartões do usuário e do alvo
    const userCardData = await Card.findOne({ user: userId });
    const targetCardData = await Card.findOne({ user: targetId });

    // Define os valores como zero se não existir dados no banco
    const userCards = userCardData ? userCardData.cards : 0;
    const userTotalCards = userCardData ? userCardData.totalCards : 0;
    const userReasons = userCardData ? userCardData.reasons : [];

    const targetCards = targetCardData ? targetCardData.cards : 0;
    const targetTotalCards = targetCardData ? targetCardData.totalCards : 0;
    const targetReasons = targetCardData ? targetCardData.reasons : [];

    // Troca os dados de cartões entre o usuário e o alvo
    if (userCardData) {
      userCardData.cards = targetCards;
      userCardData.totalCards = targetTotalCards;
      userCardData.reasons = targetReasons;
      await userCardData.save();
    } else {
      // Cria novo registro para o usuário com os valores do target
      await Card.create({
        user: userId,
        cards: targetCards,
        totalCards: targetTotalCards,
        reasons: targetReasons,
      });
    }

    if (targetCardData) {
      targetCardData.cards = userCards;
      targetCardData.totalCards = userTotalCards;
      targetCardData.reasons = userReasons;
      await targetCardData.save();
    } else {
      // Cria novo registro para o alvo com os valores do usuário
      await Card.create({
        user: targetId,
        cards: userCards,
        totalCards: userTotalCards,
        reasons: userReasons,
      });
    }

    // Resposta de sucesso
    const embed = new EmbedBuilder()
      .setTitle("Troca de Cartões")
      .setDescription(
        `Os cartões entre ${interaction.user.displayName} e ${targetUser.displayName} foram trocados com sucesso!`
      )
      .setColor(0x00ff00);
    await interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error("Erro ao trocar cartões:", error);
    await interaction.reply("Ocorreu um erro ao tentar trocar os cartões.");
  }
};
