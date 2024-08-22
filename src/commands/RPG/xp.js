const { SlashCommandBuilder } = require("discord.js");
const { EmbedBuilder } = require("@discordjs/builders");
const profileModel = require("../../schema/xp");
const date = new Date();
const timeString = date.toLocaleString();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("xplista")
    .setDescription("Mostra a xp do pessoal")
    .addRoleOption((option) =>
      option
        .setName("campaign")
        .setDescription("Escolha a campanha na lista")
        .setRequired(true)
    ),
  async execute(interaction, profileData) {
    await interaction.deferReply();

    const { username, id } = interaction.user;
    const { balance } = profileData;

    let leaderboardEmbed = new EmbedBuilder()
      .setTitle("Tabela de XP")
      .setColor(0x5506ce)
      .setThumbnail("https://i.imgur.com/902zrCA.png")
      .setFooter({
        text: `Xp distribuída em: ${timeString}`,
        iconURL: "https://i.imgur.com/s1AVkCg.png",
      });

    let campaignRole = interaction.options.getRole("campaign");
    let members = [];

    if (campaignRole) {
      // If a campaign role is provided, fetch members with that role
      members = await profileModel
        .find({ campanha: campaignRole.name })
        .sort({ balance: -1 })
        .catch((err) => console.log(err));
    } else {
      // Otherwise, fetch all members
      members = await profileModel
        .find()
        .sort({ balance: -1 })
        .catch((err) => console.log(err));
    }

    const memberIdx = members.findIndex((member) => member.userId === id);

    const topTen = members.slice(0, 10);

    let desc = "";
    for (let i = 0; i < topTen.length; i++) {
      let { user } = await interaction.guild.members.fetch(topTen[i].userId);
      if (!user) return;
      let userBalance = topTen[i].balance;
      desc += `${i + 1} - ** ${user.displayName}** ${userBalance} xp\n`;
    }
    if (desc !== "") {
      leaderboardEmbed.setDescription(desc);
    }
    await interaction.editReply({ embeds: [leaderboardEmbed] });
  },
};
