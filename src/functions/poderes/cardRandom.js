const { EmbedBuilder } = require("discord.js");
const Monark = require("../../schema/monarkSchema");
const Cards = require("../../schema/card");

module.exports = async function addCardToUser(interaction, targetUser) {
  try {
    const issuer = interaction.user;

    // Verifica o saldo do usuário que está executando o comando
    const userBalance = await Monark.findOne({ userId: issuer.id });
    if (!userBalance || userBalance.balance < 10) {
      return interaction.reply(
        "Você precisa de pelo menos 10 moedas para dar um cartão."
      );
    }

    // Verifica se o targetUser já existe no banco de dados de cartões usando o ID do Discord
    let userCards = await Cards.findOne({ user: targetUser.id });

    if (!userCards) {
      // Se não existir, cria um novo documento para o usuário
      userCards = new Cards({
        user: targetUser.id,
        cards: 1,
        totalCards: 1,
        reasons: [{ reason: "Tomou um cartão aleatório" }],
      });
    } else {
      // Se já existir, incrementa os cartões e adiciona a razão
      userCards.cards += 1;
      userCards.totalCards += 1;
      userCards.reasons.push({ reason: "Tomou um cartão aleatório" });
    }

    // Salva a atualização no banco de dados
    await userCards.save();

    // Subtrai 10 moedas do saldo do usuário que executou o comando
    userBalance.balance -= 10;
    await userBalance.save();

    // Envia uma resposta confirmando a ação
    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("Você recebeu um cartão!")
      .setDescription(
        `⚠️ <@${targetUser.id}>, você tomou uma advertência de ${issuer.displayName} por simplesmente ser quem você é!`
      )
      .setImage("https://i.imgur.com/fdinBeP.png")

      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  } catch (error) {
    console.error("Erro ao adicionar o cartão:", error);
    return interaction.reply(
      "Ocorreu um erro ao tentar adicionar o cartão. Tente novamente."
    );
  }
};
