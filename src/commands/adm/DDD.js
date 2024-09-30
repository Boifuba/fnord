const {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setpermissoes")
    .setDescription("Adiciona permissões a um cargo em um canal de voz.")
    .addChannelOption((option) =>
      option
        .setName("canal")
        .setDescription(
          "O canal de voz onde você deseja definir as permissões."
        )
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildVoice)
    )
    .addRoleOption((option) =>
      option
        .setName("cargo")
        .setDescription("O cargo que receberá as permissões.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("permissao")
        .setDescription("A permissão que você deseja adicionar.")
        .setRequired(true)
        .addChoices(
          { name: "Ver Canal", value: "ViewChannel" },
          { name: "Conectar", value: "Connect" },
          { name: "Falar", value: "Speak" },
          { name: "Desconectar", value: "Disconnect" }
          // Adicione mais permissões conforme necessário
        )
    ),
  async execute(interaction) {
    const channel = interaction.options.getChannel("canal");
    const role = interaction.options.getRole("cargo");
    const permission = interaction.options.getString("permissao");

    if (!channel || channel.type !== ChannelType.GuildVoice) {
      return interaction.reply("Por favor, selecione um canal de voz válido.");
    }

    // Define a permissão para o cargo
    await channel.permissionOverwrites.edit(role, {
      [PermissionFlagsBits[permission]]: true, // Adiciona a permissão
    });

    await interaction.reply(
      `Permissão **${permission}** adicionada ao cargo **${role.name}** no canal **${channel.name}**.`
    );
  },
};
