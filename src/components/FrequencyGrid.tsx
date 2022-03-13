import {useContext, useEffect} from "react";
import {useAnimation, motion} from 'framer-motion';
import {useTypedSelector} from "../hooks/UseTypedSelector";
import { TuningFrequencies, TuningStrings} from "../types/tunerReducer";
import {AppContext} from "../utils/AppContext";

export default function FrequencyGrid(props: { pitch: number }) {
  const {string, tuning} = useTypedSelector(state => state.tuner);
  const controls = useAnimation();
  const eventEmitterClient = useContext(AppContext).eventEmitterClient;
  const tuningStrings = TuningStrings[tuning as keyof typeof TuningStrings];
  const currentString = tuningStrings[string as keyof typeof tuningStrings];
  const tuningFrequencies = TuningFrequencies[tuning as keyof typeof TuningFrequencies];
  const currentFrequency = tuningFrequencies[string as keyof typeof tuningFrequencies];
  let pitchOffset = props.pitch - currentFrequency;
  let signOfDifference =
    pitchOffset < 0 ? 1 : 1;
  let distance = props.pitch !== -1 && props.pitch !== 0 ? signOfDifference * (pitchOffset) / 5 * 27 : 0
  let clampedDistance = distance > 135 ? 135 : distance < -135 ? -135 : distance;
  const color = pitchOffset <= 1 && pitchOffset >= -1 ? "#45BF55" : pitchOffset <= -2 ?  "#F3B562" : pitchOffset >= 2 ? "#F06060" : "#8CBEB2";
  const indicationText = pitchOffset <= 1 && pitchOffset >= -1 ? "Perfect" : pitchOffset <= -2 ?  "Low" : pitchOffset >= 2 ? "High" : "-";
  eventEmitterClient?.subscribe("stop-tuning", () => {
    clampedDistance = 0;
  });
  useEffect(() => {
    controls.start({
      translateX: 147 + clampedDistance,
      transition: {
        duration: 0.15,
      },
    });
  }, [controls, props.pitch]);

  let rulerDivs = new Array(11).fill(0).map((line, index) => {
    let height;
    if (index === 0 || index === 10) {
      height = 130;
    } else if (index === 5) {
      height = 260;
    } else {
      height = 65;
    }
    return (
      <div
        key={index}
        className={'m-3'}
        style={{
          width: '3px',
          height: height + 'px',
          backgroundColor: 'rgba(51, 51, 51, 70)',
        }}
      />
    );
  });

  return (
    <>
      <div className={'flex flex-col justify-center items-center'}>
        <div className={'flex flex-col justify-center items-center mb-3 w-14'}>
          {/*@ts-ignore*/}
          <span style={{color: color}}>{string ? currentString : '-'}</span>
          <div className={'border-b-2 w-full m-2 border-grey-dark'}/>
          <span style={{color: color}}>{indicationText}</span>
        </div>
        <div className={'flex justify-between items-center'}>
          {rulerDivs}
          <motion.div
            animate={controls}
            className={`absolute`}
            style={{
              backgroundColor: color,
              transition: "background-color 0.1s ease-out",
              position: "absolute",
              width: "3px",
              height: 260,
            }}
          />
        </div>
        <span className={'text-white'}>{currentFrequency || 0} Hz</span>
      </div>
    </>
  )
}
