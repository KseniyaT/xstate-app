import axios from 'axios';
import CONSTANTS from '../constants';
import '../server';

axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-type': 'application/json',
  }
});

const fetchUrl = new Promise((resolve, reject) => {
  return axios.get('/api/url')
    .then((response) => {
      const { url, id } = response.data;  
      return resolve({ url, id, msg: undefined, msgType: undefined });
    })
    .catch((error) => {
      let errors = [];
      if (error && error.response && error.response.data && error.response.data.errors) {
        errors = error.response.data.errors;
      }
      return resolve({ url: undefined, id: undefined, msg: errors[0] ?? CONSTANTS.MSG.SOMETHING_WENT_WRONG, msgType: CONSTANTS.MSG_TYPES.ERROR });
    });
});

export default fetchUrl;
