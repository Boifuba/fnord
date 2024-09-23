const { SlashCommandBuilder } = require("discord.js");
const Canvas = require("canvas");
const { AttachmentBuilder } = require("discord.js");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("conselho")
    .setDescription("Escreve um texto em cima de uma imagem")
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("Usuário para marcar")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("texto")
        .setDescription("Texto para escrever na imagem")
        .setRequired(true)
    ),

  async execute(interaction) {
    const texto = interaction.options.getString("texto");
    const usuario = interaction.options.getUser("usuario");

    const textoFormatado = `"${texto}"`;
    const canvas = Canvas.createCanvas(1400, 500);
    const context = canvas.getContext("2d");

    // Carregar a fonte TTF personalizada
    Canvas.registerFont(path.join(__dirname, "neue.ttf"), {
      family: "neue",
    });

    const background = await Canvas.loadImage(path.join(__dirname, "bobo.png"));
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    const textArea = {
      x: 10,
      y: 90,
      width: 900,
      height: 400,
    };

    // Aplicar a fonte registrada
    context.font = "68px neue";
    context.fillStyle = "#ffffff";
    context.textAlign = "center"; // Centralizado horizontalmente

    function wrapText(context, text, x, y, maxWidth) {
      const words = text.split(" ");
      let line = "";
      let lines = [];
      const lineHeight = 70;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
          lines.push(line);
          line = words[i] + " ";
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      return {
        lines,
        lineHeight,
      };
    }

    const { lines, lineHeight } = wrapText(
      context,
      textoFormatado,
      textArea.x,
      textArea.y,
      textArea.width - 20
    );

    const textX = textArea.x + textArea.width / 2; // Centralizado horizontalmente
    const textY = textArea.y + 40;

    const totalTextHeight = lines.length * lineHeight;
    const verticalPadding = (textArea.height - totalTextHeight) / 2;

    const adjustedTextY = textY + verticalPadding;

    for (let i = 0; i < lines.length; i++) {
      context.fillText(lines[i], textX, adjustedTextY + i * lineHeight);
    }

    const attachment = new AttachmentBuilder(canvas.toBuffer(), {
      name: "imagem-com-texto.png",
    });

    await interaction.reply({
      content: `Eu tenho um conselho de vida para ${usuario}, a próxima será uma sentença!`,
      files: [attachment],
    });
  },
};
