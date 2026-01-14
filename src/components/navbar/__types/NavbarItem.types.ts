import type {
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import type {
  RouteLocationRaw,
} from 'vue-router';

export type NavbarItemTypes = {
  label: string;
  active?: boolean;
  to?: RouteLocationRaw;
  click?: () => void;
  icon?: IconDefinition;
  children?: NavbarItemTypes[];
  disabled?: boolean;
  tooltipMessage?: string;
};
