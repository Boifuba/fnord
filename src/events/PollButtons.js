const { ButtonInteraction, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isButton()) return;
    const { customId } = interaction;
    const [action, messageId] = customId.split(/(?<=^\D+)(?=\d)/);
    const message = await interaction.channel.messages.fetch(messageId);
    const embed = message.embeds[0];
    const upVotesField = {
      name: "Votos à Favor",
      value: (
        parseInt(
          embed.fields.find((field) => field.name === "Votos à Favor").value
        ) + (action === "up" ? 1 : 0)
      ).toString(),
      inline: true,
    };
    const downVotesField = {
      name: "Votos Contra",
      value: (
        parseInt(
          embed.fields.find((field) => field.name === "Votos Contra").value
        ) + (action === "down" ? 1 : 0)
      ).toString(),
      inline: true,
    };

    const newEmbed = new EmbedBuilder(embed);
    newEmbed.spliceFields(0, 2, upVotesField, downVotesField);
    message.edit({ embeds: [newEmbed] });
  },
};
