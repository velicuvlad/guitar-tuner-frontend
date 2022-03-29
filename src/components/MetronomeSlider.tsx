import {CircularInput, CircularTrack, CircularThumb, CircularProgress} from 'react-circular-input'
import {useDispatch} from "react-redux";
import {setMetronomeBpm} from "../actions/tunerActions";
import {useTypedSelector} from "../hooks/UseTypedSelector";
import {useState} from "react";

export default function MetronomeSlider(props: { setBpmValue: (arg0: number) => any; changeInterval: (arg0: number) => void; bpmValue: number; }) {
	const dispatch = useDispatch();
	const stepValue = (value: number) => Math.round(value * 360) / 360;
	const setBpm = (bpm: number) => {
		return props.setBpmValue(bpm)
	}
	const setBpmAndUpdateMetronome = (bpm: number) => {
		props.changeInterval(bpm);
		return props.setBpmValue(bpm)
	}
	return (
		<div className={"flex justify-center items-center"}>
			<CircularInput
				value={stepValue(props.bpmValue)}
				onChange={v => (setBpm(stepValue(v)))}
				onChangeEnd={v => (setBpmAndUpdateMetronome(stepValue(v)))}
			>
				<CircularTrack strokeWidth={4} stroke={'#8CBEB2'} />
				<CircularProgress stroke={'#53EFCA'}/>
				<CircularThumb fill="rgba(255,255,255,0.5)" />
				<text x={100} y={100} textAnchor="middle" dy="0.3em" fontWeight="bold" fill={'grey'}>
					{Math.round(stepValue(props.bpmValue) * 360)}
				</text>
			</CircularInput>
		</div>
	);
}
