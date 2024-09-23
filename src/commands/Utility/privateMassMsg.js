const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("intimação")
    .setDescription("Intima todos os membros de um cargo.")
    .addRoleOption((option) =>
      option
        .setName("cargo") // Certifique-se de que este nome seja usado corretamente
        .setDescription("Escolha o cargo na lista")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("mensagem")
        .setDescription("Digite a mensagem")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      if (!interaction.guild) {
        await interaction.reply("Este comando só pode ser usado em chats");
        return;
      }

      const cargo = interaction.options.getRole("cargo"); // Nome corrigido para "cargo"
      const mensagem = interaction.options.getString("mensagem");

      if (!cargo) {
        await interaction.reply("O cargo não foi especificado corretamente.");
        return;
      }

      // Função para gerar um número aleatório de 4 dígitos
      const generateRandomNumber = () =>
        Math.floor(1000 + Math.random() * 9000);

      const members = await interaction.guild.members.fetch();
      members.forEach(async (member) => {
        try {
          if (member.roles.cache.has(cargo.id)) {
            // Nome ajustado
            const randomNumber = generateRandomNumber(); // Gera o número aleatório

            await member.send(`  
              \n

# Mensagem ${randomNumber}
\n

O Exmo. Sr. **Ministro Alexandre de Moraes**, do Supremo Tribunal Federal Rolando Dados, no uso de suas atribuições legais e regimentais, considerando a necessidade de comunicação das partes envolvidas no presente processo.


# ------------- INTIMAÇÃO ------------ \n
              \n ${mensagem}
# --------------------------------------- \n
\n
       Fica, assim, o intimado notificado de que deverá adotar as providências necessárias para o cumprimento da decisão, sob pena de tomar um cartão.

Publique-se. Cumpra-se.

`);
          }
        } catch (error) {
          console.error(
            `Erro ao enviar mensagem para ${member.user.tag}: ${error.message}`
          );
        }
      });

      await interaction.reply("Mensagens enviadas para os membros do cargo.");
    } catch (error) {
      console.error(`Erro ao executar o comando: ${error.message}`);
    }
  },
};
