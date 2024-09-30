// src/events/checkOnlineUsers.js
const Presence = require("../../src/schema/presence"); // Ajuste o caminho conforme necessário

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.info(`✅ Sistema de pontos está funcionando`);

    async function checkOnlineUsers() {
      const balanceToGive = 1;
      const guild = client.guilds.cache.get("721359044383866971");

      guild.channels.cache
        .filter((channel) => channel.type === 2) // Filtra para pegar apenas canais de voz
        .forEach((channel) => {
          channel.members.each(async (member) => {
            // Ignorar usuários mutados ou surdos
            if (member.voice.mute || member.voice.deaf) {
              // console.log(
              //   `🔕 Ignorando ${member.user.displayName} (mutado ou surdo)`
              // );
              return;
            }

            const query = {
              userId: member.user.id,
            };

            try {
              const userPresence = await Presence.findOne(query);

              if (userPresence) {
                // Atualiza os pontos se o usuário já existir
                userPresence.points += balanceToGive;
                await userPresence.save();
                // console.log(
                //   `  ${member.user.displayName}: ${userPresence.points} 🪙`
                // );
              } else {
                // Cria um novo documento se o usuário não existir
                const newUserPresence = new Presence({
                  userId: member.user.id,
                  displayName: member.user.username,
                  points: balanceToGive,
                });

                await newUserPresence.save();
                console.log(
                  `💰 Novo saldo criado para ${member.user.displayName}`
                );
              }
            } catch (error) {
              console.warn(`⛔ Erro ao dar pontos: ${error}`);
            }
          });
        });
    }

    // Executa a função a cada 10 minutos (600000 milissegundos)
    setInterval(async () => {
      await checkOnlineUsers();
    }, 60000);
  },
};
