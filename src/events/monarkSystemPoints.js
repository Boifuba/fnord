// src/events/checkOnlineUsers.js
const Monark = require("../../src/schema/monarkSchema");

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
            const query = {
              userId: member.user.id,
            };
            const mongoose = require("mongoose");

            const presenceSchema = new mongoose.Schema({
              userId: { type: String, required: true, unique: true },
              points: { type: Number, default: 0 },
              displayName: { type: String, required: true },
            });

            // Verifique se o modelo já foi definido
            const Presence =
              mongoose.models.Presence ||
              mongoose.model("Presence", presenceSchema);

            module.exports = Presence;

            try {
              const userBalance = await Monark.findOne(query);

              if (userBalance) {
                // Atualiza o saldo se o usuário já existir
                userBalance.balance += balanceToGive;
                await userBalance.save();
                // console.log(
                //   `  ${member.user.displayName}: ${userBalance.balance} 🪙`
                // );
              } else {
                // Cria um novo documento se o usuário não existir
                const newUserBalance = new Monark({
                  userId: member.user.id,
                  balance: balanceToGive,
                  user: member.user.displayName,
                });

                await newUserBalance.save();
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
    }, 3600000);
  },
};

//preciso ignorar se o cara tiver no AFK
