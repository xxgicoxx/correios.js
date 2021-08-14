const { CorreiosService } = require('../services');

class CorreiosController {
  constructor() {
    this._service = new CorreiosService();
  }

  /**
   * Track object
   *
   * @param {string} code code of Correios
   *
   * @returns {Promise} Promise
   */
  track(code) {
    return this._service.track(code);
  }
}

module.exports = CorreiosController;
