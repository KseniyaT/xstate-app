import { useState } from 'react';
import FileUploader from './components/FileUploader';

const App = () => {
  const [status, setStatus] = useState('');

  const handleUploadStatus = (state: string): void => {
    setStatus(state);
  };

  return (
    <main>
      <FileUploader onUploadStatus={handleUploadStatus} />
      <div className="row">
        <section className="section col s12 m8 offset-m1 xl8 offset-xl2 block-container">
          <div className="card">
            <div className="card-content">
              <p>Upload status: <span>{status}</span></p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
