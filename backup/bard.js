const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("bard")
  .setDescription("Caralho"),

  async execute(interaction) {

    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://google-bard1.p.rapidapi.com/',
      headers: {
        text: 'Who is sundarpichai? ',
        lang: 'en',
        psid: '<__Secure-1PSID> ',
        'X-RapidAPI-Key': '67c7aefbadmsh992bfaceff2d73fp1b4ff4jsn350588dfda5a',
        'X-RapidAPI-Host': 'google-bard1.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
  },
};
