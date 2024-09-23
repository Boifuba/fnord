const { EmbedBuilder } = require("discord.js");
const Monark = require("../../schema/monarkSchema");

module.exports = async function addEmojiToTargetInCall(
  interaction,
  targetUser
) {
  try {
    // Verifica se o usuário está em um canal de voz
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply(
        "Você precisa estar em um canal de voz para usar este comando."
      );
    }

    // Verifica se o target está na mesma call
    const targetMember = voiceChannel.members.get(targetUser.id);
    if (!targetMember) {
      return interaction.reply(
        `${targetUser.username} não está na mesma call que você.`
      );
    }

    // Verifica o saldo do usuário
    const userBalance = await Monark.findOne({ userId: interaction.user.id });
    if (!userBalance || userBalance.balance < 3) {
      return interaction.reply(
        "Você precisa de pelo menos 3 moedas para alterar o nick do usuário."
      );
    }

    // Envia uma mensagem solicitando a reação com um emoji
    const emojiMessage = await interaction.reply({
      content: `Reaja essa mensagem com o emoji que deseja adicionar ao nome de ${targetUser.displayName}.`,
      fetchReply: true,
    });

    // Espera pela reação do emoji
    const filter = (reaction, user) => user.id === interaction.user.id;
    const collected = await emojiMessage.awaitReactions({
      filter,
      max: 1,
      time: 15000, // Tempo limite de 15 segundos
      errors: ["time"],
    });

    // Pega o emoji da reação
    const emoji = collected.first().emoji;

    // Adiciona o emoji ao nickname do target
    if (targetMember.manageable) {
      // Verifica se o bot tem permissão para mudar o nome do target
      await targetMember.setNickname(`${emoji} ${targetMember.displayName}`);

      // Subtrai 3 moedas do saldo do usuário
      userBalance.balance -= 3;
      await userBalance.save();

      // Confirma que o nome foi atualizado e as moedas foram retiradas
      const embed = new EmbedBuilder()
        .setColor("#00ff00")
        .setTitle("Emoji adicionado!")
        .setDescription(
          `O emoji ${emoji} foi adicionado ao nome de ${targetUser.username}. 3 moedas foram descontadas do seu saldo.`
        );

      return interaction.followUp({ embeds: [embed] });
    } else {
      return interaction.reply(
        `Não posso alterar o nome de ${targetUser.displayName}.`
      );
    }
  } catch (error) {
    console.error("Erro ao adicionar o emoji:", error);
    return interaction.reply("Ocorreu um erro ao tentar adicionar o emoji.");
  }
};
