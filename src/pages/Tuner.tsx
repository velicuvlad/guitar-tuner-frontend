import StringPicker from "../components/StringPicker";
import TuningPicker from "../components/TuningPicker";
import FrequencyGrid from "../components/FrequencyGrid";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../utils/AppContext";

export default function Tuner() {
  const ws = useContext(AppContext).webSocketClient
  const eventEmitterClient = useContext(AppContext).eventEmitterClient
  const [pitch, setPitch] = useState(0);

  // Listen to websocket event that receives the pitch from the server
  // Listen to an eventEmitter event that the tuning stopped in order to update the pitch to 0
  useEffect(() => {
    ws?.addOnMessageListener((event: any) => {
      setPitch(parseInt(event.data))
    })
    eventEmitterClient?.subscribe('stop-tuning', () => {
      setPitch(0)
    });
  },[])


  return (
    <div className={"flex flex-col justify-center items-center my-10  lg:h-2/3 lg:flex-row"}>
      <div className={"px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center"}>
        <StringPicker ws={ws}/>
        <TuningPicker/>
      </div>
      <div className={"px-4 sm:px-6 lg:px-8 my-5 lg:my-0 flex flex-col justify-center items-center"}>
        <FrequencyGrid pitch={pitch}/>
      </div>
    </div>
  )
}
