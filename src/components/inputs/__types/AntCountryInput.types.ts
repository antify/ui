export interface Country {
  value: string;
  isoCode: string;
  label: Record<string, string>;
  dialCode: string;
  numericCode: number;
  flag?: string;
  phoneLength?: number | number[];
  mask?: string;
  isDefault?: boolean;
}
