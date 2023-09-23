module.exports = async (member) => {
  console.log("🔥 Alguém saiu do servidor");

  const channelId = "1053072305129013248";

  const embed = {
    color: 0xff1a00,
    title: `Um membro saiu. `,
    description: ` ${member.user.username} saiu do servidor`,
    thumbnail: {
      url: member.user.displayAvatarURL({ dynamic: true, size: 1024 }),
    },
  };

  const channel = member.guild.channels.cache.get(channelId);
  if (channel) {
    channel.send({ embeds: [embed] }).catch((error) => {
      console.error("Erro ao logar membro", error);
    });
  } else {
    console.error(`Canal de log não encontrado (ID: ${channelId})`);
  }
  console.log("🔥 Função logRemove concluída.");
};
