<script lang="ts" setup>
import {
  computed, onMounted,
} from 'vue';
import AntButton from '../AntButton.vue';
import AntField from '../forms/AntField.vue';
import AntBaseInput from './Elements/AntBaseInput.vue';
import {
  Size,
} from '../../enums/Size.enum';
import {
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  InputState, State,
} from '../../enums';
import {
  Grouped,
} from '../../enums/Grouped.enum';
import {
  BaseInputType,
} from './Elements/__types';
import {
  handleEnumValidation,
} from '../../handler';
import Big from 'big.js';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  modelValue: number | null;
  unit: string | IconDefinition;
  label?: string;
  placeholder?: string;
  description?: string;
  limiter?: boolean;
  min?: number;
  max?: number;
  size?: Size;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  skeleton?: boolean;
  wrapperClass?: string | Record<string, boolean>;
  messages?: string[];
  decimalPlaces?: number;
}>(), {
  state: InputState.base,
  disabled: false,
  readonly: false,
  skeleton: false,
  size: Size.md,
  limiter: false,
  messages: () => [],
  decimalPlaces: 2,
});
const emit = defineEmits([
  'update:modelValue',
  'validate',
]);

const _modelValue = computed({
  get: () => {
    if(!props.modelValue) {
      return props.modelValue;
    }

    return String(new Big(props.modelValue).toFixed(Math.max(0, props.decimalPlaces)));
  },
  set: (val: string) => {
    emit('update:modelValue', Number(val));
  },
});

onMounted(() => {
  handleEnumValidation(props.state, InputState, 'state');
  handleEnumValidation(props.size, Size, 'size');
});
</script>

<template>
  <AntField
    :label="label"
    :size="size"
    :skeleton="skeleton"
    :description="description"
    :state="state"
    :limiter-max-value="limiter && max !== undefined ? max : undefined"
    :limiter-value="limiter && _modelValue !== undefined && _modelValue !== null ? Number(_modelValue) : undefined"
    :messages="messages"
    data-e2e="unit-input"
  >
    <div
      class="flex relative"
    >
      <AntBaseInput
        v-model="_modelValue"
        :type="BaseInputType.number"
        :grouped="Grouped.left"
        wrapper-class="flex-grow"
        :state="state"
        :size="size"
        :min="min"
        :max="max"
        :skeleton="skeleton"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder || label"
        :show-icon="false"
        v-bind="$attrs"
        @validate="val => $emit('validate', val)"
      />

      <AntButton
        :icon-left="typeof unit === 'object' ? unit : undefined"
        :grouped="Grouped.right"
        :state="state as unknown as State"
        :size="size"
        :skeleton="skeleton"
        :readonly="true"
      >
        <span v-if="typeof unit === 'string'">
          {{ unit }}
        </span>
      </AntButton>
    </div>
  </AntField>
</template>
