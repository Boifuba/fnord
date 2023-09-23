const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const eventos = [
  {
    id: 1,
    nome: "Doença mágica/maldição",
    descricao: "Um evento sobrenatural recai sobre os elementos de tropa e dia a dia vai corroendo as estruturadas da campanha. Pessoas morrem, adoecem ou acontece algo grandiosamente incômodo.",
  },
  {
    id: 2,
    nome: "Ataque sobrenatural",
    descricao: "Um ataque surpresa extraordinário ocorre, alguem mexeu com quem não devia e agora todos irão lutar contra um poder muito maior que o os elementos conhecem.",
  },
  {
    id: 3,
    nome: "Revolta da População Local",
    descricao: "O povo nas redondezas se revoltam, eles podem envenenar a água, dar informações sobre os elementos, ou simplesmente fazer ataques ao acampamento.",
  },
  {
    id: 4,
    nome: "Roubo de valores",
    descricao: "Um grande roubo acontece nos suprimentos, parte dos recursos em riquezas são retirados do butim.",
  },
  {
    id: 5,
    nome: "Roubo de Suprimentos e armas",
    descricao: "Um parte do comboio logístico é extraviado, armas, comidas e ferramentas são roubados. Ninguém sabe o quê ocorreu.",
  },
  {
    id: 6,
    nome: "Afastamento de batedores/observadores",
    descricao: "A tropa fica cega durante um determinado número de dias, não importa quantos batedores eles mandam, eles nunca voltam.",
  },
  {
    id: 7,
    nome: "Afastamento de linha de suprimentos 1d6 dias",
    descricao: "A linha de suprimento se atrasa por algum motivo e não consegue se colocar em coluna de marcha deixando a tropa pelo menos 1d6+2 dias sem suprimentos.",
  },
  {
    id: 8,
    nome: "Briga entre Líderes",
    descricao: "Chefes se desentendem e precisam lutar entre si, negar a solução do problema pode colocar sua liderança em risco.",
  },
  {
    id: 9,
    nome: "Fome ou sede",
    descricao: "fome ou sede ocorrem. Vocês se vêem em uma situação onde fica dificil manter as questões mais básicas para sustento da tropa.",
  },
  {
    id: 10,
    nome: "Doença",
    descricao: "uma doença ocorre",
  },
  {
    id: 11,
    nome: "Deserção Amigável",
    descricao: "uma deserção amigável ocorre",
  },
  {
    id: 12,
    nome: "Sabotagem",
    descricao: "uma sabotagem ocorre",
  },
  {
    id: 13,
    nome: "Rebelião",
    descricao: "uma rebelião ocorre",
  },
  {
    id: 14,
    nome: "Espionagem",
    descricao: "espionagem ocorre",
  },
  {
    id: 15,
    nome: "Deserção em meio ao combate",
    descricao: "uma deserção em meio ao combate ocorre",
  },
  {
    id: 16,
    nome: "Deserção de Aliados",
    descricao: "uma deserção de aliados ocorre",
  },
  {
    id: 17,
    nome: "Traição de líderes ou NPCs relevantes",
    descricao: "uma traição de líderes ou NPCs relevantes ocorre",
  },
  {
    id: 18,
    nome: "Traição de Aliados",
    descricao: "uma traição de aliados ocorre",
  },
  {
    id: 19,
    nome: "Doença de animais",
    descricao: "uma doença de animais ocorre",
  },
  {
    id: 20,
    nome: "Assassinato de PC",
    descricao: "um PC é assassinado",
  },
  {
    id: 21,
    nome: "Deserção 1d6 x 5%",
    descricao: "1d6 x 5% dos soldados desertam",
  },
  {
    id: 22,
    nome: "Deserção 2d6 x 5%",
    descricao: "2d6 x 5% dos soldados desertam",
  },
  {
    id: 23,
    nome: "Deserção 3d6 x 5%",
    descricao: "3d6 x 5% dos soldados desertam",
  }
  ]


  module.exports = {
    data: new SlashCommandBuilder()
      .setName("guerra")
      .setDescription("falta texto")
      .addNumberOption((option) =>
        option
          .setName("mod")
          .setDescription("Informe o nível de habilidade")
          .setRequired(true)
      ),
    async execute(interaction) {
      const mod = interaction.options._hoistedOptions[0].value;
      var dado1 = Math.floor(Math.random() * 6) + 1;
      var dado2 = Math.floor(Math.random() * 6) + 1;
      var dado3 = Math.floor(Math.random() * 6) + 1;
      var roll = dado1 + dado2 + dado3;
  
      const resultadoDaRolagem = roll + mod;
  
      if (resultadoDaRolagem >= 3 && resultadoDaRolagem <= 25) {
        const eventoSelecionado = eventos.find((evento) => evento.id === resultadoDaRolagem - 3);
        const evento = {
          titulo: eventoSelecionado.nome,
          descricao: eventoSelecionado.descricao,
        };
        const embed = new EmbedBuilder();
        embed
          .setColor(0x5506ce)
          .setThumbnail("https://i.imgur.com/5xqHCOF.png")
          .setTitle(`${evento.titulo}`)
          .setDescription(`${evento.descricao}`);
        await interaction.reply({ embeds: [embed], ephemeral: true  });
      } else {
        const embed = new EmbedBuilder();
        embed
          .setColor(0x5506ce)
          .setThumbnail("https://i.imgur.com/Iso6SyT.png")
          .setTitle("SE FUDEU")
          .setDescription("# SADISMO");
        console.log("Resultado fora dos limites da tabela de eventos.");
        await interaction.reply({ embeds: [embed], ephemeral: true });
      }
    },
  };