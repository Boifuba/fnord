const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Make a Custom Embed Message.")
    //Options
    //color
    .addStringOption((option) =>
      option.setName("color").setDescription("Ex: DarkPurple").setRequired(true)
    )
    //description
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Ex: How are you")
        .setRequired(true)
    )
    //title
    .addStringOption((option) =>
      option.setName("title").setDescription("Ex: Hello").setRequired(false)
    )
    //thumbnail
    .addStringOption((option) =>
      option
        .setName("thumbnail")
        .setDescription("(Only discord image links)")
        .setRequired(false)
    ),

  async execute(interaction, client) {
    //! Permissions check
    //* embed1 = permission err embed
    const embed1 = new EmbedBuilder()
      .setColor("Red")
      .setDescription(
        "You don't have permission to use this command on this server"
      );

    //! check
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return await interaction.channel.send({
        embeds: [embed1],
        ephemeral: true,
      });

    //? Option constructors
    const author = interaction.user;
    //* embed3
    const embed3 = new EmbedBuilder()
      .setColor("Red")
      .setDescription(
        `${author}, \n❌ You have to specify a valid **Discord Image** link for the thumbnail. \nEx: *https://cdn.discordapp.com/attachments/1039497705753428018/1057368524093407272/Thumbnail_Example.png* \n \nNeed help with how to get a valid discord image link? Click on the black button here => ||To get a valid discord image link like this, just upload an image that you would like to a channel on ur discord server. Then, click on the image. Then, click on the (Open Original) button and copy the link of the page that opens and use that link here.||`
      );
    const color = interaction.options.getString("color");
    const title = interaction.options.getString("title") || "ㅤ";
    const description = interaction.options.getString("description");
    const thumbnail =
      interaction.options.getString("thumbnail") ||
      "https://cdn.discordapp.com/attachments/1039497705753428018/1057365957900763257/NoEmbedImageOrThumbnail.PNG";
    //! Image link check
    if (
      !/https?:\/\/(cdn\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(
        thumbnail
      )
    )
      return await interaction.channel.send({
        embeds: [embed3],
      }); //<= These lines are very important so dont change anything! (Removing or Editing these lines may cause your bot to crash)

    //! Remove "Message Err"
    //* embed = checking...
    const embed = new EmbedBuilder()
      .setColor("Yellow")
      .setDescription(
        "⚙️ Checking Details... \n*If you dont see any message, It means, The color you used isn't a valid color.*"
      ); //<= You can customize this (Dont remove it but you can make it send an invisible message and to do this, here's the invisible letter => (ㅤ))

    await interaction.reply({ embeds: [embed], ephemeral: true });
    //? Constructor's Ifs
    // Color
    //* Aqua
    if (color == "Aqua") {
      //? Color
      const color = "Aqua";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "aqua") {
      //? Color
      const color = "Aqua";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Blue
    if (color == "Blue") {
      //? Color
      const color = "Blue";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "blue") {
      //? Color
      const color = "Blue";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Blurple
    if (color == "Blurple") {
      //? Color
      const color = "Blurple";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "blurple") {
      //? Color
      const color = "Blurple";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Black (DarkButNotBlack)
    if (color == "Black") {
      //? Color
      const color = "DarkButNotBlack";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "black") {
      //? Color
      const color = "DarkButNotBlack";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Dark Aqua
    if (color == "DarkAqua") {
      //? Color
      const color = "DarkAqua";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Darkaqua") {
      //? Color
      const color = "DarkAqua";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkAqua") {
      //? Color
      const color = "DarkAqua";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkaqua") {
      //? Color
      const color = "DarkAqua";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //with space
    if (color == "Dark Aqua") {
      //? Color
      const color = "DarkAqua";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Dark aqua") {
      //? Color
      const color = "DarkAqua";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark Aqua") {
      //? Color
      const color = "DarkAqua";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark aqua") {
      //? Color
      const color = "DarkAqua";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Dark Blue
    if (color == "DarkBlue") {
      //? Color
      const color = "DarkBlue";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Darkblue") {
      //? Color
      const color = "DarkBlue";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkBlue") {
      //? Color
      const color = "DarkBlue";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkblue") {
      //? Color
      const color = "DarkBlue";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //with space
    if (color == "Dark Blue") {
      //? Color
      const color = "DarkBlue";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Dark blue") {
      //? Color
      const color = "DarkBlue";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark Blue") {
      //? Color
      const color = "DarkBlue";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark blue") {
      //? Color
      const color = "DarkBlue";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Dark Gold
    if (color == "DarkGold") {
      //? Color
      const color = "DarkGold";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Darkgold") {
      //? Color
      const color = "DarkGold";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkGold") {
      //? Color
      const color = "DarkGold";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkgold") {
      //? Color
      const color = "DarkGold";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //with space
    if (color == "Dark Gold") {
      //? Color
      const color = "DarkGold";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Dark gold") {
      //? Color
      const color = "DarkGold";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark Gold") {
      //? Color
      const color = "DarkGold";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark gold") {
      //? Color
      const color = "DarkGold";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Dark Green
    if (color == "DarkGreen") {
      //? Color
      const color = "DarkGreen";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Darkgreen") {
      //? Color
      const color = "DarkGreen";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkGreen") {
      //? Color
      const color = "DarkGreen";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkgreen") {
      //? Color
      const color = "DarkGreen";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //with space
    if (color == "Dark Green") {
      //? Color
      const color = "DarkGreen";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Dark green") {
      //? Color
      const color = "DarkGreen";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark Green") {
      //? Color
      const color = "DarkGreen";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark green") {
      //? Color
      const color = "DarkGreen";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Dark Navy
    if (color == "DarkNavy") {
      //? Color
      const color = "DarkNavy";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Darknavy") {
      //? Color
      const color = "DarkNavy";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkNavy") {
      //? Color
      const color = "DarkNavy";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darknavy") {
      //? Color
      const color = "DarkNavy";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //with space
    if (color == "Dark Navy") {
      //? Color
      const color = "DarkNavy";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Dark navy") {
      //? Color
      const color = "DarkNavy";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark Navy") {
      //? Color
      const color = "DarkNavy";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark navy") {
      //? Color
      const color = "DarkNavy";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Dark Orange
    if (color == "DarkOrange") {
      //? Color
      const color = "DarkOrange";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Darkorange") {
      //? Color
      const color = "DarkOrange";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkOrange") {
      //? Color
      const color = "DarkOrange";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkorange") {
      //? Color
      const color = "DarkOrange";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //with space
    if (color == "Dark Orange") {
      //? Color
      const color = "DarkOrange";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Dark orange") {
      //? Color
      const color = "DarkOrange";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark Orange") {
      //? Color
      const color = "DarkOrange";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark orange") {
      //? Color
      const color = "DarkOrange";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Dark Purple
    if (color == "DarkPurple") {
      //? Color
      const color = "DarkPurple";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Darkpurple") {
      //? Color
      const color = "DarkPurple";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkPurple") {
      //? Color
      const color = "DarkPurple";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkpurple") {
      //? Color
      const color = "DarkPurple";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //with space
    if (color == "Dark Purple") {
      //? Color
      const color = "DarkPurple";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Dark purple") {
      //? Color
      const color = "DarkPurple";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark Purple") {
      //? Color
      const color = "DarkPurple";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark purple") {
      //? Color
      const color = "DarkPurple";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Dark Red
    if (color == "DarkRed") {
      //? Color
      const color = "DarkRed";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Darkred") {
      //? Color
      const color = "DarkRed";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkRed") {
      //? Color
      const color = "DarkRed";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkred") {
      //? Color
      const color = "DarkRed";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //with space
    if (color == "Dark Red") {
      //? Color
      const color = "DarkRed";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Dark red") {
      //? Color
      const color = "DarkRed";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark Red") {
      //? Color
      const color = "DarkRed";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark red") {
      //? Color
      const color = "DarkRed";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Dark Pink (DarkVividPink)
    if (color == "DarkPink") {
      //? Color
      const color = "DarkVividPink";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Darkpink") {
      //? Color
      const color = "DarkVividPink";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkPink") {
      //? Color
      const color = "DarkVividPink";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkpink") {
      //? Color
      const color = "DarkVividPink";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //with space
    if (color == "Dark Pink") {
      //? Color
      const color = "DarkVividPink";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Dark pink") {
      //? Color
      const color = "DarkVividPink";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark Pink") {
      //? Color
      const color = "DarkVividPink";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark pink") {
      //? Color
      const color = "DarkVividPink";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Dark Grey
    if (color == "DarkGrey") {
      //? Color
      const color = "DarkerGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Darkgrey") {
      //? Color
      const color = "DarkerGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkGrey") {
      //? Color
      const color = "DarkerGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkgrey") {
      //? Color
      const color = "DarkerGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //with space
    if (color == "Dark Grey") {
      //? Color
      const color = "DarkerGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Dark grey") {
      //? Color
      const color = "DarkerGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark Grey") {
      //? Color
      const color = "DarkerGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark grey") {
      //? Color
      const color = "DarkerGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //grey => gray
    if (color == "DarkGray") {
      //? Color
      const color = "DarkerGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Darkgray") {
      //? Color
      const color = "DarkerGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkGray") {
      //? Color
      const color = "DarkerGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "darkgray") {
      //? Color
      const color = "DarkerGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //with space
    if (color == "Dark Gray") {
      //? Color
      const color = "DarkerGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Dark gray") {
      //? Color
      const color = "DarkerGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark Gray") {
      //? Color
      const color = "DarkerGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "dark gray") {
      //? Color
      const color = "DarkerGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Default
    if (color == "Default") {
      //? Color
      const color = "Default";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "default") {
      //? Color
      const color = "Default";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Fuchsia
    if (color == "Fuchsia") {
      //? Color
      const color = "Fuchsia";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "fuchsia") {
      //? Color
      const color = "Fuchsia";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Gold
    if (color == "Gold") {
      //? Color
      const color = "Gold";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "gold") {
      //? Color
      const color = "Gold";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Green
    if (color == "Green") {
      //? Color
      const color = "Green";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "green") {
      //? Color
      const color = "Green";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Grey
    if (color == "Grey") {
      //? Color
      const color = "Grey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "grey") {
      //? Color
      const color = "Grey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Gray") {
      //? Color
      const color = "Grey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "gray") {
      //? Color
      const color = "Grey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Greyple
    if (color == "Greyple") {
      //? Color
      const color = "Greyple";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "greyple") {
      //? Color
      const color = "Greyple";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Grayple") {
      //? Color
      const color = "Greyple";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "grayple") {
      //? Color
      const color = "Greyple";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Light Grey
    if (color == "LightGrey") {
      //? Color
      const color = "LightGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "lightgrey") {
      //? Color
      const color = "LightGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Lightgrey") {
      //? Color
      const color = "LightGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //with space
    if (color == "Light Grey") {
      //? Color
      const color = "LightGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "light grey") {
      //? Color
      const color = "LightGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Light grey") {
      //? Color
      const color = "LightGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "light Grey") {
      //? Color
      const color = "LightGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //grey => gray
    if (color == "LightGray") {
      //? Color
      const color = "LightGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "lightgray") {
      //? Color
      const color = "LightGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Lightgray") {
      //? Color
      const color = "LightGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //with space
    if (color == "Light Gray") {
      //? Color
      const color = "LightGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "light gray") {
      //? Color
      const color = "LightGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Light gray") {
      //? Color
      const color = "LightGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "light Gray") {
      //? Color
      const color = "LightGrey";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Pink (LuminousVividPink)
    if (color == "Pink") {
      //? Color
      const color = "LuminousVividPink";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "pink") {
      //? Color
      const color = "LuminousVividPink";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "LuminousVividPink") {
      //? Color
      const color = "LuminousVividPink";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "luminousVividPink") {
      //? Color
      const color = "LuminousVividPink";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "luminousvividpink") {
      //? Color
      const color = "LuminousVividPink";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Luminousvividpink") {
      //? Color
      const color = "LuminousVividPink";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Luminous Vivid Pink") {
      //? Color
      const color = "LuminousVividPink";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "LuminousVivid Pink") {
      //? Color
      const color = "LuminousVividPink";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "Luminous VividPink") {
      //? Color
      const color = "LuminousVividPink";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Navy
    if (color == "Navy") {
      //? Color
      const color = "Navy";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "navy") {
      //? Color
      const color = "Navy";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Orange
    if (color == "Orange") {
      //? Color
      const color = "Orange";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "orange") {
      //? Color
      const color = "Orange";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Random
    if (color == "Random") {
      //? Color
      const color = "Random";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "random") {
      //? Color
      const color = "Random";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Red
    if (color == "Red") {
      //? Color
      const color = "Red";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "red") {
      //? Color
      const color = "Red";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* White
    if (color == "White") {
      //? Color
      const color = "White";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "white") {
      //? Color
      const color = "White";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Yellow
    if (color == "Yellow") {
      //? Color
      const color = "Yellow";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "yellow") {
      //? Color
      const color = "Yellow";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    //* Purple
    if (color == "Purple") {
      //? Color
      const color = "Purple";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    }
    if (color == "purple") {
      //<= Don't add any color name that you want in here because you only have the option to use the colors that the EmbedBuilder constructor already has (All the EmbedBuilder colors are already added here)
      //? Color
      const color = "Purple";
      //* Embed
      const embedmain = new EmbedBuilder()
        .setColor(color)
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnail);

      await interaction.channel.send({ embeds: [embedmain] });
    } else {
      return; //<= Already used in line 80 (Customizable)
    }
  },
};
