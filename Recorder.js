"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defaultStyle = {
  padding: '10px',
  margin: '5px',
  borderRadius: '2px',
  backgroundColor: 'tomato',
  color: 'white'
};

var createRecorder = function createRecorder(React) {
  var useEffect = React.useEffect,
      useState = React.useState;
  var shouldStop;
  var stopped;
  var audio;

  var Audios = function Audios(_ref) {
    var containerClassName = _ref.containerClassName,
        onSend = _ref.onSend,
        Stop = _ref.Stop,
        Play = _ref.Play,
        Pause = _ref.Pause,
        Record = _ref.Record,
        Send = _ref.Send;
    useEffect(function () {
      shouldStop = false;
      stopped = false;
    }, []);

    var _useState = useState(false),
        _useState2 = _slicedToArray(_useState, 2),
        isRecording = _useState2[0],
        setIsRecording = _useState2[1];

    var _useState3 = useState(false),
        _useState4 = _slicedToArray(_useState3, 2),
        isPlaying = _useState4[0],
        setisPlaying = _useState4[1];

    var _useState5 = useState(null),
        _useState6 = _slicedToArray(_useState5, 2),
        blobUrl = _useState6[0],
        setBlobUrl = _useState6[1];

    var _useState7 = useState(null),
        _useState8 = _slicedToArray(_useState7, 2),
        blob = _useState8[0],
        setBlob = _useState8[1];

    var btnRecordClickHandler = function btnRecordClickHandler() {
      setIsRecording(true);
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      }).then(function (stream) {
        var mediaRecorder = new MediaRecorder(stream);
        var recordedChunks = [];
        mediaRecorder.start(100);
        mediaRecorder.addEventListener('dataavailable', function (e) {
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }

          if (shouldStop === true && stopped === false) {
            shouldStop = false;
            stopped = true;
            mediaRecorder.stop();
          }
        });
        mediaRecorder.addEventListener('stop', function () {
          var blob = new Blob(recordedChunks);
          var blobUrl = URL.createObjectURL(blob);
          setBlob(blob);
          setBlobUrl(blobUrl);
          setIsRecording(false);
          stopped = false;
        });
      });
    };

    var btnStopClickHandler = function btnStopClickHandler() {
      shouldStop = true;
    };

    var btnSendClickHandler = function btnSendClickHandler() {
      onSend(blobUrl, blob);
      setBlobUrl(null);
      setBlob(null);
    };

    var btnPlayClickHandler = function btnPlayClickHandler() {
      if (isPlaying === false) {
        setisPlaying(true);
        audio = new Audio(blobUrl);

        audio.onended = function () {
          setisPlaying(false);
        };

        audio.play();
      } else {
        audio.pause();
        setisPlaying(false);
      }
    };

    return React.createElement("div", {
      className: containerClassName
    }, isRecording ? React.cloneElement(Stop, {
      onClick: btnStopClickHandler,
      style: Stop.props.className ? {} : defaultStyle
    }) : React.createElement(React.Fragment, null, blobUrl ? React.createElement(React.Fragment, null, isPlaying ? React.cloneElement(Pause, {
      onClick: btnPlayClickHandler,
      style: Pause.props.className ? {} : defaultStyle
    }) : React.cloneElement(Play, {
      onClick: btnPlayClickHandler,
      style: Play.props.className ? {} : defaultStyle
    })) : React.cloneElement(Record, {
      onClick: btnRecordClickHandler,
      style: Record.props.className ? {} : defaultStyle
    })), React.cloneElement(Send, {
      onClick: btnSendClickHandler,
      style: Send.props.className ? {} : blobUrl ? _objectSpread({}, defaultStyle, {
        backgroundColor: 'green'
      }) : {
        display: 'none'
      },
      className: blobUrl ? "".concat(Send.props.className, " ").concat(Send.props.addactiveclass) : "".concat(Send.props.className, " ").concat(Send.props.adddisabledclass)
    }));
  };

  return Audios;
};

module.exports = createRecorder;
