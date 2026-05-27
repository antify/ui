export interface Country {
  value: string;
  isoCode: string;
  label: Record<string, string>;
  dialCode: string;
  numericCode: number;
  phoneLength?: number | number[];
  mask?: string;
  isDefault?: boolean;
}
