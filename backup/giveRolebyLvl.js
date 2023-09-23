const { EmbedBuilder } = require("discord.js"); // Certifique-se de que a classe se chama "EmbedBuilder" se estiver usando uma biblioteca que a tenha

const Level = require("../schema/Level");

const cargos = [
  { id: "729514915970285598", nome: "NPC Aleatório" },
  { id: "1146395708858056754", nome: "NPC Menor" },
  { id: "1146213602081116232", nome: "NPC Maior" },
  { id: "1146367108654047302", nome: "Personagem do Jogador" },
  { id: "1146367258189365348", nome: "Jogador Mediano" },
  { id: "1146367454885453864", nome: "Jogador Competente" },
  { id: "1146367541913075742", nome: "Jogador Talentoso" },
  { id: "1146367786822664262", nome: "Exceptional" },
  { id: "1146367927826788372", nome: "Heroic" },
  { id: "1146368050665357322", nome: "Large-than-life" },
  { id: "1146213602081116232", nome: "Super de Poucos pontos!" },
  { id: "1146369307119456276", nome: "Lendário" },
  { id: "1146213602081116232", nome: "Major NPC" },
  { id: "1146213602081116232", nome: "Major NPC" },
  { id: "1146213602081116232", nome: "Major NPC" },
];

const checkAndUpdateRoles = async (guild) => {
  try {
    const members = await guild.members.fetch();

    members.forEach(async (member) => {
      const query = {
        userId: member.user.id,
        guildId: guild.id,
      };

      try {
        const level = await Level.findOne(query);

        if (level) {
          const cargo = cargos[level.level - 1];
          const role = guild.roles.cache.get(cargo.id);

          if (role) {
            if (!member.roles.cache.has(role.id)) {
              await member.roles.add(role);
            }

            // Verifique se o jogador subiu de nível
            const previousLevel = level.level - 1;
            if (previousLevel < 1) {
              return; // Não há nível anterior para comparar
            }

            // Verifique se o jogador subiu de nível
            if (level.level > previousLevel) {
              // Envie uma mensagem no canal desejado
              const channelId = "1140345961634353235"; // Substitua pelo ID do canal desejado
              const channel = guild.channels.cache.get(channelId);

              if (channel) {
                const embed = new EmbedBuilder()
                  .setTitle("Parabéns!")
                  .setDescription(
                    `O jogador ${member.user.tag} subiu para o nível ${level.level}!`
                  )
                  .setColor("#00ff00"); // Cor da mensagem (verde neste caso)

                await channel.send(embed);
                console.log(`Mensagem enviada para o canal ${channel.name}`);
              } else {
                console.log(`Canal não encontrado com o ID ${channelId}`);
              }
            }
          } else {
            console.log(`Cargo não encontrado para o nível ${level.level}`);
          }
        }
      } catch (error) {
        console.log(`Erro ao atribuir cargo: ${error}`);
      }
    });
  } catch (error) {
    console.log(`Erro ao obter membros: ${error}`);
  }
};

module.exports = (client) => {
  const interval = 1 * 1000;

  setInterval(() => {
    const guild = client.guilds.cache.get("721359044383866971");
    if (guild) {
      checkAndUpdateRoles(guild);
    }
  }, interval);
};
