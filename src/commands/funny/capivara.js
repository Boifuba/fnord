const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Cards = require("../../schema/card"); // Importa o modelo de cartão

module.exports = {
  data: new SlashCommandBuilder()
    .setName("capivara")
    .setDescription("Comandos relacionados à capivara.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("checar")
        .setDescription("Checa o número de cartões e a razão mais frequente.")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("O usuário que você deseja checar")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");

    try {
      const userData = await Cards.findOne({ user: user.id });

      if (!userData) {
        return await interaction.reply({
          content: `🔍 Nenhum dado encontrado para o usuário ${user.displayName}.`,
          ephemeral: false,
        });
      }

      const { cards, totalCards, reasons } = userData;
      const displayName = user.displayName;

      // Conta a frequência de cada razão
      const reasonFrequency = reasons.reduce((acc, { reason }) => {
        acc[reason] = (acc[reason] || 0) + 1;
        return acc;
      }, {});

      // Encontra a razão mais frequente
      const mostFrequentReason = Object.keys(reasonFrequency).reduce((a, b) =>
        reasonFrequency[a] > reasonFrequency[b] ? a : b
      );

      // Substitui a razão mais frequente pelo texto correspondente
      let crimeDescription = "";
      switch (mostFrequentReason) {
        case "Homofobia":
          crimeDescription = `O crime mais cometido por ${displayName} é o de homofobia.`;
          break;
        case "Fofoca.":
          crimeDescription = `O ${displayName} é recorrente em contar fofocas pela metade ou ficar de segredolas.`;
          break;
        case "Pesquisa":
          crimeDescription = `${displayName} acha que é um matuto intelectual e não sai sem conversar sem ficar tacando referências de Wikipedia que pesquisou na internetica.`;
          break;
        case "Militância":
          crimeDescription = `A soberana tem em ${displayName} como membro mais valioso ao qual representa toda a militância chata e insuportável que a gente não quer aqui.`;
          break;
        case "Foto de Anime":
          crimeDescription = `${displayName} tem desvios mentais ou sexuais e fica postando troço de bicho ou coisa de gente de pau pequeno.`;
          break;
        case "Neymar":
          crimeDescription = `${displayName} é uma pessoa louca e incapaz de entender a grandeza que o menino Ney tem e sua importância na história do futebol brasileiro.`;
          break;
        case "Inventar Palavras":
          crimeDescription = `${displayName} é um ser que é incapaz de usar um dicionário e ainda assim, para tentar não se expressar como um jumento, fica inventando palavras para parecer inteligente.`;
          break;
        case "Contestar Cartão":
          crimeDescription = `${displayName} provavelmente é uma pessoa mimada que não aceita as regras e tem dificuldade de viver em sociedade.`;
          break;
        case "Taylor Swift":
          crimeDescription = `${displayName} é uma vítima barata do mercado musical e não consegue tirá-la da cabeça mesmo que ela não faça a menor ideia de quem ${displayName} seja.`;
          break;
        default:
          crimeDescription = `Nenhum crime encontrado para ${displayName}.`;
          break;
      }

      const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle(`Capivara do ${displayName}`)
        .setThumbnail(user.displayAvatarURL({ format: "png", dynamic: true }))
        .setDescription(`${crimeDescription}`)
        .addFields(
          { name: "Número de Cartões", value: cards.toString(), inline: true },
          {
            name: "Total de Cartões",
            value: totalCards.toString(),
            inline: true,
          }
        )
        .setImage("https://i.imgur.com/BOZcS8R.jpeg") // Exibe a foto de perfil do usuário
        .setTimestamp();

      await interaction.reply({ embeds: [embed], ephemeral: false });
    } catch (error) {
      console.error(error);
      await interaction.reply("❌ Ocorreu um erro ao checar os dados.");
    }
  },
};
