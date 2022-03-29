import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Tuner from "./pages/Tuner";
import Metronome from './pages/Metronome';
import Header from "./components/Header";
import webSocketClient from "./utils/WebSocketClient";
import { AppContext } from './utils/AppContext';
import eventEmitterClient from "./utils/EventEmitter";

export let appContext = {
  webSocketClient:webSocketClient,
  eventEmitterClient: eventEmitterClient
}

function App() {
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
