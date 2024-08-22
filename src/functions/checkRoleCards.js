const { GuildMember } = require("discord.js");
const Cards = require("../schema/card");

/**
 * Função para verificar os cards de um usuário e adicionar um cargo se necessário.
 * @param {GuildMember} member - O membro do Discord que será verificado.
 * @param {String} roleId - O ID do cargo a ser adicionado ao usuário.
 * @returns {Promise<void>}
 */
async function checkAndAddCard(member, roleId) {
  try {
    // Verifica se o membro é válido
    if (!member || !member.user) {
      console.error("Membro inválido ou usuário não encontrado.");
      return;
    }

    // Busca o usuário no banco de dados para obter os cards dele
    const userCards = await Cards.findOne({ user: member.id });

    // Verifica se o usuário tem 10 ou mais cards
    if (userCards && userCards.cards >= 2) {
      // Verifica se o membro já tem o cargo
      if (!member.roles.cache.has(roleId)) {
        // Adiciona o cargo ao membro
        await member.roles.add(roleId);
        console.log(`Cargo adicionado ao usuário ${member.user.tag}`);

        // Zera os cards após adicionar o cargo
        userCards.cards = 0;

        // Atualiza a data da última vez que o cargo foi adicionado
        userCards.lastRoleAdded = new Date();

        await userCards.save();
        console.log(
          `Cards zerados e data registrada para o usuário ${member.user.tag}`
        );
      } else {
        console.log(`${member.user.tag} já tem o cargo.`);
      }
    } else {
      console.log(`${member.user.tag} não tem 10 cards.`);
    }
  } catch (error) {
    console.error("Erro ao verificar e adicionar cargo:", error);
  }
}

module.exports = checkAndAddCard;
