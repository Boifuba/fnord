const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const ContadorDePau = require("../../schema/pauCount"); // Caminho para o seu modelo atualizado

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pau")
    .setDescription("Comandos relacionados ao contador de 'falar de paus'")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("registrar")
        .setDescription("Registra a data atual e reseta o contador.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("mostrar")
        .setDescription("Mostra o tempo atual e o recorde sem falar de pau.")
    ),

  async execute(interaction) {
    const agora = new Date();

    if (interaction.options.getSubcommand() === "registrar") {
      try {
        let registro = await ContadorDePau.findOne()
          .sort({ lastAccident: -1 })
          .exec();

        if (!registro) {
          // Cria um novo registro se não houver nenhum
          registro = new ContadorDePau({
            user: interaction.user.id,
            lastAccident: agora,
            recordeSemAcidente: 0,
          });
        } else {
          // Calcula o tempo desde o último acidente
          const ultimoAcidente = new Date(registro.lastAccident);
          const diferencaMs = agora - ultimoAcidente;

          // Atualiza o recorde se o tempo atual for maior que o anterior
          if (diferencaMs > registro.recordeSemAcidente) {
            registro.recordeSemAcidente = diferencaMs;
          }

          // Reseta o contador
          registro.lastAccident = agora;
        }

        await registro.save();

        const embed = new EmbedBuilder()
          .setTitle("Pau registrado!")
          .setDescription(
            "O contador foi resetado. Agora estamos em 0 horas e 0 minutos sem falar de pau."
          )
          .setColor(0xff0000)
          .setThumbnail("https://i.imgur.com/9LfpQF6.png"); // Substitua pela URL desejada

        await interaction.reply({ embeds: [embed] });
      } catch (error) {
        console.error("Erro ao registrar o incidente:", error);

        const embedErro = new EmbedBuilder()
          .setTitle("Erro")
          .setDescription("Houve um erro ao tentar registrar o incidente.")
          .setColor(0xff0000);

        await interaction.reply({ embeds: [embedErro] });
      }
    }

    if (interaction.options.getSubcommand() === "mostrar") {
      try {
        const registro = await ContadorDePau.findOne()
          .sort({ lastAccident: -1 })
          .exec();

        if (!registro) {
          // Se não houver registro
          const embed = new EmbedBuilder()
            .setTitle("Nenhum registro encontrado")
            .setDescription(
              "Ainda não temos nenhum incidente de falar de pau registrado."
            )
            .setColor(0xff0000);

          return interaction.reply({ embeds: [embed] });
        }

        const ultimoAcidente = new Date(registro.lastAccident);
        const diferencaMs = agora - ultimoAcidente;
        const diferencaHoras = Math.floor(diferencaMs / (1000 * 60 * 60));
        const diferencaMinutos = Math.floor(
          (diferencaMs % (1000 * 60 * 60)) / (1000 * 60)
        );

        const recordeHoras = Math.floor(
          registro.recordeSemAcidente / (1000 * 60 * 60)
        );
        const recordeMinutos = Math.floor(
          (registro.recordeSemAcidente % (1000 * 60 * 60)) / (1000 * 60)
        );

        const embed = new EmbedBuilder()
          .setTitle("Tempo sem falar de pau")
          .setDescription(
            `Estamos há ${diferencaHoras} horas e ${diferencaMinutos} minutos sem falar de pau.\n` +
              `Nosso recorde é de ${recordeHoras} horas e ${recordeMinutos} minutos.`
          )
          .setColor(0x00ff00)
          .setThumbnail("https://i.imgur.com/9LfpQF6.png"); // Substitua pela URL desejada

        await interaction.reply({ embeds: [embed] });
      } catch (error) {
        console.error("Erro ao mostrar o tempo sem falar de pau:", error);

        const embedErro = new EmbedBuilder()
          .setTitle("Erro")
          .setDescription(
            "Houve um erro ao tentar mostrar o tempo sem acidentes."
          )
          .setColor(0xff0000);

        await interaction.reply({ embeds: [embedErro] });
      }
    }
  },
};
