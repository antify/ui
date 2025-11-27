export type SelectOption = {
  label: string;
  value?: string | number;
  isGroupLabel?: boolean;
  isDeleted?: boolean;
} & Record<string, unknown>;
