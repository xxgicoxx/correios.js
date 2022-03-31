const cheerio = require('cheerio');

const { correiosConfig } = require('../configs');
const { request } = require('../utils');

class CorreiosService {
  async track(code) {
    if (!code) {
      throw new Error("'code' cannot be empty");
    }

    const object = { code, events: [] };

    const body = await request({ url: `${correiosConfig.url}?id=${code}` });
    const $ = cheerio.load(body);

    $('div.singlepost').find('ul').each(async (index, ul) => {
      const li = $(ul).find('li');
      const event = await this.extract($, li);

      if (event) {
        object.events.push(event);
      }
    });

    return object;
  }

  async extract($, li) {
    const object = {};

    $(li).each((index, action) => {
      const text = $(action).text();

      if (text.includes('Status: ')) {
        object.event = text.replace('Status: ', '');
      } else if (text.includes('Data  : ')) {
        const dateHour = text.replace('Data  : ', '').split('|');

        object.date = dateHour[0].toString().trim();
        object.hour = dateHour[1].toString().replace('Hora: ', '').trim();
      } else if (text.includes('Local: ')) {
        object.location = text.replace('Local: ', '');
      } else if (text.includes('Origem: ')) {
        object.origin = text.replace('Origem: ', '');
      } else if (text.includes('Destino: ')) {
        object.destination = text.replace('Destino: ', '');
      }
    });

    return object;
  }
}

module.exports = CorreiosService;
