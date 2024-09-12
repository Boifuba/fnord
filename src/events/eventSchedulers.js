const { Client, EmbedBuilder } = require("discord.js");

class EventScheduler {
  constructor(client) {
    this.client = client;
  }

  // Função para calcular o tempo até o próximo evento (em milissegundos)
  getTimeUntilNextEvent(event) {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const nextEventDay = event.day;

    // Calcula o número de dias até o próximo evento
    const daysUntilNextEvent =
      nextEventDay >= dayOfWeek
        ? nextEventDay - dayOfWeek
        : 7 - (dayOfWeek - nextEventDay);

    // Ajusta a data para o próximo evento
    const nextEventDate = new Date();
    nextEventDate.setDate(now.getDate() + daysUntilNextEvent);
    nextEventDate.setHours(event.hour, event.minute, 0, 0); // Definir a hora do evento

    return nextEventDate - now; // Tempo restante em milissegundos
  }

  // Função para agendar eventos
  scheduleEvent(event) {
    const timeUntilEvent = this.getTimeUntilNextEvent(event);

    if (timeUntilEvent > 0) {
      setTimeout(() => {
        // Cria o embed
        const embed = new EmbedBuilder()
          .setTitle(event.title)
          .setDescription(event.description)
          .setImage(event.img)
          .setColor(0xb22222)
          .setTimestamp();

        // Envia o embed no canal especificado
        const channel = this.client.channels.cache.get(event.channelId);
        if (channel) {
          channel.send({ embeds: [embed] });
        }

        // Reagendar o próximo evento para a semana seguinte
        this.scheduleEvent(event);
      }, timeUntilEvent); // Agendar para o tempo calculado
    }
  }

  // Inicializa os eventos
  initEvents() {
    // Lista de eventos recorrentes
    const events = [
      {
        title: "A Anarquia está instaurada!",
        description:
          "Hoje não tem Xandão, você pode falar a bosta quê quiser! <@&830188485791973387>",
        img: "https://i.imgur.com/x4EhmHK.jpeg",
        day: 5, // Sexta-feira
        hour: 8, // 14h (2:00 PM)
        minute: 0, // Exemplo: 14:00
        channelId: "795347060667711488", // Substitua pelo ID do seu canal
      },
      {
        title: "Acabo-se a Anarquia!",
        description:
          "Você agora pode tomar cartão felas das putas <@&830188485791973387> ",
        img: "https://i.imgur.com/oJCM0ib.jpeg",
        day: 6, // Sexta-feira
        hour: 0, // 16h (4:00 PM)
        minute: 1, // Exemplo: 16:30
        channelId: "1140345961634353235",
      },
    ];

    events.forEach((event) => {
      this.scheduleEvent(event);
    });
  }
}

module.exports = EventScheduler;
