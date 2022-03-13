import {Dispatch} from "redux";


export const setAnimationFrameId = (animationFrameId: number) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: "SET_ANIMATION_FRAME_ID",
      payload: animationFrameId
    });
  };
}
