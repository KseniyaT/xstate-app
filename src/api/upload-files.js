import axios from 'axios';
import CONSTANTS from '../constants';
import { createFormData } from '../utils';
import '../server';

axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-type': 'application/json',
  }
});

const uploadFiles = async (context, data) => {
  const { url, id, files, controller } = context;

  const formData = createFormData(files);

  return new Promise((resolve, reject) => {
    axios.post(url, JSON.stringify({ id, formData }), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      signal: controller.signal,
    })
    .then((response) => { 
      resolve({ msg: CONSTANTS.MSG.SUCCESS_UPLOAD, msgType: CONSTANTS.MSG_TYPES.SUCCESS });
    })  
    .catch((error) => { 
      let msg = CONSTANTS.MSG.SOMETHING_WENT_WRONG;

      if (error && error.response && error.response.data && error.response.data.errors) {
        msg = error.response.data.errors[0];
      }

      reject({ msg, msgType: CONSTANTS.MSG_TYPES.ERROR });
    })      
  });
};

export default uploadFiles;