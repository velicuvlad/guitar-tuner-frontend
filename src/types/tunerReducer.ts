export interface TunerReducerState {
}

export enum ActionType {
  SET_TUNER_STATE = 'SET_TUNER_STATE',
  SET_CURRENT_STRING = 'SET_CURRENT_STRING',
  SET_TUNING = 'SET_TUNING',
  INITIALIZE_MEDIA_ANALYSER = 'INITIALIZE_MEDIA_ANALYSER',
  CREATE_WS_CONNECTION = 'CREATE_WS_CONNECTION',
  SET_ANIMATION_FRAME_ID = 'SET_ANIMATION_FRAME_ID',
  SET_TUNING_STRINGS = 'SET_TUNING_STRINGS',
}

export type TunerReducerAction = {
  type: ActionType;
  payload: any;
};

export enum Tunings {
  Standard = 'Standard',
  DropD = 'DropD',
  OpenG = 'OpenG',
}

export enum Tuning {
  string_1 = 'string_1',
  string_2 = 'string_2',
  string_3 = 'string_3',
  string_4 = 'string_4',
  string_5 = 'string_5',
  string_6 = 'string_6',
}

export enum Frequencies {
  string_1 = 'string_1',
  string_2 = 'string_2',
  string_3 = 'string_3',
  string_4 = 'string_4',
  string_5 = 'string_5',
  string_6 = 'string_6',
}

export enum StandardTuning {
  string_1 = 'E',
  string_2 = 'A',
  string_3 = 'D',
  string_4 = 'G',
  string_5 = 'B',
  string_6 = 'E',
}

export enum DropDTuning {
  string_1 = 'D',
  string_2 = 'A',
  string_3 = 'D',
  string_4 = 'G',
  string_5 = 'B',
  string_6 = 'E',
}

export enum OpenGTuning {
  string_1 = 'E',
  string_2 = 'A',
  string_3 = 'D',
  string_4 = 'G',
  string_5 = 'B',
  string_6 = 'E',
}

export class TuningStrings {
  static readonly DropD = DropDTuning
  static readonly OpenG = OpenGTuning
  static readonly Standard = StandardTuning
}


export enum StandardFrequencies {
  string_1 = 329.63,
  string_2 = 246.94,
  string_3 = 196.00,
  string_4 = 146.83,
  string_5 = 110.00,
  string_6 = 82.41,
}

export enum DopDFrequencies {
  string_1 = 293.66,
  string_2 = 246.94,
  string_3 = 196.00,
  string_4 = 146.83,
  string_5 = 110.00,
  string_6 = 82.41,
}

export enum OpenGFrequencies {
  string_1 = 329.63,
  string_2 = 246.94,
  string_3 = 196.00,
  string_4 = 146.83,
  string_5 = 110.00,
  string_6 = 82.41,
}

export class TuningFrequencies {
  static readonly DropD = DopDFrequencies
  static readonly OpenG = OpenGFrequencies
  static readonly Standard = StandardFrequencies
}
