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

export interface MqttServerInfo {
  user: string | undefined,
  password: string | undefined,
  address: string | undefined,
  mqttSubjectPrefix?: string,
}

export interface Settings {
  mqttServerInfo: MqttServerInfo
}

export enum MqttStatus {
  disconnected,
  connecting,
  connected,
  error,
}
