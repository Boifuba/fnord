// src/events/checkOnlineUsers.js
const Presence = require("../../src/schema/presence"); // Ajuste o caminho conforme necessário

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.info(`✅ Sistema de decadência de pontos está funcionando`);

    async function reducePointsForOfflineUsers() {
      const guild = client.guilds.cache.get("721359044383866971");

      try {
        const allUsers = await Presence.find({});
        console.log(`🔍 Verificando ${allUsers.length} usuários na database.`);

        for (let user of allUsers) {
          const member = guild.members.cache.get(user.userId);

          if (!member || !member.voice.channel) {
            const pointsToDeduct = Math.max(
              Math.floor(user.points * 0.004167),
              1
            ); // Sempre pelo menos 1 ponto
            user.points -= pointsToDeduct;
            console.log(
              `⬇️ Usuário ${user.displayName} não está na call. Removendo ${pointsToDeduct} pontos.`
            );

            // Se os pontos caírem a 0 ou menos, remover da database
            if (user.points <= 0) {
              await Presence.deleteOne({ userId: user.userId });
              console.log(
                `🗑️ Usuário ${user.displayName} removido da database por ter 0 pontos.`
              );
            } else {
              await user.save();
              console.log(
                `💾 Novos pontos do usuário ${user.displayName}: ${user.points}`
              );
            }
          }
        }
      } catch (error) {
        console.error(`⛔ Erro ao reduzir pontos: ${error}`);
      }
    }

    // Executa a função a cada 1 hora para reduzir pontos de quem não está na call
    setInterval(async () => {
      console.log(
        "⏳ Iniciando verificação de usuários offline para reduzir pontos."
      );
      await reducePointsForOfflineUsers();
    }, 3600000); // 3600000 ms = 1 hora
  },
};
