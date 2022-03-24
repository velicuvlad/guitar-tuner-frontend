import {combineReducers} from "redux";
import {tunerReducer} from "./tuner";
import {metronomeReducer} from "./metronome";

const reducers = combineReducers({
  tuner: tunerReducer,
  metronome: metronomeReducer
})

export default reducers;
export type RootState = ReturnType<typeof reducers>;
