const { UserModel } = require("../schema/words");

const preposicoes_e_artigos = require("./wordFilter"); // Importe o array de palavras do wordTracking

async function handleMessage(msg) {
  if (msg.author.bot) return;

  const authorId = msg.author.id;
  const messageWords = msg.content.split(" ");

  let user = await UserModel.findOne({ userId: authorId });

  if (!user) {
    let newUser = new UserModel({
      userId: authorId,
      usedWords: [],
    });
    user = newUser;
  }

  for (const word of messageWords) {
    const lowercaseWord = word.toLowerCase();

    if (!preposicoes_e_artigos.includes(lowercaseWord)) {
      const existingWord = user.usedWords.find((w) => w.word === lowercaseWord);

      if (existingWord) {
        existingWord.count++;
      } else {
        user.usedWords.push({ word: lowercaseWord, count: 1 });
      }
    }
  }

  try {
    await user.save();
  } catch (error) {
    console.error(`Erro ao salvar usuário no banco de dados: ${error}`);
  }
}

module.exports = handleMessage;
