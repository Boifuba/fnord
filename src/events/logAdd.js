module.exports = async (member) => {
  console.log("🔥 Alguém entrou no servidor");

  const channelId = "1053072305129013248";

  const embed = {
    color: 0x99ff00,
    title: `Um membro entrou. `,
    description: ` <@${member.user.username}> entrou no servidor `,
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
  console.log("🔥 Função addLog concluída.");
};
