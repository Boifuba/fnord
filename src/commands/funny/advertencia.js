const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Cards = require("../../schema/card");
const checkAndAddRole = require("../../functions/checkRoleCards");
const Anarquia = require("../../schema/anarquia");

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
        .addStringOption((option) =>
          option
            .setName("motivo")
            .setDescription("O motivo da advertência")
            .setRequired(true)
            .addChoices(
              { name: "Art. 1º - Homofobia", value: "Homofobia" },
              { name: "Art. 2º - Fofoca incompleta", value: "Fofoca." },
              { name: "Art. 3º - Pesquisa e Citação", value: "Pesquisa" },
              { name: "Art. 4º - Militância", value: "Militância" },
              {
                name: "Art. 5º - Foto de Anime ou Furry",
                value: "Foto de Anime",
              },
              { name: "Art. 6º - Falar mal do Menino Ney", value: "Neymar" },
              {
                name: "Art. 7º - Inventar Palavras",
                value: "Inventar Palavras",
              },
              { name: "Art. 8º - Contestar Cartão", value: "Contestar Cartão" },
              {
                name: "MP Nº001 - Falar da Taylor Swift",
                value: "Taylor Swift",
              }
            )
        )
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === "add") {
      await handleAddCard(interaction);
    }
  },
};

async function handleAddCard(interaction) {
  try {
    await interaction.deferReply({ ephemeral: false });

    const user = interaction.options.getUser("user");
    const issuer = interaction.user;
    const motivo =
      interaction.options.getString("motivo") || "Nenhum motivo especificado";

    const anarquia = await Anarquia.findOne();
    if (anarquia && anarquia.estado) {
      const embed = new EmbedBuilder()
        .setColor("#FF0000")
        .setImage("https://i.imgur.com/fFlIVkp.jpeg")
        .setTitle("🔒 Anarquia Ativada")
        .setDescription(
          "Elon Musk garante que enquanto a anarquia estiver ativada, não é possível adicionar cartões."
        );

      await interaction.editReply({ embeds: [embed] });
      return;
    }

    let userData = await Cards.findOne({ user: user.id });

    if (!userData) {
      userData = new Cards({
        user: user.id,
        cards: 0,
        totalCards: 0,
        reasons: [],
      });
    }

    const currentTime = new Date();

    // Verifica se o usuário já tomou um cartão nos últimos 10 segundos
    const lastReason = userData.reasons[userData.reasons.length - 1];
    const timeSinceLastCard = lastReason
      ? currentTime - new Date(lastReason.timestamp)
      : null;

    if (timeSinceLastCard && timeSinceLastCard < 10000) {
      await interaction.editReply({
        content: `⚠️ ${user.displayName} ninguém pode ser punido duas vezes pelo mesmo crime! Sua acusação atendendo à circunstancia recebe indeferimento, cabendo a mim o dever do desatendimento à sua petição. `,
        ephemeral: true,
      });
      return;
    }

    // Adiciona o cartão e o timestamp
    userData.cards += 1;
    userData.totalCards += 1;
    userData.reasons.push({
      reason: motivo,
      timestamp: currentTime.toISOString(),
    });

    //console.log(`Timestamp: ${currentTime.toISOString()}`); // Exibe o timestamp no console

    await userData.save();

    await interaction.editReply({
      content: `🔴 Você advertiu ${user.displayName} que agora tem ${userData.cards} advertências.`,
      ephemeral: true,
    });

    const embed = new EmbedBuilder()
      .setColor("#ff0000")
      .setTitle(`Você recebeu um cartão!`)
      .setDescription(
        `⚠️ Olá ${user}, você recebeu uma advertência de ${issuer.displayName}. Agora você tem ${userData.cards} advertências, no total de ${userData.totalCards}`
      )
      .addFields({ name: "Motivo:", value: motivo })
      .setImage("https://i.imgur.com/fdinBeP.png")
      .setTimestamp();

    await interaction.followUp({
      content: `${user}`,
      embeds: [embed],
    });

    const member = interaction.guild.members.cache.get(user.id);
    const roleId = "1275620987257229322"; // Substitua com o ID do cargo que deseja adicionar
    const roleAdded = await checkAndAddRole(member, roleId);

    if (roleAdded) {
      userData.lastRoleAdded = new Date();
      await userData.save();
    }
  } catch (error) {
    console.error("Erro ao adicionar advertência:", error);
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
