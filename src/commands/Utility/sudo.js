const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// Lista de IDs de usuários autorizados
const authorizedUserIDs = [
  "273344193949204480", // beah
  "304065401996967936", //caio
  "345754926657568768", // Ravena
  "689899687620116500", // hakim
]; // IDs dos usuários permitidos

const notificationChannelID = "1053072305129013248"; // ID do canal onde a mensagem será enviada

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sudo")
    .setDescription(
      "Dá ao usuário que executou o comando um cargo temporário por 10 minutos."
    ),

  async execute(interaction) {
    const executor = interaction.member; // O usuário que executou o comando
    const roleID = "1279612577714016359"; // Cargo Ultra

    // Verifica se o ID do executor está na lista de IDs autorizados
    if (!authorizedUserIDs.includes(executor.id)) {
      return interaction.reply({
        content: "Você não está autorizado a receber este cargo.",
        ephemeral: true,
      });
    }

    // Obtém o cargo a partir do ID fornecido
    const role = interaction.guild.roles.cache.get(roleID);

    if (!role) {
      return interaction.reply({
        content: "Cargo inválido ou não encontrado.",
        ephemeral: true,
      });
    }

    // Adiciona o cargo ao membro que executou o comando
    await executor.roles.add(role);
    await interaction.reply(
      `${executor.user.tag} recebeu o cargo ${role.name} por 10 minutos.`
    );

    // Envia uma mensagem para o canal específico com um embed
    const channel = interaction.guild.channels.cache.get(notificationChannelID);
    if (channel) {
      const embed = new EmbedBuilder()
        .setColor(0xff0000) // Borda vermelha
        .setTitle("Cargo Atribuído")
        .setDescription(
          `O usuário ${executor.user.tag} (${
            executor.nickname || "sem nick"
          }) recebeu o cargo ${role.name}.`
        )
        .setThumbnail(executor.user.displayAvatarURL()) // Imagem do usuário
        .setTimestamp();

      channel.send({ embeds: [embed] });
    } else {
      console.error(`Canal com ID ${notificationChannelID} não encontrado.`);
    }

    // Remove o cargo após 10 minutos (600000 milissegundos)
    setTimeout(async () => {
      try {
        await executor.roles.remove(role);
        console.log(`Cargo ${role.name} foi removido de ${executor.user.tag}`);
      } catch (error) {
        console.error(`Erro ao remover o cargo: ${error}`);
      }
    }, 600000); // 600000ms = 10 minutos
  },
};
