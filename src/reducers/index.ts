import {combineReducers} from "redux";
import {tunerReducer} from "./tuner";

const reducers = combineReducers({
  tuner: tunerReducer
})

export default reducers;
export type RootState = ReturnType<typeof reducers>;
