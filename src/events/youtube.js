const { Client, EmbedBuilder } = require("discord.js");
const axios = require("axios");
require("dotenv").config();
const key = process.env.youtube;
const channelAnnouncement = "1144157374773473403";

const channelIds = [
  "UCZ-yZV4JKOewGZAJSqs2V0w", // Por um punhado de dados.
  "UCF1BfG8XJb9m6g96vn76G6A", // variedados
  "UCCkIJHK5KYpWb58YyAqTWKg", // GURPS na veia
  "UC4-7okrLZK2sfwINnqZNVog", // Chris Normand
  "UCRhm02S_o1oktdjfj6JTlTA",
  "UCS99XfR4yUuxeVYUxV5nigA",
  "UCZwU2G-KVl-P-O-B35chZOQ" //History Hit
  // Adicione mais IDs de canal conforme necessário
];

const Video = require("../schema/youtubeSchema");

async function youtube(client) {
  try {
    for (const channelId of channelIds) {
      const channelInfo = await getChannelInfo(channelId); // Obtenha informações do canal

      // Extrair informações do canal
      const channelTitle = channelInfo.items[0].snippet.title;
      const channelThumbnail = channelInfo.items[0].snippet.thumbnails.high.url;

      const video = await getLatestVideo(channelId);

      // Extrair informações do vídeo
      const videoTitle = video.snippet.title;
      const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
      const videoDescription = video.snippet.description;
      const videoThumbnail = video.snippet.thumbnails.high?.url;

      // Verificar se o vídeo já existe na base de dados
      const existingVideo = await Video.findOne({ videoUrl });

      if (!existingVideo) {
        // Se não existir, adicione-o à base de dados
        const newVideo = new Video({
          videoTitle,
          videoUrl,
          channelTitle,
          channelThumbnail, // Adicione a thumbnail do canal
          videoThumbnail,
          videoDescription,
        });
        await newVideo.save();
        console.log(`🎬 ${channelTitle} Tem vídeo novo!`);

        const embed = new EmbedBuilder();
        embed
          .setColor(0x5506ce)
          .setDescription(`${videoDescription}`)
          .setURL(`${videoUrl}`)
          .setTitle(`${videoTitle}`)
          .setImage(`${videoThumbnail}`)
          .setThumbnail(`${channelThumbnail}`)

        // Enviar a mensagem para o canal de anúncios
        const channel = client.channels.cache.get(channelAnnouncement);
        channel.send(`O canal **${channelTitle}** tem vídeo novo no canal!`);
        channel.send({ embeds: [embed] }).catch((error) => {
          console.error("⛔ Erro ao enviar embed:", error);
        });
        console.log("🎬 Vídeo enviado.");
      } else {
        // Se já existir, compare o título para verificar se o vídeo é diferente
        if (existingVideo.videoTitle !== videoTitle) {
          // Atualize o vídeo na base de dados
          existingVideo.videoTitle = videoTitle;
          existingVideo.save();
        } else {
         // console.log(`🎬 ${channelTitle} Não tem novidades.`);
        }
      }
    }
  } catch (error) {
    console.error("⛔ Youtube:", "SEM TOKENS");
  }
}

async function getChannelInfo(channelId) {
  const url = `https://www.googleapis.com/youtube/v3/channels?key=${key}&id=${channelId}&part=snippet`;
  const response = await axios.get(url);
  return response.data;
}

async function getLatestVideo(channelId) {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1`;
  const response = await axios.get(url);
  const latestVideo = response.data.items[0];
  return latestVideo;
}

module.exports = {
  youtube,
};
