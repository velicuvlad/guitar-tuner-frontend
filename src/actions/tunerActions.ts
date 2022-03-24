import {Dispatch} from "redux";

export const setMetronomeBpm = (bpm: number) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: "SET_BPM",
      payload: bpm
    });
  };
}
