const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const ContadorDePau = require("../../schema/pauCount"); // Caminho para o seu modelo atualizado

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pau")
    .setDescription("Informa quanto tempo estamos sem falar de paus "),

  async execute(interaction) {
    try {
      const agora = new Date();
      // Busca o registro mais recente
      let registro = await ContadorDePau.findOne()
        .sort({ lastAccident: -1 })
        .exec();

      let descricao;
      const embed = new EmbedBuilder()
        .setTitle("Amamos falar de paus mas...")
        .setThumbnail("https://i.imgur.com/9LfpQF6.png"); // Substitua 'URL_DA_IMAGEM' pela URL que deseja usar

      if (!registro) {
        // Se não houver registros, cria um novo com a data atual
        console.log("Nenhum registro encontrado. Criando um novo...");
        registro = new ContadorDePau({
          user: interaction.user.id,
          lastAccident: agora,
        });
        await registro.save();

        descricao =
          "Este é o primeiro pau registrado. O contador foi iniciado.";
        embed.setColor(0x00ff00); // Cor verde para indicar sucesso
      } else {
        // Verifica se lastAccident é válido
        const ultimoAcidente = new Date(registro.lastAccident);

        if (isNaN(ultimoAcidente.getTime())) {
          // Se a data for inválida
          console.log("Data inválida encontrada. Resetando contador...");
          descricao = "Data inválida detectada. Resetando contador.";
          embed.setColor(0xff0000); // Cor vermelha para indicar erro
        } else {
          // Calcula a diferença em milissegundos
          const diferencaMs = agora - ultimoAcidente;
          const diferencaHoras = Math.floor(diferencaMs / (1000 * 60 * 60));
          const diferencaMinutos = Math.floor(
            (diferencaMs % (1000 * 60 * 60)) / (1000 * 60)
          );

          descricao = `Estamos a ${diferencaHoras} horas e ${diferencaMinutos} minutos sem falar de pau. O contador foi resetado.`;
          embed.setColor(0xff0000); // Cor vermelha para indicar alerta ou reinício
        }

        // Atualiza o registro com a data atual para resetar o contador
        console.log("Atualizando registro existente com nova data...");
        registro.lastAccident = agora;
        await registro.save();
      }

      embed.setDescription(descricao);
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(
        "Erro ao calcular e resetar o tempo sem falar de paus:",
        error
      );

      const embedErro = new EmbedBuilder()
        .setTitle("Erro")
        .setDescription(
          "Houve um erro ao calcular e resetar o tempo sem acidentes."
        )
        .setColor(0xff0000) // Cor vermelha para indicar erro
        .setThumbnail("https://i.imgur.com/9LfpQF6.png"); // Substitua 'URL_DA_IMAGEM' pela URL que deseja usar

      await interaction.reply({ embeds: [embedErro] });
    }
  },
};
