const Level = require("../../src/schema/Level");
const Presence = require("../../src/schema/monarkSchema");
const calculateLevelXp = require("../utils/calculateLevelXp");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.info(`✅ XP Giver está funcional.`);

    async function checkOnlineUsers() {
      const xpToGive = 1;
      const guild = client.guilds.cache.get("721359044383866971");

      guild.channels.cache
        .filter((channel) => channel.type === 2) // Filtra para pegar apenas canais de voz
        .forEach((channel) => {
          channel.members.each(async (member) => {
            const query = {
              userId: member.user.id,
              guildId: guild.id,
            };

            try {
              // Atualizando a DB de XP (Level)
              const level = await Level.findOne(query);

              if (level) {
                level.xp += xpToGive;
                await level.save();
              } else {
                const newLevel = new Level({
                  userId: member.user.id,
                  guildId: guild.id,
                  xp: xpToGive,
                });

                await newLevel.save();
              }

              // Atualizando a DB de Presence (monarkSchema)
              const presenceQuery = { userId: member.user.id };
              const presence = await Presence.findOne(presenceQuery);

              if (presence) {
                presence.points += xpToGive;
                presence.displayName = member.user.username; // Atualiza o nome, caso tenha mudado
                await presence.save();
              } else {
                const newPresence = new Presence({
                  userId: member.user.id,
                  displayName: member.user.username,
                  points: xpToGive,
                });

                await newPresence.save();
              }
            } catch (error) {
              console.warn(`⛔ Error updating XP or presence: ${error}`);
            }
          });
        });
    }

    setInterval(async () => {
      await checkOnlineUsers();
    }, 3600000);
  },
};
