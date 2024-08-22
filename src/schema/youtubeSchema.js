const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  channelId: { type: String, required: true },
  videoTitle: { type: String, required: true },
  channelId: { type: String, required: true },
  channelTitle: { type: String, required: true },
  videoThumbnail: { type: String, required: true },
  videoDescription: { type: String, required: true },
  videoDate: { type: String, required: true },
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
