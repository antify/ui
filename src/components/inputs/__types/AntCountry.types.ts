export type CountryOption = {
  value: string;
  label: string;
  dialCode: string;
  flag: string;
} & Record<string, unknown>;
