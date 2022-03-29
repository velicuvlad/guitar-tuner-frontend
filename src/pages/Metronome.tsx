import MetronomeSlider from "../components/MetronomeSlider";
import {useEffect, useRef, useState} from "react";
import {wrap} from 'comlink';
import * as Tone from "tone";
import {useTypedSelector} from "../hooks/UseTypedSelector";
import Worker from "../utils/MetronomeWorker.worker";
import TempoWorker from "../utils/DetectTapTempo.worker";
import {useDispatch} from "react-redux";
import {setMetronomeBpm} from "../actions/tunerActions";


export default function Metronome() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTapTempo, setIsTapTempo] = useState(false);
  const {bpm} = useTypedSelector(state => state.metronome);
  const synth = new Tone.Synth().toDestination();
  const [bpmValue, setBpmValue] = useState(bpm);
  let worker: any = useRef(new Worker())
  let tapTempoWorker: any = useRef( new TempoWorker());
  let comlinkWorkerApi: any = useRef(wrap(tapTempoWorker.current));

  const dispatch = useDispatch();

  useEffect(() => {
    const handleTapTempoBpmChange = (event: any) => {
      if (event.data && typeof event.data === 'number' && event.data !== bpmValue * 360) {
       setBpmValue(event.data / 360)
        changeInterval(Math.round(60000 /event.data ));
      }
    };
    if (tapTempoWorker && tapTempoWorker.current) {
      tapTempoWorker.current.addEventListener('message', handleTapTempoBpmChange)
    }

    return () => {
      tapTempoWorker.current.removeEventListener('message', handleTapTempoBpmChange);
    }

  }, [bpmValue]);


  const changeInterval = (bpm: number) => {
    worker.current.postMessage({interval: bpm})
  }

  const startMetronome = () => {
    if (isPlaying) {
      worker.current.postMessage("stop")
      setIsPlaying(false);
    } else {
      worker.current.postMessage({interval: 60000 / Math.round(bpm * 360)})
      worker.current.postMessage('start')
      setIsPlaying(true);
      // @ts-ignore
      worker.current.onmessage = (e) => {
        if (e.data === 'tick') {
          console.log(performance.now())
          synth.triggerAttackRelease("G4", 0.001);
        }
      }
    }
  }

  const startTapTempo = () => {
    if (isTapTempo) {
      comlinkWorkerApi.current.stop();
      // startMetronome()
      setIsTapTempo(false);
    } else {
      comlinkWorkerApi.current.start();
      setIsTapTempo(true);
      // startMetronome()
    }
  }

  const handleTempoTap = (action: string) => {
    if (isTapTempo) {
      switch (action) {
        case 'press':
          comlinkWorkerApi.current.press();
          break;
        case 'release':
          comlinkWorkerApi.current.release();
          break;
        default:
          break;
      }
    }
  }


  return (
    <div onMouseDown={() => handleTempoTap('press')}
         onMouseUp={() => handleTempoTap('release')} className={'flex flex-col justify-center items-center'}>
      <MetronomeSlider bpmValue={bpmValue} setBpmValue={setBpmValue} changeInterval={changeInterval}/>
      {isTapTempo ? null : (<>
        <button className={'mt-10 text-white'} onClick={startMetronome}>{isPlaying ? 'Stop' : 'Start'}</button>
      </>)}


      <div className="flex justify-center">
        <div className="form-check form-switch">
          <input
            className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
            type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={startTapTempo}/>
          <label className="form-check-label inline-block text-gray-800"
                 htmlFor="flexSwitchCheckDefault">TapTempo</label>
        </div>
      </div>

    </div>
  );
}
