import { assign } from 'xstate';
import uploadFiles from '../api/upload-files';

export const uploadFilesMachine = {
  id: 'uploadFiles',
  states: {
    uploading: {
      invoke: {
        id: 'uploadingFiles',
        src: (context, data) => uploadFiles(context, data),
        onDone: {
          target: 'success',
          actions: assign({ msg: (context, { data }) => data.msg, msgType: (context, { data }) => data.msgType }),
        },
        onError: {
          target: 'failed',
          actions: assign({ msg: (context, { data }) => data.msg, msgType: (context, { data }) => data.msgType }),
        },
      },
    },
    success: {},
    failed: {},
    canceled: {},
  },
};