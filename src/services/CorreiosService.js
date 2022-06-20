const ApiCorreiosService = require('./ApiCorreiosService');
const LinkCorreiosService = require('./LinkCorreiosService');

const apiCorreiosService = new ApiCorreiosService();
const linkCorreiosService = new LinkCorreiosService();

const { constants } = require('../utils');

class CorreiosService {
  async track(code) {
    const object = { code, events: [] };

    try {
      if (!code || code.length < constants.CODE_MIN || code.length > constants.CODE_MAX) {
        throw new Error(constants.ERROR_INVALID_CODE);
      }

      const api = apiCorreiosService.track(code);
      const link = linkCorreiosService.track(code);

      object.events = await Promise.any([api, link]);

      return object;
    } catch (error) {
      return object;
    }
  }
}

module.exports = CorreiosService;
