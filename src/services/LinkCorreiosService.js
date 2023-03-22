const cheerio = require('cheerio');

const { correiosConfig } = require('../configs');
const { constants, request } = require('../utils');

class LinkCorreiosService {
  async track(code) {
    const events = [];
    const body = await request({ url: `${correiosConfig.link}${code}`, text: true });
    const $ = cheerio.load(body);
    const responseEvents = $('div.singlepost').find('ul');

    if (!responseEvents.length) {
      throw new Error(constants.MESSAGE_EMPTY_EVENTS);
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

      if (text.includes(constants.TAG_STATUS)) {
        object.event = text.replace(constants.TAG_STATUS, constants.EMPTY);
      } else if (text.includes(constants.TAG_DATA)) {
        const dateHour = text.replace(constants.TAG_DATA, constants.EMPTY).split('|');
        const splitDate = dateHour[0].toString().trim().split('/');
        const hour = dateHour[1].toString().replace(constants.TAG_HORA, constants.EMPTY).trim();

        object.date = `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
        object.hour = `${hour}`;
      } else if (text.includes(constants.TAG_LOCAL)) {
        object.location = text.replace(constants.TAG_LOCAL, constants.EMPTY);
      } else if (text.includes(constants.TAG_ORIGEM)) {
        object.location = text.replace(constants.TAG_ORIGEM, constants.EMPTY);
      } else if (text.includes(constants.TAG_DESTINO)) {
        object.destination = text.replace(constants.TAG_DESTINO, constants.EMPTY);
      }
    });

    return object;
  }
}

module.exports = LinkCorreiosService;
