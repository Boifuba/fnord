const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("castigo")
    .setDescription("Coloca um usuário de castigo (timeout)")
    .addUserOption((option) =>
      option
        .setName("usuário")
        .setDescription("Usuário a ser punido")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("tempo")
        .setDescription("Tempo de castigo em minutos")
        .setRequired(true)
    ),

  async execute(interaction) {
    const usuario = interaction.options.getUser("usuário");
    const membro = interaction.guild.members.cache.get(usuario.id);
    const tempo = interaction.options.getInteger("tempo") * 60 * 1000; // converter minutos para milissegundos

    if (!membro) {
      return interaction.reply({
        content: "Usuário não encontrado no servidor.",
        ephemeral: true,
      });
    }

    try {
      await membro.timeout(tempo, "Colocado de castigo pelo bot");
      return interaction.reply({
        content: `${usuario.tag} foi colocado de castigo por ${
          tempo / 60000
        } minutos.`,
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: "Não foi possível colocar o usuário de castigo.",
        ephemeral: true,
      });
    }
  },
};
