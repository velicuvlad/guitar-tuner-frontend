import MetronomeSlider from "../components/MetronomeSlider";
import {useEffect, useRef, useState} from "react";
import * as Tone from "tone";
import {useTypedSelector} from "../hooks/UseTypedSelector";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import Worker from "worker-loader!../utils/MetronomeWorker.worker";


export default function Metronome() {
  const [isPlaying, setIsPlaying] = useState(false);
  const {bpm} = useTypedSelector(state => state.metronome);
  const synth = new Tone.Synth().toDestination();
  let worker:any = useRef(null)

  useEffect(() => {
    worker.current = new Worker();
  }, [])


  const changeInterval = (bpm: number) => {
    worker.current.postMessage({interval: 60000 / Math.round(bpm * 360)})
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
  return (
    <div className={'flex flex-col justify-center items-center'}>
      <MetronomeSlider changeInterval={changeInterval}/>
      <button className={'mt-10 text-white'} onClick={startMetronome}>{isPlaying ? 'Stop' : 'Start'}</button>
    </div>
  );
}
