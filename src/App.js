import React, { useState } from 'react';
import createRecorder from './Recorder';
import './App.css';

// for testing

const Recorder = createRecorder(React);

function App() {
  const [blob, setBlob] = useState(null);
  return (
    <div>
      <div style={{ backgroundColor: 'grey' }}>test</div>
      {blob && (
        <audio controls>
          <source src={blob}></source>
        </audio>
      )}
      <Recorder
        containerClassName="w"
        onSend={(blobUrl, blob) => {
          alert('check console!zz');
          console.log('blob : ', blob);
          console.log('blobUrl : ', blobUrl);
        }}
        Stop={<div>stop!</div>}
        Play={<div>play!</div>}
        Pause={<div>pause!</div>}
        Record={<div>record!</div>}
        Send={
          <div className="a" addactiveclass="active" adddisabledclass="disabled">
            SEND
          </div>
        }
      />
    </div>
  );
}

export default App;
