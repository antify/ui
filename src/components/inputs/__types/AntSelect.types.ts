export type SelectOption = {
  label: string;
  value?: string | number;
  isGroupLabel?: boolean;
} & Record<string, unknown>;
