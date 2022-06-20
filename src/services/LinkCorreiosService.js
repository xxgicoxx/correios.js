const cheerio = require('cheerio');

const { correiosConfig } = require('../configs');
const { constants, request } = require('../utils');

class LinkCorreiosService {
  async track(code) {
    const events = [];
    const body = await request({ url: `${correiosConfig.link}?id=${code}`, text: true });
    const $ = cheerio.load(body);
    const responseEvents = $('div.singlepost').find('ul');

    if (!responseEvents.length) {
      throw new Error(constants.ERROR_EMPTY_EVENTS);
    }

    responseEvents.each(async (index, ul) => {
      const li = $(ul).find('li');
      const event = await this.extract($, li);

      if (event) {
        events.push(event);
      }
    });

    return events;
  }

  async extract($, li) {
    const object = {};

    $(li).each((index, action) => {
      const text = $(action).text();

      if (text.includes('Status: ')) {
        object.event = text.replace('Status: ', '');
      } else if (text.includes('Data  : ')) {
        const dateHour = text.replace('Data  : ', '').split('|');
        const splitDate = dateHour[0].toString().trim().split('/');
        const hour = dateHour[1].toString().replace('Hora: ', '').trim();

        object.date = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
        object.hour = `${hour}:00`;
      } else if (text.includes('Local: ')) {
        object.location = text.replace('Local: ', '');
      } else if (text.includes('Origem: ')) {
        object.location = text.replace('Origem: ', '');
      } else if (text.includes('Destino: ')) {
        object.destination = text.replace('Destino: ', '');
      }
    });

    return object;
  }
}

module.exports = LinkCorreiosService;
