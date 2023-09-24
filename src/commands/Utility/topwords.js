const { SlashCommandBuilder, EmbedBuilder } = require("@discordjs/builders");
const { UserModel } = require("../../schema/words");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("topwords")
    .setDescription("Lista as 10 palavras mais usadas e quem mais as falou."),

  async execute(interaction) {
    try {
      const users = await UserModel.find({}).exec();

      const wordCounts = {};

      // Mapeia cada palavra usada por cada usuário e mantém o controle de quem a usou
      users.forEach((user) => {
        user.usedWords.forEach((wordObj) => {
          const word = wordObj.word;
          const count = wordObj.count;
          if (!wordCounts[word]) {
            wordCounts[word] = { count: 0, users: [] };
          }
          wordCounts[word].count += count;
          wordCounts[word].users.push({ userId: user.userId, count });
        });
      });

      // Converte o objeto em um array de pares [palavra, contagem]
      const wordCountArray = Object.entries(wordCounts);

      // Classifica o array em ordem decrescente de contagem
      wordCountArray.sort((a, b) => b[1].count - a[1].count);

      // Pega as 10 palavras mais usadas
      const topWords = wordCountArray.slice(0, 10);

      // Constrói uma resposta com as palavras mais usadas e quem mais as falou
      const response = topWords
        .map(([word, data], index) => {
          const users = data.users
            .sort((a, b) => b.count - a.count)
            .slice(0, 5) // Pega os 5 principais usuários que falaram essa palavra
            .map(
              (user, userIndex) =>
                `**✓** <@${user.userId}> (${user.count} vezes)`
            );
          return `${index}. **${word}**: ${data.count} vezes \n${users.join(
            "\n"
          )}`;
        })
        .join("\n\n");

      const embedmain = new EmbedBuilder()
        .setColor(0x5506ce)
        .setTitle("As 10 Palavras mais faladas")
        .setDescription(`${response}`)
        .setThumbnail("https://i.imgur.com/s1AVkCg.png");

      await interaction.reply({ embeds: [embedmain], ephemeral: true });
  
    } catch (error) {
      console.error(`⛔ Erro ao listar as palavras mais usadas: ${error}`);
      await interaction.reply(
        "⛔ Ocorreu um erro ao listar as palavras mais usadas."
      );
    }
  },
};
