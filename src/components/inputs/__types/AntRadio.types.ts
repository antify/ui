import {
  InputState,
} from '../../../enums';

export type AntRadioTypes = {
  value: string;
  label?: string;
  disabled?: boolean;
  readonly?: boolean;
  state?: InputState;

  [key: string]: unknown;
};
