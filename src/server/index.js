import { createServer, Response } from 'miragejs';
import { v4 as uuidv4 } from 'uuid';
import CONSTANTS from '../constants';
import { getRandomNum } from '../utils';

export default createServer({
  routes() {
    this.namespace = 'api';

    this.get('/url', () => {
      const randomNum = getRandomNum(100);

      if (randomNum === 7) {
        return new Response(404, { some: 'header' }, { errors: [CONSTANTS.MSG.NOT_FOUND_ERROR] });
      }
      
      if (randomNum === 6) {
        return new Response(500, { some: 'header' }, { errors: [CONSTANTS.MSG.SERVER_ERROR] });
      };

      return { 
        id: uuidv4(), 
        url: '/api/upload',
      }
    });

    this.post('/upload', (schema, request) => {
      const randomNum = getRandomNum(40);

      // errors
      if (randomNum === 5) {
        return new Response(500, {}, { errors: [CONSTANTS.MSG.SERVER_ERROR] });
      }

      if (randomNum === 4) {
        return new Response(404, {}, { errors: [CONSTANTS.MSG.NOT_FOUND_ERROR] });
      }

      if (randomNum === 10) {
        return new Response(403, {}, { errors: [CONSTANTS.MSG.ACCSESS_ERROR] });
      }

      // success
      return { status: 'ok' };

    });
  },
});