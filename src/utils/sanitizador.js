
const { UserModel } = require("../schema/words");
const preposicoes_e_artigos = require("../utils/wordFilter"); // Importe o array de palavras do wordTracking

async function sanitizeDatabase() {
  try {
    // Encontre todos os documentos na coleção "words"
    const allUsers = await UserModel.find();

    for (const user of allUsers) {
      // Filtrar as palavras usadas, mantendo apenas aquelas que não estão no filtro
      user.usedWords = user.usedWords.filter((wordObj) => !preposicoes_e_artigos.includes(wordObj.word));

      // Salvar o documento atualizado
      await user.save();
    }

    console.log("✅ Database sanitizada com sucesso.");
  } catch (error) {
    console.error(`⛔ Erro ao sanitizar a database: ${error}`);
  }
}

module.exports = sanitizeDatabase
