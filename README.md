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
import createRecorder from './Recorder';

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
        onSend={blobUrl => {
          alert('check console!');
          console.log(`blobUrl : ${blobUrl}`);
        }}
      />
    </div>
  );
}
```

## Example ( with className )

```javascript
import React from 'react';
import createRecorder from './Recorder';

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
        onSend={blobUrl => {
          alert('check console!');
          console.log(`blobUrl : ${blobUrl}`);
        }}
      />
    </div>
  );
}
```

# Props

| Name               | Type            | arguments |
| ------------------ | --------------- | --------- |
| containerClassName | string          |           |
| Stop               | React.ReactNode |           |
| Play               | React.ReactNode |           |
| Pause              | React.ReactNode |           |
| Record             | React.ReactNode |           |
| Send               | React.ReactNode |           |
| onSend             | callback Func   | blobUrl   |

# Contributing

Contributions, questions and pull requests are all welcomed.

# License

Copyright (c) 2019. [Bpeak](https://bpeakblog.com/) [Licensed with The MIT License (MIT)](http://opensource.org/licenses/MIT)
