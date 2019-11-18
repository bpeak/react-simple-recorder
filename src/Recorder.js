const defaultStyle = {
  padding: '10px',
  margin: '5px',
  borderRadius: '2px',
  backgroundColor: 'tomato',
  color: 'white',
};

const createRecorder = React => {
  const { useEffect, useState } = React;

  let shouldStop;
  let stopped;
  let audio;

  const Audios = ({ containerClassName, onSend, Stop, Play, Pause, Record, Send }) => {
    useEffect(() => {
      shouldStop = false;
      stopped = false;
    }, []);

    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setisPlaying] = useState(false);
    const [blobUrl, setBlobUrl] = useState(null);
    const [blob, setBlob] = useState(null);

    const btnRecordClickHandler = () => {
      setIsRecording(true);
      navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        const recordedChunks = [];

        mediaRecorder.start(100);
        mediaRecorder.addEventListener('dataavailable', function(e) {
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }

          if (shouldStop === true && stopped === false) {
            shouldStop = false;
            stopped = true;
            mediaRecorder.stop();
          }
        });

        mediaRecorder.addEventListener('stop', function() {
          const blob = new Blob(recordedChunks);
          const blobUrl = URL.createObjectURL(blob);
          setBlob(blob);
          setBlobUrl(blobUrl);
          setIsRecording(false);
          stopped = false;
        });
      });
    };

    const btnStopClickHandler = () => {
      shouldStop = true;
    };

    const btnSendClickHandler = () => {
      onSend(blobUrl, blob);
      setBlobUrl(null);
      setBlob(null);
    };

    const btnPlayClickHandler = () => {
      if (isPlaying === false) {
        setisPlaying(true);
        audio = new Audio(blobUrl);
        audio.onended = () => {
          setisPlaying(false);
        };
        audio.play();
      } else {
        audio.pause();
        setisPlaying(false);
      }
    };

    return (
      <div className={containerClassName}>
        {isRecording ? (
          React.cloneElement(Stop, {
            onClick: btnStopClickHandler,
            style: Stop.props.className ? {} : defaultStyle,
          })
        ) : (
          <>
            {blobUrl ? (
              <>
                {isPlaying
                  ? React.cloneElement(Pause, {
                      onClick: btnPlayClickHandler,
                      style: Pause.props.className ? {} : defaultStyle,
                    })
                  : React.cloneElement(Play, {
                      onClick: btnPlayClickHandler,
                      style: Play.props.className ? {} : defaultStyle,
                    })}
              </>
            ) : (
              React.cloneElement(Record, {
                onClick: btnRecordClickHandler,
                style: Record.props.className ? {} : defaultStyle,
              })
            )}
          </>
        )}
        {React.cloneElement(Send, {
          onClick: btnSendClickHandler,
          style: Send.props.className ? {} : blobUrl ? { ...defaultStyle, backgroundColor: 'green' } : { display: 'none' },
          className: blobUrl ? `${Send.props.className} ${Send.props.addactiveclass}` : `${Send.props.className} ${Send.props.adddisabledclass}`,
        })}
      </div>
    );
  };

  return Audios;
};

export default createRecorder;
