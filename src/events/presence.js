const Presence = require("../../src/schema/presence");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.info(`✅ Cargo distribuidor está funcional.`);

    const GUILD_ID = "721359044383866971";
    const ROLE_ID = "1285612089028644946";
    const EXCLUDED_ROLE_ID = "1275620987257229322";
    const EXLUDED_USER_ID = "412347780841865216"; // ID do usuário que não deve receber o cargo

    async function updateTop10OnlineUsersWithRole() {
      const guild = client.guilds.cache.get(GUILD_ID);

      if (!guild) {
        console.warn("⛔ Guilda não encontrada.");
        return;
      }

      try {
        // 1. Buscar todos os membros da guilda e filtrar os que estão online
        const members = await guild.members.fetch();
        const onlineMembers = members.filter((member) =>
          ["online", "idle", "dnd"].includes(member.presence?.status)
        );

        // 2. Filtrar membros que possuem o cargo EXCLUDED_ROLE_ID
        const validOnlineMembers = onlineMembers.filter(
          (member) => !member.roles.cache.has(EXCLUDED_ROLE_ID)
        );

        // 3. Buscar os IDs dos membros válidos online
        const validOnlineUserIds = validOnlineMembers.map(
          (member) => member.user.id
        );

        // 4. Buscar no banco de dados apenas os membros válidos que estão online e ordenar pelos pontos
        const validOnlineUsersInDB = await Presence.find({
          userId: { $in: validOnlineUserIds },
        })
          .sort({ points: -1 })
          .limit(10);

        // 5. Obter os IDs dos top 10 usuários online e sem o cargo excluído
        const top10OnlineUserIds = validOnlineUsersInDB.map(
          (user) => user.userId
        );

        // 6. Atribuir o cargo aos 10 melhores usuários online
        for (const userId of top10OnlineUserIds) {
          const member = validOnlineMembers.get(userId);

          // Verificação se o membro é o EXLUDED_USER_ID e não permitir que receba o cargo
          if (member && member.user.id === EXLUDED_USER_ID) {
            console.log(
              `⛔ O usuário ${member.displayName} está excluído de receber o cargo.`
            );
            continue; // Pula para o próximo membro
          }

          if (member && !member.roles.cache.has(ROLE_ID)) {
            await member.roles.add(ROLE_ID);
            console.log(`✅ Cargo adicionado para: ${member.displayName}`);
          }
        }

        // 7. Remover o cargo de quem não está no top 10 ou está offline
        members.forEach(async (member) => {
          if (
            member.roles.cache.has(ROLE_ID) &&
            !top10OnlineUserIds.includes(member.user.id)
          ) {
            await member.roles.remove(ROLE_ID);
            console.log(`❌ Cargo removido de: ${member.displayName}`);
          }
        });
      } catch (error) {
        console.error("⛔ Erro ao atualizar os cargos:", error);
      }
    }

    // Executa a função a cada 10 minutos (600000 milissegundos)
    setInterval(async () => {
      await updateTop10OnlineUsersWithRole();
    }, 600000); // Corrigido para 10 minutos
  },
};
