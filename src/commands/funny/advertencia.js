const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Cards = require("../../schema/card");
const checkAndAddRole = require("../../functions/checkRoleCards");

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
              { name: "Art. 3º - Pesquisa e Citação ", value: "Pesquisa" },
              { name: "Art. 4º - Militância", value: "Militância" },
              {
                name: "Art. 5º - Foto de Anime ou Furry",
                value: "Foto de Anime",
              },
              {
                name: "Art. 6º - Falar mal do Menino Ney",
                value: "Neymar",
              },
              {
                name: "Art. 7º - Inventar Palabras",
                value: "Inventar Palavras",
              },
              {
                name: "MP Nº001 - Falar da Taylor Swift",
                value: "Taylor Swift",
              },
              {
                name: "MP Nº002 - Falar de Pau",
                value: "Falar de Pau",
              }
            )
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
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("list")
        .setDescription(
          "Lista todos os usuários com advertências, ordenados pelo número de advertências."
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("Remove uma advertência de um usuário.")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("O usuário do qual a advertência será removida")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === "add") {
      await handleAddCard(interaction);
    } else if (subcommand === "check") {
      await handleCheckCards(interaction);
    } else if (subcommand === "list") {
      await handleListCards(interaction);
    } else if (subcommand === "remove") {
      await handleRemoveCard(interaction);
    }
  },
};

async function handleAddCard(interaction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const user = interaction.options.getUser("user");
    const issuer = interaction.user;
    const motivo =
      interaction.options.getString("motivo") || "Nenhum motivo especificado";

    let userData = await Cards.findOne({ user: user.id });

    if (!userData) {
      userData = new Cards({
        user: user.id,
        cards: 0,
        totalCards: 0,
      });
    }

    userData.cards += 1;
    userData.totalCards += 1;
    await userData.save();

    await interaction.editReply({
      content: `🔴 Você advertiu ${user.displayName}. Eles agora têm ${userData.cards} advertências.`,
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

    // Verifique se o usuário atingiu 10 cards e adicione o cargo
    const member = interaction.guild.members.cache.get(user.id);
    const roleId = "1275620987257229322"; // Substitua com o ID do cargo que deseja adicionar
    const roleAdded = await checkAndAddRole(member, roleId);

    if (roleAdded) {
      userData.lastRoleAdded = new Date(); // Armazena a data de adição do cargo
      await userData.save();
    }
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
    const totalCardCount = userData ? userData.totalCards : 0;
    const lastRoleDate =
      userData && userData.lastRoleAdded
        ? userData.lastRoleAdded.toDateString()
        : "Nenhum cargo adicionado";

    await interaction.reply({
      content: `🔴 ${user.displayName} tem ${cardCount} advertências.\n📅 Total de advertências registradas: ${totalCardCount}.\n🗓 Data da última punição: ${lastRoleDate}.`,
      ephemeral: true,
    });
  } catch (error) {
    console.error(error);
    await interaction.reply("❌ Ocorreu um erro ao verificar as advertências.");
  }
}

async function handleListCards(interaction) {
  try {
    const allUsers = await Cards.find().sort({ cards: -1 });

    if (allUsers.length === 0) {
      return await interaction.reply({
        content: "🔍 Não há usuários com advertências registradas.",
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Lista de Usuários com Advertências")
      .setDescription(
        allUsers
          .map((userData) => {
            const user = interaction.guild.members.cache.get(userData.user);
            return `**${
              user ? user.displayName : "Usuário não encontrado"
            }**: ${userData.totalCards} advertências`;
          })
          .join("\n")
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  } catch (error) {
    console.error(error);
    await interaction.reply(
      "❌ Ocorreu um erro ao listar os usuários com advertências."
    );
  }
}

// Função para remover uma advertência
async function handleRemoveCard(interaction) {
  try {
    await interaction.deferReply({ ephemeral: true });

    const user = interaction.options.getUser("user");
    const userData = await Cards.findOne({ user: user.id });

    if (!userData || userData.cards === 0) {
      await interaction.editReply({
        content: `🔍 O usuário ${user.username} não tem advertências para remover.`,
        ephemeral: true,
      });
      return;
    }

    userData.cards -= 1; // Diminui o número de advertências
    await userData.save();

    await interaction.editReply({
      content: `🟢 Advertência removida com sucesso. ${user.username} agora tem ${userData.cards} advertências.`,
      ephemeral: true,
    });
  } catch (error) {
    console.error(error);
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(
        "❌ Ocorreu um erro ao remover a advertência."
      );
    } else {
      await interaction.reply("❌ Ocorreu um erro ao remover a advertência.");
    }
  }
}
