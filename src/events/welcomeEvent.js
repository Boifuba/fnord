module.exports = async (member) => {
  
    const channelId = "1145186141050511410";
    const rulesChannel = "1082903487442067508";
    const avisosChannel = "1082905892053332008";
    const roleId = "729514915970285598"; 

    try {
      const role = member.guild.roles.cache.get(roleId);
      if (role) {
        await member.roles.add(role);
      }
    } catch (error) {
      console.error("Erro ao adicionar o cargo:", error);
    }
  
    const embed = {
      color: 0x5506ce,
      title: `Agora temos ${member.guild.memberCount} membros no servidor! `,
      description: ` <@${
        member.id
      }> Por favor leia as regras do canal em ${member.guild.channels.cache.get(
        rulesChannel
      )}. Sempre temos jogos abrindo, se quiser se juntar a algum, fique atento ao canal ${member.guild.channels.cache.get(
        avisosChannel
      )} `,
      thumbnail: {
        url: member.user.displayAvatarURL({ dynamic: true, size: 512 }),
      },
      fields: [
        {
          name: "Foundry",
          value: "[Login](https://campanhasdoboi.com.br/join)",
          inline: true,
        },
        {
          name: "Whatsapp",
          value: "[Entrar](https://chat.whatsapp.com/FYYI0Rf5WRyA4zcYWZYTJE)",
          inline: true,
        },
        {
          name: "GCS",
          value: "[Baixar](https://gurpscharactersheet.com/)",
          inline: true,
        },
      ],
    };
  
    const channel = member.guild.channels.cache.get(channelId);
    if (channel) {
      channel.send({ embeds: [embed] }).catch((error) => {
        console.error("Erro ao enviar mensagem de boas-vindas:", error);
      });
    } else {
      console.error(`Canal de boas-vindas não encontrado (ID: ${channelId})`);
    }
  };
  