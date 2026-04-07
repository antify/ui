<script lang="ts" setup>
import {
  computed, watch,
} from 'vue';
import {
  useVModel,
} from '@vueuse/core';
import AntField from '../forms/AntField.vue';
import AntCountryInput from './AntCountryInput.vue';
import AntBaseInput from './Elements/AntBaseInput.vue';
import {
  Size, InputState, Grouped,
} from '../../enums';
import {
  BaseInputType,
} from './Elements/__types';
import {
  COUNTRIES, CountryValueKey, Locale,
} from '../../constants/countries';
import type {
  Country,
} from '../../types';
import {
  ref, nextTick,
} from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  modelValue: string | null;
  countryValue?: string | number | null;
  countries?: Country[];
  inputRef?: null | HTMLInputElement;

  //Common Props
  size?: Size;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  skeleton?: boolean;

  //AntField Props
  label?: string;
  description?: string;
  messages?: string[];

  //AntCountryInput Props
  countryPlaceholder?: string;
  searchPlaceholder?: string;
  searchable?: boolean;
  countryMaxHeight?: string;
  countryValueKey?: CountryValueKey;
  countrySortable?: boolean;

  //AntBaseInput Props
  placeholder?: string;
  nullable?: boolean;
  locale?: Locale;
}>(), {
  inputRef: null,
  size: Size.md,
  state: InputState.base,
  searchable: true,
  searchPlaceholder: 'Search country...',
  countryPlaceholder: 'Select country',
  placeholder: 'Enter phone number',
  countryValueKey: CountryValueKey.dialCode,
  countrySortable: true,
  messages: () => [],
  nullable: true,
  countries: () => COUNTRIES,
  locale: Locale.en,
});

const emit = defineEmits([
  'update:modelValue',
  'update:countryValue',
  'update:inputRef',
  'select-country',
  'validate',
  'blur',
]);

const _phoneNumber = useVModel(props, 'modelValue', emit);
const _inputRef = useVModel(props, 'inputRef', emit);
const internalCountryValue = ref<string | number | null>(null);

const _countryValue = computed({
  get: () => {
    return props.countryValue !== undefined ? props.countryValue : internalCountryValue.value;
  },
  set: (val) => {
    emit('update:countryValue', val);

    internalCountryValue.value = val;
  },
});

const updateFullValue = (countryId: string | number | null, rawPhone: string | null) => {
  if (!rawPhone) {
    _phoneNumber.value = null;

    return;
  }

  const country = props.countries.find(c => String(c[props.countryValueKey]) === String(countryId));

  if (country && !rawPhone.startsWith('+')) {
    const digitsOnly = rawPhone.replace(/\D/g, '');
    _phoneNumber.value = `${country.dialCode}${digitsOnly}`;
  } else {
    _phoneNumber.value = rawPhone;
  }
};

const currentCountry = computed(() => {
  return props.countries.find(c => String(c[props.countryValueKey]) === String(_countryValue.value));
});

const sortedCountriesByDialCode = computed(() => {
  return [
    ...props.countries,
  ].sort((a, b) => b.dialCode.length - a.dialCode.length);
});

const findCountryByPhone = (phone: string): Country | undefined => {
  if (!phone.startsWith('+')) {
    return undefined;
  }

  return sortedCountriesByDialCode.value.find(country => phone.startsWith(country.dialCode));
};

const formattedNumber = computed({
  get: () => {
    const fullVal = props.modelValue || '';
    const country = currentCountry.value;

    if (country && fullVal.startsWith(country.dialCode)) {
      const shortNumber = fullVal.slice(country.dialCode.length);

      return country.mask ? formatByMask(shortNumber, country.mask) : shortNumber;
    }

    return fullVal;
  },
  set: (val: string | null) => {
    if (!val) {
      _phoneNumber.value = null;

      return;
    }

    if (val.startsWith('+')) {
      const country = findCountryByPhone(val);

      if (country) {
        _countryValue.value = country[props.countryValueKey] as string | number;
      }

      _phoneNumber.value = val;

      return;
    }

    updateFullValue(_countryValue.value, val);
  },
});

