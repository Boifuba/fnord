const { EmbedBuilder } = require("discord.js");
const Monark = require("../../../src/schema/monarkSchema");
const Cards = require("../../../src/schema/card");

async function getMemberFromId(guild, userId) {
  try {
    const member = await guild.members.fetch(userId);
    return member;
  } catch (error) {
    console.error(
      `Membro com ID ${userId} não encontrado na guilda. - Esse é o retorno errado? uno.js`
    );
    return null;
  }
}

module.exports = async function transferCards(interaction, targetUser) {
  const userId = interaction.user.id;
  const targetUserId = targetUser.id;

  try {
    console.log(
      `Iniciando transferência de cartões. Usuário: ${userId}, Alvo: ${targetUserId}`
    );

    // Verifica o saldo do usuário
    const user = await Monark.findOne({ userId });
    if (!user || user.balance < 10) {
      console.log(
        `Saldo insuficiente. Usuário: ${userId}, Saldo: ${
          user ? user.balance : "Não encontrado"
        }`
      );

      const embed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("Transferência Falhou")
        .setDescription(
          "Você precisa de pelo menos 10 moedas para usar este poder."
        )
        .setTimestamp();

      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    console.log(`Saldo verificado. Usuário: ${userId}, Saldo: ${user.balance}`);

    // Verifica e atualiza os cartões do usuário atual
    let userCards = await Cards.findOne({ user: userId });
    console.log(
      `Cartões do usuário atual encontrado no banco de dados:`,
      userCards
    );

    if (!userCards) {
      console.log(
        `Criando novo documento de cartões para o usuário: ${userId}`
      );
      userCards = new Cards({
        user: userId,
        cards: 0,
        totalCards: 0,
      });
    }

    if (userCards.cards < 1) {
      console.log(
        `Cartões insuficientes para transferência. Usuário: ${userId}, Cartões: ${userCards.cards}`
      );

      const embed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("Transferência Falhou")
        .setDescription("Você não tem cartões suficientes para transferir.")
        .setTimestamp();

      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    userCards.cards -= 1;
    userCards.totalCards -= 1;
    await userCards.save();
    console.log(`Cartões do usuário atual após subtração:`, userCards);

    // Verifica e atualiza os cartões do usuário alvo
    let targetCards = await Cards.findOne({ user: targetUserId });
    console.log(
      `Cartões do usuário alvo encontrado no banco de dados:`,
      targetCards
    );

    if (!targetCards) {
      console.log(
        `Criando novo documento de cartões para o alvo: ${targetUserId}`
      );
      targetCards = new Cards({
        user: targetUserId,
        cards: 0,
        totalCards: 0,
      });
    }

    targetCards.cards += 2;
    targetCards.totalCards += 2;
    await targetCards.save();
    console.log(`Cartões do usuário alvo após adição:`, targetCards);

    // Atualiza o saldo do usuário
    user.balance -= 10;
    await user.save();
    console.log(`Saldo do usuário após a transferência: ${user.balance}`);

    // Obtém membros da guilda usando o ID
    const member = await getMemberFromId(interaction.guild, userId);
    const targetMember = await getMemberFromId(interaction.guild, targetUserId);

    if (member) {
      console.log(`Membro encontrado: ${member.displayName}`);
    }

    if (targetMember) {
      console.log(`Membro alvo encontrado: ${targetMember.displayName}`);
    }

    const embed = new EmbedBuilder()
      .setColor("#00FF00")
      .setTitle("REVERSO")
      .setImage("https://i.imgur.com/93UoNdZ.jpeg")
      .setDescription(
        `Você cancelou a advertência que tomou e deu duas advertências em **${targetUser.displayName}** e gastou **10 moedas**.`
      );

    await interaction.reply({ embeds: [embed], ephemeral: true });
  } catch (error) {
    console.error(`Erro durante a transferência de cartões: ${error.message}`);
    const embed = new EmbedBuilder()
      .setColor("yellow")
      .setTitle("Erro")
      .setDescription("Ocorreu um erro ao tentar transferir cartões.")
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });
  }
};
