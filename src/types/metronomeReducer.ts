export interface MetronomeReducerState {
  bpm: number;
}

export enum ActionType {
  SET_BPM = 'SET_BPM',
}

export type MetronomeReducerAction = {
  type: ActionType;
  payload: any;
};