const formatByMask = (value: string | null, mask: string): string | null => {
  if (!value) {
    return null;
  }

  const digits = value.replace(/\D/g, '');
  if (digits.length === 0) {
    return null;
  }

  let result = '';
  let digitIndex = 0;

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '#') {
      if (digitIndex < digits.length) {
        result += digits[digitIndex];
        digitIndex++;
      } else {
        break;
      }
    } else if (digitIndex < digits.length) {
      result += mask[i];
    }
  }

  if (digitIndex < digits.length) {
    result += digits.substring(digitIndex);
  }

  return result || null;
};

function onCountrySelect(country: Country) {
  emit('select-country', country);

  nextTick(() => {
    _inputRef.value?.focus();
  });
}

function onKeyPress(event: KeyboardEvent) {
  const charStr = event.key;
  const target = event.target as HTMLInputElement;
  const currentRawValue = target.value;

  if (event.ctrlKey || event.metaKey || charStr.length > 1) {
    return;
  }

  if (!/[\d+]/.test(charStr)) {
    event.preventDefault();

    return;
  }

  if (_countryValue.value && charStr === '+') {
    event.preventDefault();

    return;
  }

  if (!_countryValue.value && charStr === '+' && currentRawValue.length > 0) {
    event.preventDefault();
  }

  if (charStr === '+' && currentRawValue.includes('+')) {
    event.preventDefault();
  }
}

function onPaste(event: ClipboardEvent) {
  event.preventDefault();
  const pasteData = event.clipboardData?.getData('text') || '';

  if (!pasteData) {
    return;
  }

  const cleanInput = pasteData.replace(/[^\d+]/g, '');

  if (cleanInput.startsWith('+')) {
    const country = findCountryByPhone(cleanInput);

    if (country) {
      _countryValue.value = country[props.countryValueKey] as string | number;
    }
    _phoneNumber.value = cleanInput;
  } else {
    updateFullValue(_countryValue.value, cleanInput);
  }
}

watch(_countryValue, (newCountryId, oldCountryId) => {
  if (newCountryId === oldCountryId) {
    return;
  }

  const fullVal = props.modelValue || '';
  const oldCountry = props.countries.find(c => String(c[props.countryValueKey]) === String(oldCountryId));
  let body = fullVal;

  if (oldCountry && fullVal.startsWith(oldCountry.dialCode)) {
    body = fullVal.slice(oldCountry.dialCode.length);
  }

  updateFullValue(newCountryId, body);
});

watch(() => props.modelValue, (newVal) => {
  if (newVal && newVal.startsWith('+') && !_countryValue.value) {
    const country = findCountryByPhone(newVal);

    if (country) {
      _countryValue.value = country[props.countryValueKey] as string | number;
    }
  }
}, {
  immediate: true,
});
</script>

<template>
  <AntField
    :label="label"
    :messages="messages"
    :state="state"
    :size="size"
    :skeleton="skeleton"
    :description="description"
    data-e2e="phone-input"
  >
    <div
      class="flex relative w-full"
      @click.prevent
    >
      <AntCountryInput
        v-model="_countryValue"
        :countries="countries"
        :size="size"
        :locale="locale"
        :state="state"
        :disabled="disabled"
        :readonly="readonly"
        :skeleton="skeleton"
        :searchable="searchable"
        :placeholder="countryPlaceholder"
        :search-placeholder="searchPlaceholder"
        :max-height="countryMaxHeight"
        :is-grouped="true"
        :grouped="Grouped.left"
        class="w-fit flex-shrink-0"
        :show-dial-code-in-menu="true"
        :option-value-key="countryValueKey"
        :sortable="countrySortable"
        @select="onCountrySelect"
      />

      <AntBaseInput
        v-model="formattedNumber"
        v-model:input-ref="_inputRef"
        :nullable="nullable"
        :type="BaseInputType.text"
        :state="state"
        :size="size"
        :skeleton="skeleton"
        v-bind="$attrs"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :grouped="Grouped.right"
        wrapper-class="flex-grow"
        class="-ml-px"
        @validate="val => $emit('validate', val)"
        @blur="e => $emit('blur', e)"
        @keydown="onKeyPress"
        @paste="onPaste"
      />
    </div>
  </AntField>
</template>
