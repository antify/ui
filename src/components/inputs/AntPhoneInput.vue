<script lang="ts" setup>
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
  label?: string;
  description?: string;
  placeholder?: string;
  size?: Size;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  skeleton?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  messages?: string[];
}>(), {
  size: Size.md,
  state: InputState.base,
  searchable: true,
  searchPlaceholder: 'Search country...',
  messages: () => [],
});

const emit = defineEmits([
  'update:modelValue',
  'update:countryValue',
  'select-country',
  'validate',
  'blur',
]);

const _phoneNumber = useVModel(props, 'modelValue', emit);
const _countryCode = useVModel(props, 'countryValue', emit);

function onCountrySelect(country: Country) {
  emit('select-country', country);
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
        :search-placeholder="searchPlaceholder"
        :is-grouped="true"
        :grouped="Grouped.left"
        class="w-fit flex-shrink-0"
        @select="onCountrySelect"
      />

      <AntBaseInput
        v-model="_phoneNumber"
        :type="BaseInputType.text"
        :grouped="Grouped.right"
        wrapper-class="flex-grow"
        :state="state"
        :size="size"
        :skeleton="skeleton"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
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
