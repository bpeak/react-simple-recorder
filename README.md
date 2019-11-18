# react-simple-recorder

> Simple React component package for Record Audio

# Installation

```
npm install react-simple-recorder
yarn add react-simple-recorder
```

## Example

```javascript
import React from 'react';
import createRecorder from 'react-simple-recorder';

const Recorder = createRecorder(React);

function App() {
  return (
    <div>
      <Recorder
        containerClassName="my-recorder-container"
        Stop={<div>stop!</div>}
        Play={<p>play!</p>}
        Pause={<button>pause!</button>}
        Record={<div>record!</div>}
        Send={<div>send!</div>}
        onSend={(blobUrl, blob) => {
          alert('check console!');
          console.log('blob : ', blob);
          console.log('blobUrl : ', blobUrl);
        }}
      />
    </div>
  );
}
```

## Example ( use blobUrl with audio tag )

```javascript
import React, { useState } from 'react';
import createRecorder from 'react-simple-recorder';

const Recorder = createRecorder(React);

function App() {
  const [blobUrl, setBlobUrl] = useState(null);

  return (
    <div>
      <Recorder
        containerClassName="my-recorder-container"
        Stop={<div>stop!</div>}
        Play={<p>play!</p>}
        Pause={<button>pause!</button>}
        Record={<div>record!</div>}
        Send={<div>send!</div>}
        onSend={(blobUrl, blob) => {
          alert('check console!');
          console.log('blob : ', blob);
          console.log('blobUrl : ', blobUrl);
          setBlobUrl(blobUrl);
        }}
      />
      <div>
        {blobUrl ? (
          <audio controls>
            <source src={blobUrl}></source>
          </audio>
        ) : (
          <div>blobUrl(audio) not exist</div>
        )}
      </div>
    </div>
  );
}
```

## Example ( with className )

```javascript
import React from 'react';
import createRecorder from 'react-simple-recorder';

const Recorder = createRecorder(React);

function App() {
  return (
    <div>
      <Recorder
        containerClassName="w"
        Stop={<div className="myStop">stop!</div>}
        Play={<div className="myPlay">play!</div>}
        Pause={<div className="myPause">pause!</div>}
        Record={<div className="myRecord">record!</div>}
        Send={
          <div className="mySend" addactiveclass="sendActive" adddisabledclass="sendDisabled">
            send!
          </div>
        }
        onSend={(blobUrl, blob) => {
          alert('check console!');
          console.log('blob : ', blob);
          console.log('blobUrl : ', blobUrl);
        }}
      />
    </div>
  );
}
```

# Props

| Name               | Type            | arguments       |
| ------------------ | --------------- | --------------- |
| containerClassName | string          |                 |
| Stop               | React.ReactNode |                 |
| Play               | React.ReactNode |                 |
| Pause              | React.ReactNode |                 |
| Record             | React.ReactNode |                 |
| Send               | React.ReactNode |                 |
| onSend             | callback Func   | (blobUrl, blob) |

# Contributing

Contributions, questions and pull requests are all welcomed.

# License

Copyright (c) 2019. [Bpeak](https://bpeakblog.com/) [Licensed with The MIT License (MIT)](http://opensource.org/licenses/MIT)
