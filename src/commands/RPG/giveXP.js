const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const profileModel = require("../../schema/xp");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("xp")
    .setDescription("Access to admin commands")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Add coins to user balance")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("User you want to add coins to")
            .setRequired(true)
        )
        .addRoleOption((option) =>
          option
            .setName("campaign")
            .setDescription("Campaign for which to add coins")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("amount")
            .setDescription("The amount of coins to add")
            .setRequired(true)
            .setMinValue(1)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("subtract")
        .setDescription("Subtract coins from user balance")
        .addRoleOption((option) =>
          option
            .setName("campaign")
            .setDescription("Campaign for which to subtract coins")
            .setRequired(true)
        )
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("User you want to subtract coins from")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("amount")
            .setDescription("The amount of coins to subtract")
            .setRequired(true)
            .setMinValue(1)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("all")
        .setDescription("Subtract coins from user balance")
        .addRoleOption((option) =>
          option
            .setName("campaign")
            .setDescription("Campaign for which to subtract coins")
            .setRequired(true)
        )
        .addIntegerOption((option) =>
          option
            .setName("amount")
            .setDescription("The amount of coins to subtract")
            .setRequired(true)
            .setMinValue(1)
        )
    ),

  async execute(interaction) {
    await interaction.deferReply();
    const adminSubcommand = interaction.options.getSubcommand();

    if (adminSubcommand === "add") {
      const user = interaction.options.getUser("user");
      const campaignRole = interaction.options.getRole("campaign");
      const campaign = campaignRole.name;
      const amount = interaction.options.getInteger("amount");

      let userProfile = await profileModel.findOne({
        userId: user.id,
      });

      if (!userProfile) {
        userProfile = new profileModel({
          userId: user.id,
          balance: 0,
          campanha: campaign,
          user: user.displayName, // Corrigido aqui
        });
      }

      userProfile.balance += amount;
      userProfile.campanha = campaign;
      await userProfile.save();

      await interaction.editReply({
        content: `Added ${amount} xp to ${user.username} for campaign ${campaign}`,
        ephemeral: true,
      });
    }
    ///////////////////////////////////////////////////////////////////////////
    if (adminSubcommand === "all") {
      const amount = interaction.options.getInteger("amount");
      const campaignRole = interaction.options.getRole("campaign");
      const campaign = campaignRole.name;

      // Filtra apenas os membros que têm o cargo desejado
      const membersWithRole = interaction.guild.members.cache.filter((member) =>
        member.roles.cache.has(campaignRole.id)
      );

      const memberPromises = membersWithRole.map(async (member) => {
        try {
          let userProfile = await profileModel.findOne({
            userId: member.user.id,
          });

          if (!userProfile) {
            userProfile = new profileModel({
              userId: member.user.id,
              balance: 0,
              campanha: campaign,
              user: member.user.displayName, // Corrigido aqui
            });
          }

          userProfile.balance += amount;
          userProfile.campanha = campaign;

          await userProfile.save();
          console.log(`✅ ${member.user.displayName} earnd ${amount}!`);
        } catch (error) {
          console.error(`Não consegui enviar os pontos: ${error.message}`);
        }
      });

      await interaction.editReply(
        `🔥 Todos os jogadores de ${campaign} receberam xp!`
      );
      console.log(`✅ XP given to ${campaign}`);
    }

    //////////////////////////////////////////////////////////////////
    if (adminSubcommand === "subtract") {
      const user = interaction.options.getUser("user");
      const amount = interaction.options.getInteger("amount");
      const campaignRole = interaction.options.getRole("campaign");
      const campaign = campaignRole.name;

      let userProfile = await profileModel.findOne({
        userId: user.id,
      });

      if (!userProfile) {
        userProfile = new profileModel({
          userId: user.id,
          balance: 0,
          campanha: campaign,
          user: user.name, // Corrigido aqui
        });
      }

      userProfile.balance -= amount;
      userProfile.campanha = campaign;
      await userProfile.save();

      await interaction.editReply({
        content: `Subtracted ${amount} xp from ${user.username} for campaign ${campaign}`,
        ephemeral: true,
      });
    }
  },
};
