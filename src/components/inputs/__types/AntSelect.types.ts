export type SelectOption = {
  label: string;
  value?: string | number;
  isGroupLabel?: boolean;
  deleted?: boolean;
} & Record<string, unknown>;
