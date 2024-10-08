function todayGame() {
  const dataAtual = new Date();
  const diaDaSemana = dataAtual.getDay();

  //   0: Domingo
  //   1: Segunda-feira
  //   2: Terça-feira
  //   3: Quarta-feira
  //   4: Quinta-feira
  //   5: Sexta-feira
  //   6: Sábado
  switch (diaDaSemana) {
    case 3: // Quarta-feira
      todayTitle = "GURPS Wizardry";
      todayImg = "https://i.imgur.com/lpneqJo.png";
      todayText = "Clique no link para entrar no jogo";
      todayThumbnail = "https://i.imgur.com/s1AVkCg.png";
      todayTime = [{ name: "Horário", value: "Quartas 19:30", inline: true }];
      todayColor = 0x5506ce;
      break;
    // case 5: // Sexta-feira
    //   todayTitle = "Jogo de GURPS Supers 4e";
    //   todayImg = "https://i.imgur.com/gmUM0BJ.png";
    //   todayText = "Jogo de GURPS Supers 4e com pontos rolados aleatóriamente.";
    //   todayThumbnail = "https://i.imgur.com/s1AVkCg.png";
    //   todayTime = [{ name: "Horário", value: "Sexta 16:00", inline: true }];
    //   todayColor = 0x5506ce;
    //   break;

    default:
      todayTitle = "Campanhas do Boi";
      todayImg = "https://i.imgur.com/xFvmO9E.jpg";
      todayText = " # Hoje não tem jogo.";
      todayThumbnail = "https://i.imgur.com/s1AVkCg.png";
      todayTime = [];
      todayColor = 0x5506ce;
      break;
  }

  return {
    todayImg,
    todayText,
    todayTitle,
    todayTime,
    todayThumbnail,
    todayColor,
  };
}
module.exports = todayGame;

// Para usar a função em outros módulos da sua aplicação:
// const { todayTitle,todayImg , todayText , todayThumbnail } = todayGame();
