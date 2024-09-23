const Monark = require("../../schema/monarkSchema");
const { EmbedBuilder } = require("discord.js");

module.exports = async function transferir(interaction, targetUser) {
  let responseSent = false;

  try {
    // Solicita a quantidade de moedas
    const filter = (response) => {
      return (
        response.author.id === interaction.user.id &&
        !isNaN(response.content) &&
        response.content > 0
      );
    };

    await interaction.reply(
      "# Quanto você deseja transferir? Por favor, entre o valor."
    );
    responseSent = true; // Marca que a resposta inicial foi enviada

    // Coleta a resposta do usuário
    const collected = await interaction.channel.awaitMessages({
      filter,
      max: 1,
      time: 60000, // Tempo limite de 60 segundos
      errors: ["time"],
    });

    const amount = parseInt(collected.first().content);

    // Encontra os dados do remetente e do destinatário
    let senderData = await Monark.findOne({ userId: interaction.user.id });
    let recipientData = await Monark.findOne({ userId: targetUser.id });

    // Verifica se o remetente possui registro, se não, cria um novo
    if (!senderData) {
      senderData = new Monark({
        userId: interaction.user.id,
        user: interaction.user.username,
        balance: 0, // Pode ajustar conforme necessário
      });
    }

    // Verifica se o destinatário possui registro, se não, cria um novo
    if (!recipientData) {
      recipientData = new Monark({
        userId: targetUser.id,
        user: targetUser.username,
        balance: 0, // Pode ajustar conforme necessário
      });
    }

    // Verifica se a quantidade é um número positivo
    if (isNaN(amount) || amount <= 0) {
      if (!responseSent) {
        await interaction.reply(
          "A quantidade de moedas a ser transferida deve ser um número positivo."
        );
        responseSent = true;
      }
      return;
    }

    // Verifica se o remetente possui saldo suficiente
    if (senderData.balance < amount) {
      if (!responseSent) {
        await interaction.reply("Saldo insuficiente para a transferência.");
        responseSent = true;
      }
      return;
    }

    // Realiza a transferência de moedas
    senderData.balance -= amount;
    recipientData.balance += amount;

    // Salva as alterações no banco de dados
    await senderData.save();
    await recipientData.save();

    // Cria um embed para confirmar a transferência
    const embed = new EmbedBuilder()
      .setColor("#00ff00")
      .setTitle("Transferência de Moedas")
      .setDescription(
        `**${amount}** moedas foram transferidas com sucesso de ${interaction.user.username} para ${targetUser.username}.`
      )
      .setFooter({
        text: "Transferência concluída.",
      });

    // Envia a resposta com o embed
    if (!responseSent) {
      await interaction.reply({ embeds: [embed] });
      responseSent = true;
    } else {
      await interaction.editReply({ embeds: [embed] });
    }
  } catch (error) {
    console.error("Erro ao transferir moedas:", error);
    if (!responseSent) {
      await interaction.reply(
        "Ocorreu um erro ao tentar realizar a transferência."
      );
      responseSent = true;
    } else {
      await interaction.editReply(
        "Ocorreu um erro ao tentar realizar a transferência."
      );
    }
  }
};
