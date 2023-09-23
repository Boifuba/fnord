const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  videoTitle: { type: String, required: true }, // Título do vídeo
  videoUrl: { type: String, required: true }, // URL do vídeo
  channelTitle: { type: String, required: true }, // Título do canal
  videoThumbnail: { type: String, required: true }, // URL da imagem em miniatura
  videoDescription: { type: String, required: true }, // Descrição do vídeo
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
