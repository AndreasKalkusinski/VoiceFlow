export { Settings } from './settings';

export interface LogMessage {
  id: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  timestamp: Date;
}

export type RootStackParamList = {
  Main: undefined;
  Settings: undefined;
};

export type TabParamList = {
  SpeechToText: undefined;
  TextToSpeech: undefined;
  Settings: undefined;
};