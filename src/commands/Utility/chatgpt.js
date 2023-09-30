const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("testinho")
    .setDescription("Make a Custom Embed Message.")
    .addStringOption((option) =>
      option.setName("query").setDescription("Ex: DarkPurple").setRequired(true)
    ),
  async execute(interaction) {
    let query = interaction.options.getString("traits");

  const options = {
  method: 'POST',
  url: 'https://chatgpt-api8.p.rapidapi.com/',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '67c7aefbadmsh992bfaceff2d73fp1b4ff4jsn350588dfda5a',
    'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com'
  },
      data: [
        {
          content: "query",
          role: "user",
        },
      ],
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      
    } catch (error) {
      console.error(error);
    }
 
    const embed1 = new EmbedBuilder()
      //.setColor("Red")
      .setDescription(response.text);

    return await interaction.channel.send({
      embeds: [embed1],
      ephemeral: true,
    });
  },
};
