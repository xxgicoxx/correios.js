const { correiosConfig } = require('../configs');
const { constants, request } = require('../utils');

class ApiCorreiosService {
  async track(code) {
    const response = await request({ url: `${correiosConfig.api}${code}` });
    const responseEvents = response.objetos[0].eventos;

    if (!responseEvents) {
      throw new Error(constants.ERROR_EMPTY_EVENTS);
    }

    const events = [];

    responseEvents.forEach((e) => {
      const event = {};
      const dateHour = e.dtHrCriado.split('T');
      const date = dateHour[0];
      const hour = dateHour[1];

      event.event = e.descricao;
      event.date = date;
      event.hour = hour;
      event.location = `${e.unidade.tipo} - ${this.startCase(e.unidade.endereco.cidade)} / ${e.unidade.endereco.uf}`;

      if (e.unidadeDestino) {
        event.destination = `${e.unidadeDestino.tipo} - ${this.startCase(e.unidadeDestino.endereco.cidade)} / ${e.unidadeDestino.endereco.uf}`;
      }

      events.push(event);
    });

    return events;
  }

  startCase(text) {
    return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }
}

module.exports = ApiCorreiosService;
