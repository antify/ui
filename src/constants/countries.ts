export interface Country {
  value: string;
  label: string;
  dialCode: string;
  flag: string;
  phoneLength: number | number[];
  mask?: string;
  isDefault?: boolean;
  [key: string]: unknown;
}

export const COUNTRIES: Country[] = [
  {
    value: 'KZ',
    label: 'Kazakhstan',
    dialCode: '+7',
    flag: '🇰🇿',
    phoneLength: 10,
    mask: '### ### ## ##',
  },
  {
    value: 'US',
    label: 'United States',
    dialCode: '+1',
    flag: '🇺🇸',
    phoneLength: 10,
    mask: '(###) ###-####',
  },
  {
    value: 'GB',
    label: 'United Kingdom',
    dialCode: '+44',
    flag: '🇬🇧',
    phoneLength: 10,
    mask: '#### ######',
  },
  {
    value: 'DE',
    label: 'Germany',
    dialCode: '+49',
    flag: '🇩🇪',
    phoneLength: [
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
    ],
    mask: '### #######',
    isDefault: true,
  },
  {
    value: 'UZ',
    label: 'Uzbekistan',
    dialCode: '+998',
    flag: '🇺🇿',
    phoneLength: 9,
    mask: '## ### ## ##',
  },
  {
    value: 'FR',
    label: 'France',
    dialCode: '+33',
    flag: '🇫🇷',
    phoneLength: 9,
    mask: '# ## ## ## ##',
  },
  {
    value: 'ES',
    label: 'Spain',
    dialCode: '+34',
    flag: '🇪🇸',
    phoneLength: 9,
    mask: '### ### ###',
  },
  {
    value: 'IT',
    label: 'Italy',
    dialCode: '+39',
    flag: '🇮🇹',
    phoneLength: [
      9,
      10,
    ],
    mask: '### #######',
  },
  {
    value: 'UA',
    label: 'Ukraine',
    dialCode: '+380',
    flag: '🇺🇦',
    phoneLength: 9,
    mask: '## ### ## ##',
  },
  {
    value: 'GE',
    label: 'Georgia',
    dialCode: '+995',
    flag: '🇬🇪',
    phoneLength: 9,
    mask: '### ### ###',
  },
  {
    value: 'PL',
    label: 'Poland',
    dialCode: '+48',
    flag: '🇵🇱',
    phoneLength: 9,
    mask: '### ### ###',
  },
];
