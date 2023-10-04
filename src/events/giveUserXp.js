const calculateLevelXp = require("../utils/calculateLevelXp");
const Level = require("../schema/Level");
const cooldowns = new Set();

function getRandomXp(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *
 * @param {Client} client
 * @param {Message} message
 * @param {Object} xpPerLevel - Objeto de configuração de XP por nível
 */
module.exports = async (client, message, xpPerLevel) => {
  if (
    !message.inGuild() ||
    message.author.bot ||
    cooldowns.has(message.author.id)
  )
    return;

  const query = {
    userId: message.author.id,
    guildId: message.guild.id,
  };

  try {
    const level = await Level.findOne(query);
    let xpToGive = getRandomXp(1, 2);


    if (message.attachments.size > 0) {
   
      xpToGive *= message.attachments.size;
    }

    if (level) {
      level.xp += xpToGive;

      console.log(`✅ ${message.member.displayName}: ${level.xp}/${calculateLevelXp(level.level)} XP`);
      

      if (level.xp >= calculateLevelXp(level.level)) {
        level.xp = 0;
        level.level += 1;

        console.log(`✅ ${message.member.displayName} subiu de nível ${level.level}`);
        
      }

      await level.save().catch((e) => {
        console.log(`⛔ Error saving updated level ${e}`);
        return;
      });

      cooldowns.add(message.author.id);
      setTimeout(() => {
        cooldowns.delete(message.author.id);
      }, 100);
    } else {
      const newLevel = new Level({
        userId: message.author.id,
        guildId: message.guild.id,
        xp: xpToGive,
      });

      await newLevel.save();
      cooldowns.add(message.author.id);
      setTimeout(() => {
        cooldowns.delete(message.author.id);
      }, 100);
    }
  } catch (error) {
    console.log(`⛔ Error giving xp: ${error}`);
  }
};
