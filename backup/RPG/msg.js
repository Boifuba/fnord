const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("msg")
    .setDescription("Mostra a xp do pessoal")
    .addRoleOption((option) =>
      option
        .setName("campaign")
        .setDescription("Escolha a campanha na lista")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("mensagem")
        .setDescription("digite a mensagem")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      if (!interaction.guild) {
        await interaction.reply(
          "Este comando só pode ser usado em uma guilda."
        );
        return;
      }

      const campaignRole = interaction.options.getRole("campaign");
      const mensagem = interaction.options.getString("mensagem");

      if (!campaignRole) {
        await interaction.reply(
          "A role da campanha não foi especificada corretamente."
        );
        return;
      }

      const members = await interaction.guild.members.fetch();
      members.forEach(async (member) => {
        try {
          if (member.roles.cache.has(campaignRole.id)) {
            await member.send(`  
              \n
              #  ${mensagem}
              
              \n`);
            }
        } catch (error) {
          console.error(
            `⛔ Erro ao enviar mensagem para ${member.user.tag}: ${error.message}`
          );
        }
      });

      await interaction.reply(
        "Mensagens enviadas para os membros da campanha."
      );
    } catch (error) {
      console.error(`⛔ Erro ao executar o comando: ${error.message}`);
    }
  },
};
✅