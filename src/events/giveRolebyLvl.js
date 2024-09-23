// Importações
const { EmbedBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;
const Level = require("../../src/schema/Level");

// Definição da matriz de cargos
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
          const cargo = cargos[level.level - 1]; // Obtém o cargo correspondente ao nível
          const role = guild.roles.cache.get(cargo.id);

          if (role) {
            if (!member.roles.cache.has(role.id)) {
              await member.roles.add(role);

              // Envie uma mensagem no canal desejado
              const channelId = "795347060667711488"; // Substitua pelo ID do canal desejado
              const channel = guild.channels.cache.get(channelId);

              if (channel) {
                const embed = new EmbedBuilder()
                  .setTitle("Irmãos e irmãs da Discordia.")
                  .setThumbnail(
                    member.user.displayAvatarURL({
                      dynamic: true,
                      size: 1024,
                    })
                  )
                  .setDescription(
                    `Com a ascensão de **${member.user.displayName}** ao cargo  **${cargo.nome}**. Reverenciem o poder do *Fnord* e prestem-lhe respeito. O Caos é nossa força.`
                  )
                  .setColor(0x5506ce);

                if (embed.description === "") {
                  embed.setDescription("\u200B"); // Adiciona um espaço em branco não visível
                }

                await channel.send({ embeds: [embed] });

                console.log(`✅ Mensagem enviada para o canal ${channel.name}`);
              } else {
                console.log(`⛔ Canal não encontrado com o ID ${channelId}`);
              }
            }
          } else {
            console.log(`⛔ Cargo não encontrado para o nível ${level.level}`);
          }
        }
      } catch (error) {
        console.log(`⛔ Erro ao atribuir cargo: ${error.message}`);
      }
    });
  } catch (error) {
    console.log(`⛔ Erro ao obter membros: ${error}`);
  }
};

module.exports = (client) => {
  const interval = 60 * 1000;

  setInterval(() => {
    const guild = client.guilds.cache.get("721359044383866971");
    if (guild) {
      checkAndUpdateRoles(guild);
    }
  }, interval);
};
