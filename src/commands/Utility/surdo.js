const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("deafusers")
    .setDescription("Lista ."),

  async execute(interaction) {
    try {
      await interaction.deferReply();

      const voiceUsers = [];

      const guild = interaction.guild;

      guild.channels.cache.forEach((channel) => {
        if (channel.type === 2) {
          channel.members.forEach((member) => {
            const muteStatus = member.voice.mute ? "mutado" : "não mutado";
            const deafStatus = member.voice.deaf ? "surdo" : "não surdo";
            voiceUsers.push(
              `${member.user.tag} - ${muteStatus}, ${deafStatus}`
            );
          });
        }
      });

      if (voiceUsers.length > 0) {
        await interaction.editReply(
          `Usuários nos canais de voz:\n${voiceUsers.join("\n")}`
        );
      } else {
        await interaction.editReply(
          "Nenhum usuário encontrado em canais de voz."
        );
      }
    } catch (error) {
      console.error(error);
      await interaction.followUp({
        content: "Algo deu errado!",
        ephemeral: true,
      });
    }
  },
};
