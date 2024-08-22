const Cards = require("../schema/card"); // Atualize o caminho conforme necessário

async function checkAndRemoveRoles(client, roleId) {
  try {
    const guildId = "721359044383866971"; // Substitua pelo ID do seu servidor
    const guild = client.guilds.cache.get(guildId);

    if (!guild) {
      console.error("Guild não encontrada com o ID:", guildId);
      return;
    }

    // Garante que a guilda foi completamente carregada
    const members = await guild.members.fetch();

    if (!members) {
      console.error("Não foi possível obter membros da guilda.");
      return;
    }

    // Busca todos os registros no banco de dados
    const userCards = await Cards.find();

    const currentDate = new Date();

    for (const userCard of userCards) {
      const member = members.get(userCard.user);

      if (member) {
        const recordedDate = new Date(userCard.lastRoleAdded);

        // Verifica se a data é válida
        // if (isNaN(recordedDate.getTime())) {
        //   console.error(
        //     "Data inválida encontrada para o usuário:",
        //     userCard.user
        //   );
        //   continue; // Pula para o próximo usuário se a data for inválida
        // }

        // Calcula a diferença em horas
        const diffInMs = currentDate - recordedDate;
        console.log(
          `Data registrada: ${recordedDate}, Data atual: ${currentDate}`
        );
        const diffInHours = diffInMs / (1000 * 60 * 60);

        // Verifica se a data registrada é mais de 24 horas atrás e se o membro tem o cargo
        if (diffInHours > 24 && member.roles.cache.has(roleId)) {
          // Remove o cargo do membro
          await member.roles.remove(roleId);
          console.log(`Cargo removido do usuário ${member.user.tag}`);

          // Opcional: Atualiza o registro no banco de dados, se necessário
          // Exemplo: userCard.lastRoleAdded = new Date(); // Atualiza a data
          // await userCard.save();
        }
      } else {
        console.log(`Membro com ID ${userCard.user} não encontrado na guilda.`);
      }
    }
  } catch (error) {
    console.error("Erro ao verificar e remover cargos:", error);
  }
}

module.exports = checkAndRemoveRoles;
