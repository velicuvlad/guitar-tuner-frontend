import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Tuner from "./pages/Tuner";
import Metronome from './pages/Metronome';
import Header from "./common/Header";
import webSocketClient from "./utils/WebSocketClient";
import { AppContext } from './utils/AppContext';
import eventEmitterClient from "./utils/EventEmitter";

export let appContext = {
  webSocketClient:webSocketClient,
  eventEmitterClient: eventEmitterClient
}

function App() {
  // const startDetection = async () => {
  //   let context = new AudioContext({sampleRate: 44100});
  //   const audioContext = context;
  //   let analyser = context.createAnalyser();
  //   navigator.mediaDevices
  //     .getUserMedia({
  //       audio: {
  //         autoGainControl: false,
  //         noiseSuppression: false,
  //       },
  //     })
  //     .then(stream => {
  //       ws.onmessage = (event) => {
  //         console.log(event.data)
  //       }
  //       let mediaStreamSource;
  //       let newAnalyser = analyser
  //       if (newAnalyser) newAnalyser.fftSize = 4096;
  //       if (audioContext) {
  //         mediaStreamSource = audioContext.createMediaStreamSource(
  //           stream
  //         );
  //         mediaStreamSource.connect(analyser);
  //       }
  //       analyser = newAnalyser
  //
  //       function record() {
  //         let buffer = new Float32Array(4096);
  //         analyser.getFloatTimeDomainData(buffer);
  //         ws.send(buffer)
  //         requestAnimationFrame(record)
  //       }
  //
  //       record();
  //     })
  //     .catch(err => {
  //       console.log('Getusermedia threw error: ' + err);
  //     });
  // }
  
    return (
      <AppContext.Provider value={appContext}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/tuner" />} />
            <Route path="tuner" element={<Tuner />} />
            <Route path="metronome" element={<Metronome/>}/>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    );
  };

export default App;
