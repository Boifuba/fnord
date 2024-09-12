const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  data: new SlashCommandBuilder().setName("fnord").setDescription("fnord"),

  async execute(interaction) {
    await interaction.reply("fnord");
    await wait(2000);
    await interaction.editReply("# ILLUMINATI");
  },
};
