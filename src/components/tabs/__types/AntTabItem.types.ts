import {
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  type RouteLocationRaw,
} from 'vue-router';

export type TabItem = {
  id: string;
  label: string;
  state?: TabItemState;
  disabled?: boolean;
  showIcon?: boolean;
  icon?: IconDefinition;
  to?: string | RouteLocationRaw;
  clickHandler?: () => void;
  [key: string]: unknown;
};

export enum TabItemState {
  base = 'base',
  info = 'info',
  warning = 'warning',
  danger = 'danger',
}
