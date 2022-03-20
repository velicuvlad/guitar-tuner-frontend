import CircularSlider from '../common/CircularSlider';

export default function Metronome() {
	return (
		<div>
			<CircularSlider
				label='Tempo'
				labelColor='#FFFFFF'
				labelFontSize='0px'
				appendToValue='BPM'
				valueFontSize={'1rem'}
				verticalOffset={'1rem'}
				progressColorFrom='#8CBEB2'
				progressColorTo='#53EFCA'
				progressSize={25}
				knobColor='#FFFFFF'
				knobSize={45}
				knobPosition='top'
				trackColor='#96969633'
				trackSize={25}
				width={ 280}
			/>
		</div>
	);
}