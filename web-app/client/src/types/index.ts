export enum AirConditionerMode {
  auto = 0,
  cool,
  dry,
  fan,
  heat
}

export interface AirConditionerState {
  power: boolean;
  temperature: number;
  fan: 0 | 1 | 2 | 3,
  mode: AirConditionerMode
}
