<script lang="ts" setup>
import {
  computed, onMounted, nextTick, ref, useId,
} from 'vue';
import AntButton from '../AntButton.vue';
import AntField from '../forms/AntField.vue';
import AntBaseInput from './Elements/AntBaseInput.vue';
import {
  Size,
} from '../../enums/Size.enum';
import {
  faMinus, faPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  InputState, State,
} from '../../enums/State.enum';
import {
  handleEnumValidation,
} from '../../handler';
import {
  Grouped,
} from '../../enums/Grouped.enum';
import {
  BaseInputType,
} from './Elements/__types';
import Big from 'big.js';
import {
  getDecimalPlaces,
} from '../../utils';
import {
  useVModel,
} from '@vueuse/core';

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
  inputRef?: HTMLInputElement | null;
  selectAllOnFocus?: boolean;
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
  inputRef: null,
  selectAllOnFocus: false,
});
const emit = defineEmits([
  'update:modelValue',
  'update:inputRef',
  'validate',
  'focus',
  'blur',
]);

const id = useId();
const _inputRef = useVModel(props, 'inputRef', emit);
const isFocused = ref(false);

const _modelValue = computed({
  get: () => {
    if (props.modelValue === null || props.modelValue === undefined || props.modelValue === '') {
      return null;
    }

    if (isFocused.value) {
      return props.modelValue.toString();
    }

    const bigValue = new Big(props.modelValue);
    const isInteger = bigValue.mod(1).eq(0);

    if (isInteger) {
      return props.modelValue.toString();
    }

    const dp = getPrecision();

    return bigValue.toFixed(dp);
  },
  set: (val: string | number | null) => {
    if (val === '' || val === null || val === undefined) {
      emit('update:modelValue', null);

      return;
    }

    const num = Number(val);

    if (isNaN(num)) {
      return;
    }

    let finalVal = num;

    if (props.max !== undefined && num > props.max) {
      finalVal = props.max;
    }

    if (props.min !== undefined && num < props.min) {
      finalVal = props.min;
    }

    emit('update:modelValue', finalVal);
  },
});

function onInputFocus(e: FocusEvent) {
  isFocused.value = true;

  const el = e.target as HTMLInputElement;

  if (el && props.selectAllOnFocus && el.value !== '') {
    const originalType = el.type;
    el.type = 'text';

    setTimeout(() => {
      el.setSelectionRange(0, el.value.length);
      el.type = originalType;
    }, 0);
  }
  emit('focus', e);
}

function getPrecision() {
  const modelDecimalPlaces = getDecimalPlaces(props.modelValue || 0);
  const stepDecimalPlaces = getDecimalPlaces(props.steps);

  return Math.max(modelDecimalPlaces, stepDecimalPlaces);
}

function subtract() {
  const dp = getPrecision();

  const current = props.modelValue !== null ? new Big(props.modelValue) : new Big(props.max || 0);
  let result = current.sub(props.steps);

  if (props.min !== undefined && result.lt(props.min)) {
    result = new Big(props.min);
  }

  emit('update:modelValue', Number(result.toFixed(dp)));
}

function add() {
  const dp = getPrecision();

  const current = props.modelValue !== null ? new Big(props.modelValue) : new Big(props.min || 0);
  let result = current.add(props.steps);

  if (props.max !== undefined && result.gt(props.max)) {
    result = new Big(props.max);
  }

  emit('update:modelValue', Number(result.toFixed(dp)));
}

const isPrevButtonDisabled = computed(() => {
  if (props.disabled || props.readonly) {
    return true;
  }

  if (props.modelValue === null) {
    return false;
  }

  return props.min !== undefined ? Number(props.modelValue) <= props.min : false;
});

const isNextButtonDisabled = computed(() => {
  if (props.disabled || props.readonly) {
    return true;
  }

  if (props.modelValue === null) {
    return false;
  }

  return props.max !== undefined ? Number(props.modelValue) >= props.max : false;
});

function onButtonBlur(e: FocusEvent) {
  isFocused.value = false;

  let finalValue = props.modelValue;

  if (props.modelValue !== null) {
    const dp = getPrecision();
    finalValue = Number(new Big(props.modelValue).toFixed(dp));

    emit('update:modelValue', finalValue);
  }

  const el = e.target as HTMLInputElement;

  if (el && _modelValue.value !== undefined) {
    el.value = _modelValue.value;
  }

  emit('validate', finalValue);
  emit('blur', e);
}

function onKeyDown(e: KeyboardEvent) {
  if (e.ctrlKey || e.metaKey) {
    return;
  }

  const allowedKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
    'Home',
    'End',
  ];

  if (allowedKeys.includes(e.key)) {
    return;
  }

  if (!/^[0-9.-]$/.test(e.key)) {
    e.preventDefault();

    return;
  }
}

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.state, InputState, 'state');
});
</script>

<template>
  <AntField
    :label="label"
    :label-for="id"
    :size="size"
    :skeleton="skeleton"
    :description="description"
    :state="state"
    :limiter-max-value="limiter && max !== undefined ? max : undefined"
    :limiter-value="limiter && _modelValue !== undefined && _modelValue !== null ? Number(_modelValue) : undefined"
    :messages="messages"
    data-e2e="number-input"
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
        data-e2e="decrement-button"
        @click="subtract"
        @blur="onButtonBlur"
      />

      <AntBaseInput
        :id="id"
        v-model="_modelValue"
        v-model:input-ref="_inputRef"
        :type="BaseInputType.number"
        :grouped="indicators ? Grouped.center : Grouped.none"
        wrapper-class="grow"
        :state="state"
        :size="size"
        :skeleton="skeleton"
        :step="steps"
        :min="min"
        :max="max"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder || label"
        :show-icon="false"
        v-bind="$attrs"
        @validate="(val) => $emit('validate', val)"
        @focus="onInputFocus"
        @blur="onButtonBlur"
        @keydown="onKeyDown"
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
        data-e2e="increment-button"
        @click="add"
        @blur="onButtonBlur"
      />
    </div>
  </AntField>
</template>
