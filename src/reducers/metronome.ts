import {MetronomeReducerAction, MetronomeReducerState} from "../types/metronomeReducer";

const initialState: MetronomeReducerState = {
  bpm: 0.4444444444444444
}
export const metronomeReducer = (state = initialState, action: MetronomeReducerAction) => {
  switch (action.type) {
    case 'SET_BPM':
      return {
        ...state,
        bpm: action.payload
      }
    default:
      return state
  }
}
