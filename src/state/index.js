import { assign, createMachine } from 'xstate';
import { uploadFilesMachine } from './upload-files';

import fetchUrl from '../api/fetch-url';


export const filesMachine = createMachine({
  predictableActionArguments: true,
  id: 'filesMachine',
  initial: 'fetchUrlMachine',
  context: {
    url: undefined,
    id: undefined,
    msg: undefined,
    msgType: undefined,
    files: [],
    controller: null,
  },
  states: {
    init: {},
    fetchUrlMachine: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            id: 'fetchUrl',
            src: (context, data) => fetchUrl, 
            onDone: {
              target: 'resolved',
              actions: assign({ 
                url: (context, { data }) => data.url, 
                id: (context, { data }) => data.id, 
                msg: (context, { data }) => data.msg, 
                msgType: (context, { data }) => data.msgType 
              }),
            },
          },
        },
        resolved: {},
      },
    },
    updateFilesList: {},
    uploadFilesMachine,
  },
  on: {
    FETCH_URL: {
      target: 'fetchUrlMachine',
    },
    UPDATE_FILES_LIST: {
      target: 'updateFilesList',
      actions: assign((context, event) => ({
        files: event.files,
      })),
    },
    UPLOAD_FILES: {
      target: 'uploadFilesMachine.uploading',
      actions: assign((context, event) => ({
        controller: event.controller,
      })),
    },
    CANCEL: {
      target: 'uploadFilesMachine.canceled',
      actions: ['cancel'],
    },
  },
}, {
  actions: {
    cancel: ({ controller }) => {
      controller?.abort();
    },
  }
});

