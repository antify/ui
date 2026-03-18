<script lang="ts" setup>
import {
  computed, watch,
} from 'vue';
import {
  useVModel,
} from '@vueuse/core';
import AntField from '../forms/AntField.vue';
import AntCountry from './AntCountry.vue';
import AntBaseInput from './Elements/AntBaseInput.vue';
import {
  Size, InputState, Grouped,
} from '../../enums';
import {
  BaseInputType,
} from './Elements/__types';
import {
  type Country, COUNTRIES,
} from '../../constants/countries';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  modelValue: string | null;
  countryValue: string | number | null;
  countries?: Country[];

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

  //AntCountry Props
  countryPlaceholder?: string;
  searchPlaceholder?: string;
  searchable?: boolean;
  countryMaxHeight?: string;
  autoSelectDefault?: boolean;
  countryValueKey?: keyof Country;
  countryErrorMessage?: string;
  defaultCountryValue?: string | number | null;

  //AntBaseInput Props
  placeholder?: string;
  nullable?: boolean;
  clearCountryOnClear?: boolean;
}>(), {
  size: Size.md,
  state: InputState.base,
  searchable: true,
  searchPlaceholder: 'Search country...',
  countryPlaceholder: 'Select country',
  autoSelectDefault: true,
  placeholder: 'Enter phone number',
  countryValueKey: 'value',
  countryErrorMessage: 'Please select a country code or start with "+"',
  messages: () => [],
  nullable: true,
  clearCountryOnClear: true,
  defaultCountryValue: 'DE',
  countries: () => COUNTRIES,
});

const emit = defineEmits([
  'update:modelValue',
  'update:countryValue',
  'select-country',
  'validate',
  'blur',
]);

const _countryCode = useVModel(props, 'countryValue', emit);
const _phoneNumber = useVModel(props, 'modelValue', emit);

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

const showCountryError = computed(() => {
  const val = props.modelValue || '';

  return !props.countryValue && val.length > 0 && !val.startsWith('+');
});

const allMessages = computed(() => {
  const msgs = [
    ...(props.messages || []),
  ];

  if (showCountryError.value) {
    msgs.push(props.countryErrorMessage);
  }

  return msgs;
});

const currentCountry = computed(() => {
  return props.countries.find(c => String(c[props.countryValueKey]) === String(props.countryValue));
});

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

      if (props.clearCountryOnClear) {
        _countryCode.value = null;
      }

      return;
    }

    if (val.startsWith('+')) {
      const sortedCountries = [
        ...props.countries,
      ].sort((a, b) => b.dialCode.length - a.dialCode.length);

      for (const country of sortedCountries) {
        if (val.startsWith(country.dialCode)) {
          const newCountryValue = country[props.countryValueKey] as string | number;
          _countryCode.value = newCountryValue;
          _phoneNumber.value = val;

          return;
        }
      }
      _phoneNumber.value = val;

      return;
    }

    updateFullValue(_countryCode.value, val);
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

  if (props.countryValue && charStr === '+') {
    event.preventDefault();

    return;
  }

  if (!props.countryValue && charStr === '+' && currentRawValue.length > 0) {
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
    const sortedCountries = [
      ...props.countries,
    ].sort((a, b) => b.dialCode.length - a.dialCode.length);

    for (const country of sortedCountries) {
      if (cleanInput.startsWith(country.dialCode)) {
        _countryCode.value = country[props.countryValueKey] as string | number;
        _phoneNumber.value = cleanInput;

        return;
      }
    }
    _phoneNumber.value = cleanInput;
  } else {
    updateFullValue(_countryCode.value, cleanInput);
  }
}

watch(_countryCode, (newCountryId, oldCountryId) => {
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
</script>

<template>
  <AntField
    :label="label"
    :messages="allMessages"
    :state="showCountryError ? InputState.danger : state"
    :size="size"
    :skeleton="skeleton"
    :description="description"
    data-e2e="phone-input"
  >
    <div
      class="flex relative w-full"
      @click.prevent
    >
      <AntCountry
        v-model="_countryCode"
        :countries="countries"
        :size="size"
        :state="showCountryError ? InputState.danger : state"
        :disabled="disabled"
        :readonly="readonly"
        :skeleton="skeleton"
        :searchable="searchable"
        :placeholder="countryPlaceholder"
        :search-placeholder="searchPlaceholder"
        :max-height="countryMaxHeight"
        :is-grouped="true"
        :grouped="Grouped.left"
        :auto-select-default="autoSelectDefault"
        class="w-fit flex-shrink-0"
        :show-dial-code-in-menu="true"
        :option-value-key="countryValueKey"
        :default-country-value="defaultCountryValue"
        @select="onCountrySelect"
      />

      <AntBaseInput
        v-model="formattedNumber"
        :nullable="nullable"
        :type="BaseInputType.text"
        :state="showCountryError ? InputState.danger : state"
        :size="size"
        :skeleton="skeleton"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :grouped="Grouped.right"
        wrapper-class="flex-grow"
        v-bind="$attrs"
        @validate="val => $emit('validate', val)"
        @blur="e => $emit('blur', e)"
        @keypress="onKeyPress"
        @paste="onPaste"
      />
    </div>
  </AntField>
</template>

<style scoped>
:deep(.ant-country) {
  @apply z-10;
}

.flex > :not(:first-child) {
  margin-left: -1px;
}
</style>
