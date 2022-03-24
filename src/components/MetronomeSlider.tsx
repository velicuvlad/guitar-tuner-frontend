import {CircularInput, CircularTrack, CircularThumb, CircularProgress} from 'react-circular-input'
import {useDispatch} from "react-redux";
import {setMetronomeBpm} from "../actions/tunerActions";
import {useState} from "react";
export default function MetronomeSlider(props: { changeInterval: (arg0: number) => void; }) {
	const dispatch = useDispatch();
	const [value, setValue] = useState(0.4444444444444444);
	const stepValue = (value: number) => Math.round(value * 360) / 360;
	const setBpm = (bpm: number) => {
		return setValue(bpm)
	}
	const setBpmAndUpdateMetronome = (bpm: number) => {
		props.changeInterval(bpm);
		return dispatch(setMetronomeBpm(bpm))
	}
	return (
		<div className={"flex justify-center items-center"}>
			<CircularInput
				value={stepValue(value)}
				onChange={v => (setBpm(stepValue(v)))}
				onChangeEnd={v => (setBpmAndUpdateMetronome(stepValue(v)))}
			>
				{/* TODO Change colors to match theme */}
				<CircularTrack strokeWidth={5} stroke={'#ddef34'} />
				<CircularProgress stroke={'#dd1f12'}/>
				<CircularThumb fill="rgba(255,255,255,0.5)" />
				<text x={100} y={100} textAnchor="middle" dy="0.3em" fontWeight="bold" fill={'grey'}>
					{Math.round(stepValue(value) * 360)}
				</text>
			</CircularInput>
		</div>
	);
}
