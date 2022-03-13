import {TunerReducerAction, TunerReducerState, Tunings, TuningStrings} from "../types/tunerReducer";

const initialState: TunerReducerState = {
  tuning: Tunings.Standard,
  tuningStrings: TuningStrings.Standard,
  string: undefined,
  animationFrameId: undefined
}
export const tunerReducer = (state = initialState, action: TunerReducerAction) => {
  switch (action.type) {
    case 'SET_TUNER_STATE':
      return {
        ...state,
        ...action.payload
      }
    case 'SET_CURRENT_STRING':
      return {
        ...state,
        string: action.payload
      }
    case 'INITIALIZE_MEDIA_ANALYSER':
      return {
        ...state,
        analyser: action.payload
      }
    case 'SET_TUNING':
      return {
        ...state,
        tuning: action.payload,
      }
    case 'SET_TUNING_STRINGS':
      return {
        ...state,
        tuningStrings: action.payload,
      }
    case 'CREATE_WS_CONNECTION':
      return {
        ...state,
        ws: action.payload
      }
    case 'SET_ANIMATION_FRAME_ID':
      return {
        ...state,
        animationFrameId: action.payload
      }
    default:
      return state
  }
}
