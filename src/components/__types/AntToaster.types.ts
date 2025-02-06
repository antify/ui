import {
  InputState,
} from '../../enums';

export type Toast = {
  id?: string;
  title: string;
  content?: string;
  type: InputState;
  hasIcon?: boolean;
};
