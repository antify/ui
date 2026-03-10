export type SelectOption = {
  label: string;
  value?: string | number;
  isGroupLabel?: boolean;
  isDeleted?: boolean;
  tag?: string;
} & Record<string, unknown>;
