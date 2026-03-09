export type CountryOption = {
  value: string;
  label: string;
  dialCode: string;
  flag: string;
  isDefault?: boolean;
} & Record<string, unknown>;
