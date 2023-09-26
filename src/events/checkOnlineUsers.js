const Level = require("../schema/Level")
const calculateLevelXp = require("../utils/calculateLevelXp");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`✅ Bot is working.`);

    async function checkOnlineUsers() {
      //console.log("🔼 Checking online users");

      const xpToGive = 1;
      const guild = client.guilds.cache.get("721359044383866971");
      const channel = guild.channels.cache.get("808369408241696818");

      if (channel.type !== 2) return;

      channel.members.each(async (member) => {
        const query = {
          userId: member.user.id,
          guildId: guild.id,
        };

        try {
          const level = await Level.findOne(query);

          if (level) {
            level.xp += xpToGive;
            await level.save();
            console.log(
              `✅ ${member.user.displayName} earned ${xpToGive} ${level.xp}/${calculateLevelXp(level.level)} `
            );
          } else {
            const newLevel = new Level({
              userId: member.user.id,
              guildId: guild.id,
              xp: xpToGive,
            });

            await newLevel.save();
             }
        } catch (error) {
          console.log(`⛔ Error giving xp: ${error}`);
        }
      });
    }

    // Executa a função a cada 10 minutos (10000 milissegundos)
    setInterval(async () => {
      await checkOnlineUsers();
    }, 600000);
  },
};
