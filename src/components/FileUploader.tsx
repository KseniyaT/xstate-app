import { useEffect, useRef } from 'react';
import { useMachine } from '@xstate/react';
import { filesMachine } from '../state';
import Loader from './Loader';
import Notification from './Notification';
import '../styles/style.css';

type paramTypes = {
  onUploadStatus?: (param: string) => void;
};

const FileUploader = ({ onUploadStatus }: paramTypes): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [current, send] = useMachine(filesMachine);

  const isUploadSuccess = current.matches('uploadFilesMachine.success');
  const isLoading = current.matches('fetchUrlMachine.loading') || current.matches('uploadFilesMachine.uploading');
  const isData = current?.context?.url && current?.context?.id;
  const files = current?.context?.files;
  const type = current?.context?.msgType;
  const msg = current?.context?.msg;
  const isUploadBtnDisabled = !isData || !files.length || isLoading;
  const isCancelBtnDisabled = !current.matches('uploadFilesMachine.uploading');

  useEffect(() => {
    if (inputRef && inputRef.current && isUploadSuccess) {
      inputRef.current.value = null as unknown as string;
      send({
        type: 'UPDATE_FILES_LIST',
        files: [],
      });
    }
  }, [isUploadSuccess, inputRef]);

  useEffect(() => {
    if (typeof onUploadStatus === 'function') {
      if (typeof current.value === 'object' && current.value.uploadFilesMachine) {
        onUploadStatus(current.value.uploadFilesMachine as string);
      }
    }
  }, [current.value]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.currentTarget;

    if (!target.files?.length) {
      return;
    };

    send({
      type: 'UPDATE_FILES_LIST',
      files: target.files,
    });
  }

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    if (!files.length || !isData) { 
      return; 
    };

    send({
      type: 'UPLOAD_FILES',
      controller: new AbortController(),
    });
  }

  const handleCancelClick = (event: React.SyntheticEvent): void => {
    send({
      type: 'CANCEL',
    });
  };

  return (
    <div className="row">
      <section className="section col s12 m8 offset-m1 xl8 offset-xl2 block-container">
        {isLoading && <div className="block-spinner"><Loader /></div> }
        {msg && <Notification type={type}>{msg}</Notification>}
        <div className="row">
          <form className="col s12 card blue-grey darken-5">
            <div className="card-content white-text">
              <h2 className="card-title">Upload Images</h2>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                disabled={!isData || isLoading}
                onChange={handleChange}
                multiple
              />
            </div>
            <div className="card-action">
              <button
                type="submit"
                className="waves-effect waves-light teal lighten-2 btn-small mr-10"
                onClick={handleSubmit} 
                disabled={isUploadBtnDisabled}
              >
                Upload
              </button>
              <button
                type="button"
                className="waves-effect waves-light orange lighten-2 btn-small"
                onClick={handleCancelClick}
                disabled={isCancelBtnDisabled}
              >
                Cancel
              </button>  
            </div>
          </form>          
        </div>
      </section>
    </div>
  );
}

export default FileUploader;
