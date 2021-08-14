const cheerio = require('cheerio');

const { correiosConfig } = require('../configs');
const { request } = require('../utils');

class CorreiosService {
  async track(code) {
    if (!code) {
      throw new Error("'code' cannot be empty");
    }

    const object = { code, events: [] };

    const body = await request({ url: correiosConfig.url, method: 'POST', form: { acao: 'track', objetos: code } });
    const $ = cheerio.load(body);

    let data;
    let evento;

    $('table.listEvent.sro tbody tr').each((index, elm) => {
      const td = $(elm).find('td');

      data = $(td).first().text().split('\n');
      data = data.filter((n) => n);

      evento = $(td).last().html().split('<br>');

      object.events.push({
        date: data[0].trim(),
        hour: data[1].trim(),
        location: data[2].trim(),
        event: evento[0].replace(/[\n\r]/g, '').replace('<strong>', '').replace('</strong>', '').trim(),
        message: evento[1].replace(/\s\s+/g, ' ').trim(),
      });
    });

    return object;
  }
}

module.exports = CorreiosService;
