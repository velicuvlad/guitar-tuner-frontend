import {MetronomeReducerAction, MetronomeReducerState} from "../types/metronomeReducer";

const initialState: MetronomeReducerState = {
  bpm: 0.3333333333333333
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
