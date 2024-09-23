// Defina seu array de palavras proibidas aqui

async function wordWarning(message) {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  if (content.includes("transhuman")) await message.react("👽");
  if (content.includes("d&d")) await message.react(`💩`);
  if (content.includes("Taylor Swift")) await message.react(`💩`);
  if (content.includes("D20")) await message.react(`💩`);
  if (content.includes("negão")) await message.react("🍆");
  if (content.includes("soberana")) await message.react("🍆");
  if (content.includes("Monark")) await message.react("⛔");
  if (content.includes("bot")) await message.react("🍌");
  if (content.includes("Pablo Marçal")) await message.react("💩");
  if (content.includes("Marçal")) await message.react("💩");

  // await message.react("⛔");
  // await message.react("🍌");
  // await message.react("🍆");
  // await message.react("🍭");
  // await message.react("🐣");
  // await message.react("👉");
  // await message.react("👌");
  // await message.react("💩");

  return;
}

module.exports = wordWarning;
