const request = require('request-promise-native').defaults({ followRedirect: true, followAllRedirects: true });
const cheerio = require('cheerio');
const iconv = require('iconv-lite');

/**
 * Track object
 *
 * @param {!string} code code of Correios
 * @returns {Promise} return Promise
 */
async function track(code = '') {
  try {
    const options = {
      method: 'POST',
      url: 'https://www2.correios.com.br/sistemas/rastreamento/resultado.cfm',
      form: {
        acao: 'track',
        objetos: code,
      },
      encoding: null,
      timeout: 10000,
    };

    const object = { code, events: [] };
    const body = await request(options);
    const bodyDecode = iconv.decode(body, 'iso-8859-1');
    const $ = cheerio.load(bodyDecode, { decodeEntities: false });

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
  } catch (ex) {
    throw new Error('Error, try again later');
  }
}

module.exports = {
  track,
};
