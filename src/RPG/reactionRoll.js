const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reaction-roll")
    .setDescription("Reaction")
    .addNumberOption((option) =>
      option
        .setName("modificador")
        .setDescription("modificador")
        .setRequired(true)
    ),
  async execute(interaction) {
    const mod = interaction.options._hoistedOptions[0].value;
    var dado1 = Math.floor(Math.random() * 6) + 1;
    var dado2 = Math.floor(Math.random() * 6) + 1;
    var dado3 = Math.floor(Math.random() * 6) + 1;
    var resultado = dado1 + dado2 + dado3 + mod;

    const jsonData = {
      name: "Reaction Rolls",
      results: [
        {
          text: "#**Disastrous**\n  **General Reaction**\n**Potential combat situation**\nThe NPCs attack viciously, asking no quarter and giving none.\n**Commercial transactions**\nAre doomed! The merchant has nothing to do with the PCs. Make a “potential combat” roll at -2.\n**Requests for aid**\nAre denied totally. Make a “potential combat” roll at -4. If combat is called for but not possible, the NPC works against the PCs in any way possible.\n**Requests for information**\nAre met with anger! Make a “potential combat” roll at -2.\n**Loyalty**\nThe NPC hates the PCs or is in the pay of their enemies and takes the first good chance to betray them.",
          range: [1, 1],
        },
        {
          text: "#**Very Bad**\n  **General reaction**\nThe NPC dislikes the PCs and acts against them if it is convenient to do so.\n**Potential combat situation**\nThe NPCs attack, and flee only if they see they have no chance. (A fight in progress continues.)\n**Commercial transactions**\nare next to impossible. The merchant asks three times the fair price or offers 1/3 the fair price.\n**Requests for aid**\nAre denied. Make a “potential combat” roll; no reaction better than “Neutral” is possible.\n**Requests for information**\nAre met with malicious lies.\n**Loyalty:**\nThe NPC dislikes the PCs and will leave their service. (probably taking everything, he can carry) or sell them out as soon as possible.",
          range: [2, 3],
        },
        {
          text: "#**Bad**\n  **General reaction**\nThe NPC cares nothing for the PCs and acts against them if he can profit by doing so.\n**Potential combat situation**,\nThe NPCs attack unless outnumbered. If they are outnumbered, they flee, possibly to attempt an ambush later. (A fight in progress continues.)\n**Commercial transactions**\nGo badly. The merchant asks twice the fair price or offers half the fair price.\n**Requests for aid**\nAre denied. The NPCs go about their business, ignoring the PCs.\n**Requests for information**\nAre denied. NPCs lie maliciously or demand payment for information. If paid, the NPC gives true, but incomplete, information. \n**Loyalty**\nThe NPC has no respect for the PCs. He leaves or betrays them given even moderate temptation and is a sluggish worker.",
          range: [4, 6],
        },
        {
          text: "#**Poor**\n  **General reaction**\n The NPC is unimpressed. He may become hostile if there is much profit in it, or little danger.\n**Potential combat situation**\nThe NPCs shout threats or insults. They demand that the PCs leave the area. If the PCs stick around, the NPCs attack unless outnumbered, in which case they flee. (A fight in progress continues.)\n**Commercial transactions**\nAre unprofitable. The merchant asks 120% of the fair price or offers 75% of the fair price.\n**Requests for aid**\nAre denied, but bribes, pleas, or threats might work. The PCs may roll again, at -2.\n**Requests for information**\nAre unproductive. The NPCs claim not to know or give incomplete data. A bribe may improve their memory; roll again if a bribe is offered.\n **Loyalty**\nThe NPC is unimpressed with the PCs or dislikes the job; he thinks he is overworked and underpaid. He will probably betray them if offered enough and would certainly take a “better” job if he thought he had one.",
          range: [7, 9],
        },
        {
          text: "#**Neutral**\n **General reaction**\nThe NPC ignores the PCs as much as possible. He is totally uninterested.\n**Potential combat situation**\nThe NPCs are inclined to go their own way and let the PCs go theirs. (If a fight is in progress, the NPCs\ntry to back off.)\n**Commercial transactions**\nGo routinely. The merchant buys and sells at fair prices.\n**Requests for aid**\nAre granted – if they are simple. Complex requests are denied, but the PCs can try again at -2.\n**Requests for information**\nAre successful. The NPC gives the information requested if it is simple. If the question is complex, the\nanswer is sketchy.\n **Loyalty**\nThe NPC views the PCs as “just another boss,” and this is just another job. He works hard enough to keep them happy, but no harder. He does not leave unless he is sure the new job is better and does not betray them unless the temptation is strong.",
          range: [10, 12],
        },
        {
          text: "#**Good**\n** General reaction**\nThe NPC likes the PCs and is helpful within reasonable, everyday limits.\n**Potential combat situation**\nThe NPCs find the PCs likeable, or else too formidable to attack. The PCs may request aid or information; roll again at +1. (If a fight is in progress, the NPCs flee.)\n**Commercial transactions**\nGo pleasantly. The merchant buys and sells at fair prices, and volunteers useful information or small bits of help if possible.\n**Requests for aid**\nAre granted if the request is reasonable. The NPCs’ attitude is helpful. Even if the request is silly and must be denied, they offer helpful advice.\n**Requests for information**\nAre successful. The question is answered accurately.\n**Loyalty**\nThe NPC likes the PCs or the job. He is loyal, works hard, and accepts any reasonable hazard that the PCs accept.",
          range: [13, 15],
        },
        {
          text: "#**Very Good**\n **General reaction**\nThe NPC thinks highly of the PCs and is quite helpful and friendly.\n**In a potential combat situation**\nThe NPCs are friendly. The PCs may ask for aid or information (roll again at +3). Even sworn foes find an excuse to let the PCs go . . . for now. (If a fight is in progress, the NPCs flee if they can, or surrender otherwise.)\n**Commercial transactions**\nGo very well. The merchant accepts the PCs’ offer unless they tried to buy below 80% of the fair price or sell above 150% of the fair price. In that case, he offers those rates. He also offers help and advice.\n**Requests for aid**\nAre granted unless they are totally unreasonable. Any useful information NPCs have is volunteered freely.\n**Requests for information**\nAre successful. The question is answered in detail and volunteers any related information he has.\n**Loyalty**\nThe NPC works very hard, and risks his life if need be. Under most circumstances, he puts the PCs’ interests ahead of his own.",
          range: [16, 18],
        },
        {
          text: "# **Excellent** \n\n **General reaction** \n The NPC is extremely impressed by the PCs, and acts in their best interests at all times, within the limits if his own ability.\n **Potential combat situation** \nThe NPCs are extremely friendly. They may even join the party temporarily. The PCs may ask for aid or information; roll again at +5. (If a fight is in progress, the NPCs surrender.)\n  **Commercial transactions**\nGo extremely well. The merchant accepts the PCs’ offer unless they tried to buy below 50% of fair price or sell above 200% of fair price. In that case, he offers those rates. He also offers help and advice.\n **Requests for aid**\nAre granted. NPCs help in every way within their power, offering extra aid.\n  **Requests for information**\nAre extremely successful. The question is answered completely. If the NPC does not know everything the PCs need, he exerts himself to find out. He may even offer to help roll a request for aid at +2, with no reaction worse than “Poor” possible.\n  **Loyalty**\nThe NPC worships the PCs or their cause, works incredibly hard, always puts the PCs’ interests ahead of his own, and would even die for them.",
          range: [19, 20],
        },
      ],
    };

    if (resultado >= 20) resultado = 20;

    function encontrarTextoPorResultado(resultado) {
      for (const resultadoItem of jsonData.results) {
        const [inicio, fim] = resultadoItem.range;
        if (resultado >= inicio && resultado <= fim) {
          return resultadoItem.text;
        }
      }
      return "Resultado não encontrado."; // Você pode ajustar a mensagem de acordo com sua necessidade
    }

    // Usando a função para encontrar o texto correspondente
    const textoEncontrado = encontrarTextoPorResultado(resultado);

    const embed = new EmbedBuilder();
    embed
      .setThumbnail(
        "https://i.pinimg.com/564x/14/2f/a7/142fa7f209297073e4648f11ed84"
      )
      .setTitle("Resultado do teste de Reação")
      .setColor(0x5506ce)
      .setDescription(
        `Você rolou *${dado1} + ${dado2} + ${dado3} + ${mod} = **${resultado}*** \n\n ${textoEncontrado} `
      );

    await interaction.reply({ embeds: [embed] });
  },
};
