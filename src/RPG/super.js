const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("super")
    .setDescription("Role seus pontos"),

  async execute(interaction) {
    const member = interaction.member;
    const nick = member ? member.displayName : interaction.user.username;

    var aparenciaControlePoderes = [
      "Aparência aberrante e sem controle de poderes.",
      "Aparência aberrante e com controle de poderes.",
      "Aparência normal com algumas características disfarçáveis e sem controle de poderes.",
      "Aparência normal com algumas características disfarçáveis e com controle de poderes.",
      "Aparência normal sem controle dos poderes.",
      "Aparência normal com controle dos poderes.",
    ];

    function rolarDado() {
      return Math.floor(Math.random() * 6) + 1;
    }

    function sortearVantagem() {
      var resultado = rolarDado() + rolarDado() + rolarDado();
      var indice = 0;
      if (resultado >= 3 && resultado <= 5) {
        indice = 0;
      } else if (resultado >= 6 && resultado <= 7) {
        indice = 1;
      } else if (resultado >= 8 && resultado <= 9) {
        indice = 2;
      } else if (resultado >= 10 && resultado <= 11) {
        indice = 3;
      } else if (resultado >= 12 && resultado <= 13) {
        indice = 4;
      } else {
        indice = 5;
      }
      return aparenciaControlePoderes[indice];
    }

    var poderes = [
      "Pirocinese",
      "Criocinese",
      "Telepatia",
      "Levitação",
      "Superforça",
      "Invisibilidade",
      "Regeneração Celular",
      "Velocidade Sobre-Humana",
      "Teletransporte",
      "Controle Mental",
      "Super Resistência",
      "Elasticidade",
      "Manipulação do Tempo",
      "Telecinese",
      "Voo",
      "Mimetismo Animal",
      "Encolhimento",
      "Visão de Raio-X",
      "Invulnerabilidade",
      "Geração de Campos de Força",
      "Criação de Portais",
      "Absorção de Energia",
      "Telecinese",
      "Inteligência Artificial",
      "Telecinese",
      "Camuflagem",
      "Clarividência",
      "Criação de Ilusões",
      "Geração de Tempestades",
      "Controle Elemental",
      "Projeção Astral",
      "Transformação Animal",
      "Geração de Luz",
      "Manipulação Gravitacional",
      "Telepatia Animal",
      "Super Agilidade",
      "Transformação em Gás",
      "Manipulação de Plantas",
      "Mimetismo de Materiais",
      "Sentidos Aguçados",
      "Geração de Eletricidade",
      "Teletransporte Dimensional",
      "Imortalidade",
      "Rajadas de Energia",
      "Manipulação de Som",
      "Controle da Gravidade",
      "Telepatia Coletiva",
      "Criação de Homúnculos",
      "Super Velocidade",
      "Invisibilidade Térmica",
      "Manipulação de Areia",
      "Mimetismo de Pedra",
      "Controle de Sombra",
      "Super Sopro",
      "Telepatia com Máquinas",
      "Transformação de Corpo",
      "Geração de Ilusões Táteis",
      "Controle de Metais",
      "Mimetismo Aquático",
      "Invocação de Seres Místicos",
      "Super Salto",
      "Vampirismo",
      "Precognição",
      "Mimetismo de Fogo",
      "Projeção de Energia",
      "Telepatia Interdimensional",
      "Controle de Clima",
      "Geração de Antimatéria",
      "Camuflagem Óptica",
      "Super Inteligência",
      "Telecinese Molecular",
      "Invisibilidade Elástica",
      "Telepatia Extraterrestre",
      "Transformação de Elementos",
      "Geração de Terremotos",
      "Manipulação de Sonhos",
      "Super Pulo",
      "Teletransporte Temporal",
      "Controle de Explosões",
      "Mimetismo de Sombras",
      "Geração de Vácuo",
      "Manipulação de Ferro",
      "Eletroquinese",
      "Transformação de Plantas",
      "Telepatia Telepática",
      "Super Flexibilidade",
      "Invisibilidade Mental",
      "Controle de Energia Cinética",
      "Geração de Ondas de Choque",
      "Mimetismo de Insetos",
      "Controle de Raios Gama",
      "Geração de Camuflagem Mental",
      "Telecinese Gravitacional",
      "Manipulação de Raios",
      "Precognição Tátil",
      "Transformação de Gelo",
      "Controle de Energia Solar",
      "Super Aderência",
      "Telepatia Cósmica",
      "Controle de Veneno",
      "Geração de Realidades Virtuais",
      "Mimetismo de Pássaros",
      "Controle de Radiação",
      "Geração de Campo de Antigravidade",
      "Teletransporte Biológico",
      "Manipulação de Eletricidade",
      "Criogenia",
      "Transformação de Água",
      "Controle de Energia Nuclear",
      "Super Memória",
      "Telepatia Elemental",
      "Controle de Plantas Carnívoras",
      "Geração de Imagens Holográficas",
      "Mimetismo de Seres Humanos",
      "Controle de Energia Elétrica",
      "Geração de Ilusões Sonoras",
      "Telecinese Temporal",
      "Manipulação de Grãos",
      "Controle do Espaço",
      "Transformação Animal Parcial",
      "Super Respiração",
      "Telepatia Ilusória",
      "Controle de Vento",
      "Geração de Ondas Psíquicas",
      "Mimetismo de Rochas",
      "Controle de Desintegração",
      "Geração de Vácuo Espacial",
      "Teletransporte Sonoro",
      "Manipulação de Vida",
      "Super Visão Noturna",
      "Telepatia Gastronômica",
      "Controle de Energia Cinética",
      "Geração de Relâmpagos",
      "Mimetismo de Árvores",
      "Controle de Gravidade",
      "Geração de Ilusões Visuais",
      "Telecinese Biotecnológica",
      "Manipulação de Ilusões",
      "Controle de Energia Eólica",
      "Geração de Vírus",
      "Telepatia Gravitacional",
      "Super Flexibilidade Óssea",
      "Teletransporte Interdimensional",
      "Geração de Bolhas",
      "Mimetismo de Líquidos",
      "Psiônico",
      "Geração de Minerais",
      "Telecinese de Cristais",
      "Manipulação de Sombras",
      "Controle de Som",
      "Geração de Ilusões Térmicas",
      "Telepatia Psicogônica",
      "Super Memória Eidética",
      "Teletransporte Astral",
      "Controle de Energia Térmica",
      "Geração de Campos Magnéticos",
      "Mimetismo de Aranhas",
      "Controle de Energia Hidráulica",
      "Geração de Miragens",
      "Telecinese Eletromagnética",
      "Manipulação de Chamas",
      "Controle de Tempo",
      "Geração de Ilusões Táteis",
      "Telepatia Sonar",
      "Super Visão de Raios-X",
      "Teletransporte Mental",
      "Controle de Energia Cósmica",
      "Geração de Realidades Paralelas",
      "Mimetismo de Répteis",
      "Controle de Energia Mental",
      "Geração de Ilusões Olfativas",
      "Telecinese Radioativa",
      "Manipulação de Lava",
      "Controle de Máquinas",
      "Geração de Ilusões de Invisibilidade",
      "Telepatia Cronológica",
      "Super Velocidade Mental",
      "Teletransporte Físico",
      "Geração de Micro-organismos",
      "Mimetismo de Plantas",
      "Geração de Ilusões Auditivas",
    ];

    function mostrarPoder() {
      var indiceAleatorio = Math.floor(Math.random() * poderes.length);
      var poderSelecionado = poderes[indiceAleatorio];
      return poderSelecionado;
    }

    var poderAleatorio = mostrarPoder();
    

    const dado = Math.floor(Math.random() * 6) + 1;
    const pontuacao = 200 + dado * 50;

    const embed = new EmbedBuilder();

    embed
      .setColor("Red")
      .setThumbnail("https://i.imgur.com/kcGIyyu.png")
      .setTitle(`${poderAleatorio}`)
      .addFields({
        name: `Você tem ${pontuacao} Pontos`,
        value: `\n ** Aparência: ** ${sortearVantagem()}`,
        inline: true,
      });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
