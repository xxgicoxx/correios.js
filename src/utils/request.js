const fetch = require('node-fetch');
const FormData = require('form-data');

/**
 * Request URL
 *
 * @param {Object} options Options
 * @param {string} options.url URL
 * @param {Object} [options.form] Form data
 * @param {string} [options.method = 'GET'] Method
 */
async function request(options = {}) {
  const form = new FormData();
  Object.keys(options.form || {}).forEach((key) => form.append(key, options.form[key]));

  const result = await fetch(`${options.url}`, { method: options.method || 'GET', body: form });

  return result.textConverted();
}

module.exports = request;
