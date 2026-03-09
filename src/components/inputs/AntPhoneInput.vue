<script lang="ts" setup>
import {
  computed,
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
  type Country,
} from '../../constants/countries';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  modelValue: string | null;
  countryValue: string | null;
  countries: Country[];

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

  //AntBaseInput Props
  placeholder?: string;

}>(), {
  size: Size.md,
  state: InputState.base,
  searchable: true,
  searchPlaceholder: 'Search country...',
  countryPlaceholder: 'Select country',
  autoSelectDefault: true,
  placeholder: 'Enter phone number',
  messages: () => [],
});

const emit = defineEmits([
  'update:modelValue',
  'update:countryValue',
  'select-country',
  'validate',
  'blur',
]);

const _countryCode = useVModel(props, 'countryValue', emit);

const currentCountry = computed(() => props.countries.find(c => c.value === props.countryValue));

const formatByMask = (value: string, mask: string): string => {
  if (!value) return '';
  const digits = value.replace(/\D/g, '');
  let result = '';
  let digitIndex = 0;

  for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
    if (mask[i] === '#') {
      result += digits[digitIndex] || '';
      if (digits[digitIndex]) digitIndex++;
    } else {
      result += mask[i];
    }
  }

  return result;
};

const formattedNumber = computed({
  get: () => {
    const val = props.modelValue || '';
    const mask = currentCountry.value?.mask;

    return mask ? formatByMask(val, mask) : val;
  },
  set: (val: string | null) => {
    let unmasked = val ? val.replace(/\D/g, '') : '';
    const mask = currentCountry.value?.mask;

    if (mask) {
      const maxDigits = (mask.match(/#/g) || []).length;
      unmasked = unmasked.slice(0, maxDigits);
    }
    emit('update:modelValue', unmasked || null);
  },
});

function onCountrySelect(country: Country) {
  emit('select-country', country);
  emit('update:modelValue', null);
}
</script>

<template>
  <AntField
    :label="label"
    :description="description"
    :state="state"
    :size="size"
    :skeleton="skeleton"
    :messages="messages"
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
        :auto-select-default="autoSelectDefault"
        class="w-fit flex-shrink-0"
        @select="onCountrySelect"
      />

      <AntBaseInput
        v-model="formattedNumber"
        :type="BaseInputType.text"
        :state="state"
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
