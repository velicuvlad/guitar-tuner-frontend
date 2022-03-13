import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/UseTypedSelector";
import {useContext, useRef} from "react";
import {WebSocketClient} from "../utils/WebSocketClient";
import {AppContext} from "../utils/AppContext";

export default function StringPicker(props: { ws: undefined | WebSocketClient }) {
  const {tuningStrings, string} = useTypedSelector(state => state.tuner);
  const eventEmitterClient = useContext(AppContext).eventEmitterClient;
  const animationFrame = useRef(0);
  let streamSource: any = undefined;
  let context: any = undefined;
  let analyser: any = undefined;
  const dispatch = useDispatch();

  // Sends the data received from the microphone as an ArrayBuffer to the server
  const sendBufferToServer = () => {
    if (analyser) {
      let buffer = new Float32Array(4096);
      analyser.getFloatTimeDomainData(buffer);
      props.ws?.send(buffer);
    }
    // @ts-ignore
    animationFrame.current = setTimeout(() => {
      sendBufferToServer();
    }, 1000 / 20);
  }


  // Starts the microphone stream, and marks a string as being selected.
  // If the same string is selected again, the stream will stop.
  const selectString = (selectedString: string) => () => {
    if (!analyser) {
      context = new AudioContext({sampleRate: 44100});
      analyser = context.createAnalyser();
      navigator.mediaDevices
        .getUserMedia({
          audio: {
            autoGainControl: false,
            noiseSuppression: false,
          },
        }).then((stream) => {

        if (analyser) analyser.fftSize = 4096;
        if (context) {
          streamSource = context.createMediaStreamSource(
            stream
          );
          streamSource.connect(analyser);
        }
      })
    }
    if (animationFrame.current !== 0 && string === selectedString) {
      clearTimeout(animationFrame.current);
      eventEmitterClient?.emit("stop-tuning", null);
      dispatch({type: "SET_CURRENT_STRING", payload: undefined});
    } else {
      dispatch({type: "SET_CURRENT_STRING", payload: selectedString});
      sendBufferToServer()
    }
  }

  return <div className={"flex justify-center items-center"}>
    <div className={"flex flex-col justify-center items-center self-start text-white"}>
      <div className={'flex justify-center items-center'}>
        <div className={`${string === 'string_1' ? 'bg-text-accent-background' : 'bg-text-accent'}  blur p-2 absolute`}/>
        <button onClick={selectString('string_1')}
                className={`m-5 relative`}>{tuningStrings.string_1}</button>
      </div>
      <div className={'flex justify-center items-center'}>
        <div className={`${string === 'string_2' ? 'bg-text-accent-background' : 'bg-text-accent'}  blur p-2 absolute`}/>
        <button onClick={selectString('string_2')}
                className={`m-5 relative`}>{tuningStrings.string_2}</button>
      </div>
      <div className={'flex justify-center items-center'}>
        <div className={`${string === 'string_3' ? 'bg-text-accent-background' : 'bg-text-accent'}  blur p-2 absolute`}/>
        <button onClick={selectString('string_3')}
                className={`m-5 relative`}>{tuningStrings.string_3}</button>
      </div>
    </div>
    <img id={'guitar-neck'} className={"mt-8 sm:mx-10"} style={{width: 340, height: 350}} src={'guitar.png'} alt={"guitar neck"}/>
    <div className={"flex flex-col justify-center items-center self-start text-white"}>
      <div className={'flex justify-center items-center'}>
        <div className={`${string === 'string_4' ? 'bg-text-accent-background' : 'bg-text-accent'}  blur p-2 absolute`}/>
        <button onClick={selectString('string_4')}
                className={`m-5 relative`}>{tuningStrings.string_4}</button>
      </div>
      <div className={'flex justify-center items-center'}>
        <div className={`${string === 'string_5' ? 'bg-text-accent-background' : 'bg-text-accent'}  blur p-2 absolute`}/>
        <button onClick={selectString('string_5')}
                className={`m-5 relative`}>{tuningStrings.string_5}</button>
      </div>
      <div className={'flex justify-center items-center'}>
        <div className={`${string === 'string_6' ? 'bg-text-accent-background' : 'bg-text-accent'}  blur p-2 absolute`}/>
        <button onClick={selectString('string_6')}
                className={`m-5 relative`}>{tuningStrings.string_6}</button>
      </div>
    </div>
  </div>
}
