const fetch = require('node-fetch');
const FormData = require('form-data');
const cheerio = require('cheerio');

/**
 * Track object
 *
 * @param {string} code code of Correios
 * @returns {Promise} Promise
 */
async function track(code) {
  try {
    if(!code) {
      throw new Error('Code cannot be empty');
    }

    const form = new FormData();

    form.append('acao', 'track');
    form.append('objetos', code);

    const object = { code, events: [] };
    const body = await fetch('https://www2.correios.com.br/sistemas/rastreamento/resultado.cfm', { method: 'POST', body: form });
    const $ = cheerio.load(await body.textConverted());

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
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  track,
};
