const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Cards = require("../../schema/card");
const checkAndAddRole = require("../../functions/checkRoleCards"); // Importe a função checkAndAddRole

module.exports = {
  data: new SlashCommandBuilder()
    .setName("card")
    .setDescription("Gerencia as advertências de um usuário.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Adiciona uma advertência a um usuário.")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("O usuário que receberá a advertência")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("check")
        .setDescription("Verifica a quantidade de advertências de um usuário.")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription(
              "O usuário cuja quantidade de advertências será verificada"
            )
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === "add") {
      await handleAddCard(interaction);
    } else if (subcommand === "check") {
      await handleCheckCards(interaction);
    }
  },
};

async function handleAddCard(interaction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const user = interaction.options.getUser("user");
    const issuer = interaction.user;

    let userData = await Cards.findOne({ user: user.id });

    if (!userData) {
      userData = new Cards({
        user: user.id,
        cards: 0,
      });
    }

    userData.cards += 1;
    await userData.save();

    await interaction.editReply({
      content: `🔴 Você advertiu ${user.username}. Eles agora têm ${userData.cards} advertências.`,
      ephemeral: true,
    });

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle("Você recebeu uma advertência!")
      .setDescription(
        `⚠️ Olá ${user}, você recebeu uma advertência de ${issuer.username}. Agora você tem ${userData.cards} advertências.`
      )
      .setImage("https://i.imgur.com/fdinBeP.png")
      .setTimestamp();

    await interaction.followUp({
      content: `${user}`, // Menciona o usuário
      embeds: [embed],
    });

    // Verifique se o usuário atingiu 10 cards e adicione o cargo
    const member = interaction.guild.members.cache.get(user.id);
    const roleId = "1275620987257229322"; // Substitua com o ID do cargo que deseja adicionar
    await checkAndAddRole(member, roleId);
  } catch (error) {
    console.error(error);
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(
        "❌ Ocorreu um erro ao adicionar as advertências."
      );
    } else {
      await interaction.reply(
        "❌ Ocorreu um erro ao adicionar as advertências."
      );
    }
  }
}

async function handleCheckCards(interaction) {
  try {
    const user = interaction.options.getUser("user");

    const userData = await Cards.findOne({ user: user.id });

    const cardCount = userData ? userData.cards : 0;

    await interaction.reply({
      content: `🔴 ${user.username} tem ${cardCount} advertências.`,
      ephemeral: true,
    });
  } catch (error) {
    console.error(error);
    await interaction.reply("❌ Ocorreu um erro ao verificar as advertências.");
  }
}
