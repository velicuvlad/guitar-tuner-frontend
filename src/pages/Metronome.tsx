import MetronomeSlider from "../components/MetronomeSlider";
import { useEffect, useRef, useState } from "react";
import { wrap } from 'comlink';
import * as Tone from "tone";
import {useTypedSelector} from "../hooks/UseTypedSelector";
import Worker from "../utils/MetronomeWorker.worker";
import TempoWorker from "../utils/DetectTapTempo.worker";
import { useDispatch } from "react-redux";


export default function Metronome() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTapTempo, setIsTapTempo] = useState(false);
  const [value, setValue] = useState(0.4444444444444444);
  const {bpm} = useTypedSelector(state => state.metronome);
  const synth = new Tone.Synth().toDestination();
  let worker: any = useRef(null)
  let tapTempoWorker: any = useRef(null);
  let comlinkWorkerApi: any = useRef(null);

  const dispatch = useDispatch();
  
  useEffect(() => {
    worker.current = new Worker();
    tapTempoWorker.current = new TempoWorker();
    comlinkWorkerApi.current = wrap(tapTempoWorker.current);
    if (tapTempoWorker && tapTempoWorker.current) {
      tapTempoWorker.current.addEventListener('message', (event: any) => {
      if (event.data && typeof event.data === 'number') {
        setValue(event.data);
        dispatch({ type: "SET_BPM", payload: event.data }) 
        console.log("event: ", event.data)
      }
      })
    }

  }, [dispatch])


  const changeInterval = (bpm: number) => {
    worker.current.postMessage({ interval: 60000 / Math.round(bpm * 360) })
    console.log("bpm: ", bpm)
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
        setIsTapTempo(false);
      } else {
        comlinkWorkerApi.current.start();
        setIsTapTempo(true);
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
      <MetronomeSlider value={value} setValue={setValue} changeInterval={changeInterval} />
      {isTapTempo ? null : (<><button className={'mt-10 text-white'} onClick={startMetronome}>{isPlaying ? 'Stop' : 'Start'}</button></>)}


      <div className="flex justify-center">
        <div className="form-check form-switch">
          <input className="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={startTapTempo}/>
          <label className="form-check-label inline-block text-gray-800" htmlFor="flexSwitchCheckDefault">TapTempo</label>
        </div>
      </div>
      
    </div>
  );
}
