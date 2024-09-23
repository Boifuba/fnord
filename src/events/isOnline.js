module.exports = async (member) => {
  // Verifica se o membro está em um canal de voz
  const voiceChannel = member.voice.channel;

  if (voiceChannel) {
    // ID do canal de texto onde você deseja enviar a mensagem
    const channelId = "1233568263103840397"; // Substitua pelo ID real do canal de texto

    const message = `${member.displayName} entrou no canal de voz ${voiceChannel.name}.`;

    const channel = member.guild.channels.cache.get(channelId);
    if (channel) {
      channel.send(message).catch((error) => {
        console.error("Erro ao enviar mensagem para o canal:", error);
      });
    } else {
      console.error(`Canal de log não encontrado (ID: ${channelId})`);
    }
  }
};
