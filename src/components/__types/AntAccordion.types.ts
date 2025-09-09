export enum CollapseStrategy {
  single = 'single',
  multiple = 'multiple',
}

export interface AccordionItem {
  label?: string;
  content?: string;
  isOpen?: boolean;
  iconLeft?: boolean;
  contentPadding?: boolean;
  activeLabelClasses?: string;
  activeIconClasses?: string;
  inactiveLabelClasses?: string;
  inactiveIconClasses?: string;
}
