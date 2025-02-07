<script lang="ts" setup>
import {computed, onMounted,} from 'vue';
import AntButton from '../buttons/AntButton.vue';
import AntField from '../forms/AntField.vue';
import AntBaseInput from './Elements/AntBaseInput.vue';
import {Size,} from '../../enums/Size.enum';
import {faMinus, faPlus,} from '@fortawesome/free-solid-svg-icons';
import {InputState, State,} from '../../enums/State.enum';
import {handleEnumValidation,} from '../../handler';
import {Grouped,} from '../../enums/Grouped.enum';
import {BaseInputType,} from './Elements/__types';
import Big from 'big.js';
import {getDecimalPlaces} from "../../utils";

Big.RM = Big.roundHalfEven;

defineOptions({
  inheritAttrs: false,
});

/**
 * We use a string as the modelValue to ensure that numbers are correctly padded with a trailing 0 instead of cut off (e.g. 0.10 would be converted to 0.1).
 * Additionally, the initial value (if none is given) gets set to "0" with the same amount of decimals as used in the steps.
 */
const props = withDefaults(defineProps<{
  modelValue: number | null;
  label?: string;
  placeholder?: string;
  description?: string;
  size?: Size;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  skeleton?: boolean;
  steps?: number;
  min?: number;
  max?: number;
  limiter?: boolean;
  messages?: string[];
  indicators?: boolean;
}>(), {
  state: InputState.base,
  disabled: false,
  readonly: false,
  skeleton: false,
  size: Size.md,
  steps: 1,
  limiter: false,
  messages: () => [],
  indicators: false,
});
const emit = defineEmits([
  'update:modelValue',
  'validate',
]);

const _modelValue = computed({
  get: () => {
    const modelDecimalPlaces = getDecimalPlaces(props.modelValue || 0);
    const stepDecimalPlaces = getDecimalPlaces(props.steps);
    const decimalPlaces = Math.max(modelDecimalPlaces, stepDecimalPlaces);

    return String(new Big(props.modelValue || 0).toFixed(decimalPlaces));
  },
  set: (val: string) => {
    emit('update:modelValue', Number(val));
  },
});

const isPrevButtonDisabled = computed(() => {
  if (props.disabled) {
    return true;
  }

  if (_modelValue.value === null) {
    return false;
  }

  return props.min !== undefined ? Number(_modelValue.value) <= props.min : false;
});
const isNextButtonDisabled = computed(() => {
  if (props.disabled) {
    return true;
  }

  if (_modelValue.value === null) {
    return false;
  }

  return props.max !== undefined ? Number(_modelValue.value) >= props.max : false;
});

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.state, InputState, 'state');
});

function subtract() {
  const modelDecimalPlaces = getDecimalPlaces(_modelValue.value || 0);
  const stepDecimalPlaces = getDecimalPlaces(props.steps);
  const decimalPlaces = Math.max(modelDecimalPlaces, stepDecimalPlaces);

  if (_modelValue.value === null) {
    _modelValue.value = String(props.max || new Big(0).toFixed(decimalPlaces));
  } else if (props.max !== undefined && Number(_modelValue.value) - props.steps > props.max) {
    _modelValue.value = String(props.max);
  } else {
    _modelValue.value = new Big(_modelValue.value).sub(props.steps).toFixed(decimalPlaces);
  }
}

function add() {
  const modelDecimalPlaces = getDecimalPlaces(_modelValue.value || 0);
  const stepDecimalPlaces = getDecimalPlaces(props.steps);
  const decimalPlaces = Math.max(modelDecimalPlaces, stepDecimalPlaces);

  if (_modelValue.value === null) {
    return _modelValue.value = String(props.min || new Big(0).toFixed(decimalPlaces));
  } else if (props.min !== undefined && Number(_modelValue.value) + props.steps < props.min) {
    return _modelValue.value = String(props.min);
  } else {
    _modelValue.value = new Big(_modelValue.value).add(props.steps).toFixed(decimalPlaces);
  }
}

function onButtonBlur() {
  emit('validate', _modelValue.value);
}
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
  >
    <div
      class="flex relative"
    >
      <AntButton
        v-if="indicators"
        :icon-left="faMinus"
        :grouped="Grouped.left"
        :state="state as unknown as State"
        :size="size"
        :skeleton="skeleton"
        :disabled="isPrevButtonDisabled"
        :readonly="readonly"
        @click="subtract"
        @blur="onButtonBlur"
      />

      <AntBaseInput
        v-model.number="_modelValue"
        :type="BaseInputType.number"
        :grouped="indicators ? Grouped.center : Grouped.none"
        wrapper-class="grow"
        :state="state"
        :size="size"
        :skeleton="skeleton"
        :min="min"
        :max="max"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder || label"
        :show-icon="false"
        v-bind="$attrs"
        @validate="val => $emit('validate', val)"
      />

      <AntButton
        v-if="indicators"
        :icon-left="faPlus"
        :grouped="Grouped.right"
        :state="state as unknown as State"
        :size="size"
        :skeleton="skeleton"
        :disabled="isNextButtonDisabled"
        :readonly="readonly"
        @click="add"
        @blur="onButtonBlur"
      />
    </div>
  </AntField>
</template>
