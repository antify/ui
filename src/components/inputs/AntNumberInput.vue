<script lang="ts" setup>
import {
  computed, onMounted, ref, useId, watch,
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
  autocomplete?: 'on' | 'off' | string;
  onlyInteger?: boolean;
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
  autocomplete: 'off',
  onlyInteger: false,
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

const constraints = computed(() => ({
  min: props.min,
  max: props.max,
  onlyInteger: props.onlyInteger,
  steps: props.steps,
}));

const effectiveMin = computed(() => {
  if (props.min === undefined) return undefined;

  return props.onlyInteger ? Math.ceil(props.min) : props.min;
});

const effectiveMax = computed(() => {
  if (props.max === undefined) return undefined;

  return props.onlyInteger ? Math.floor(props.max) : props.max;
});

const formatAndEmit = (val: number | null) => {
  if (val === null || isNaN(val)) {
    emit('update:modelValue', null);

    return null;
  }

  let processedValue = new Big(val);

  if (props.onlyInteger) {
    processedValue = processedValue.round(0, Big.roundHalfUp);
  } else {
    const dp = getPrecision();
    processedValue = new Big(processedValue.toFixed(dp));
  }

  if (effectiveMin.value !== undefined && processedValue.lt(effectiveMin.value)) {
    processedValue = new Big(effectiveMin.value);
  }

  if (effectiveMax.value !== undefined && processedValue.gt(effectiveMax.value)) {
    processedValue = new Big(effectiveMax.value);
  }

  const result = Number(processedValue.toString());
  emit('update:modelValue', result);

  return result;
};

const normalizeValue = () => {
  if (props.modelValue === null || props.modelValue === undefined) return;

  let val = new Big(props.modelValue);
  let changed = false;

  if (props.onlyInteger && !val.mod(1).eq(0)) {
    val = val.round(0, Big.roundHalfUp);
    changed = true;
  }

  if (effectiveMin.value !== undefined && val.lt(effectiveMin.value)) {
    val = new Big(effectiveMin.value);
    changed = true;
  }
  if (effectiveMax.value !== undefined && val.gt(effectiveMax.value)) {
    val = new Big(effectiveMax.value);
    changed = true;
  }

  if (changed) {
    emit('update:modelValue', Number(val.toString()));
  }
};

watch([
  () => props.modelValue,
  () => props.onlyInteger,
], normalizeValue, {
  immediate: true,
});

watch(constraints, () => {
  normalizeValue();
}, {
  immediate: true,
});

const _modelValue = computed({
  get: () => {
    if (props.modelValue === null || props.modelValue === undefined) {
      return null;
    }

    if (isFocused.value) {
      return props.modelValue.toString();
    }

    const bigValue = new Big(props.modelValue);

    if (props.onlyInteger) {
      return bigValue.toFixed(0);
    }

    const dp = getPrecision();

    return bigValue.toFixed(dp);
  },
  set: (val: string | number | null) => {
    if (val === '' || val === null || val === undefined) {
      emit('update:modelValue', null);

      return;
    }

    let num = Number(val);

    if (!isNaN(num)) {
      formatAndEmit(num);
    }
  },
});

const effectiveSteps = computed(() => {
  if (props.onlyInteger) {
    return Number(new Big(props.steps).round(0, Big.roundHalfUp).toString()) || 1;
  }

  return props.steps;
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
  let current = props.modelValue !== null ? new Big(props.modelValue) : new Big(props.max || 0);

  if (props.onlyInteger) {
    current = current.round(0, Big.roundHalfUp);
  }

  const result = current.sub(effectiveSteps.value);
  formatAndEmit(Number(result.toString()));
}

function add() {
  let current = props.modelValue !== null ? new Big(props.modelValue) : new Big(props.min || 0);

  if (props.onlyInteger) {
    current = current.round(0, Big.roundHalfUp);
  }

  const result = current.add(effectiveSteps.value);
  formatAndEmit(Number(result.toString()));
}

const isPrevButtonDisabled = computed(() => {
  if (props.disabled || props.readonly) {
    return true;
  }

  if (props.modelValue === null) {
    return false;
  }

  return effectiveMin.value !== undefined
    ? Number(props.modelValue) <= effectiveMin.value
    : false;
});

const isNextButtonDisabled = computed(() => {
  if (props.disabled || props.readonly) {
    return true;
  }

  if (props.modelValue === null) {
    return false;
  }

  return effectiveMax.value !== undefined
    ? Number(props.modelValue) >= effectiveMax.value
    : false;
});

function onButtonBlur(e: FocusEvent) {
  isFocused.value = false;

  const validatedValue = formatAndEmit(props.modelValue);

  if (_inputRef.value && validatedValue !== null) {
    _inputRef.value.value = validatedValue.toString();
  }

  if (validatedValue !== null) {
    emit('validate', validatedValue);
  }

  emit('blur', e);
}

function onKeyDown(e: KeyboardEvent) {
  if (e.ctrlKey || e.metaKey) {
    return;
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    add();

    return;
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    subtract();

    return;
  }

  if (props.onlyInteger) {
    if (e.key === '.' || e.key === ',') {
      e.preventDefault();

      return;
    }
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

  const canBeNegative = props.min === undefined || props.min < 0;
  const regex = props.onlyInteger
    ? (canBeNegative ? /^[0-9-]$/ : /^[0-9]$/)
    : (canBeNegative ? /^[0-9.-]$/ : /^[0-9.]$/);

  if (!regex.test(e.key)) {
    e.preventDefault();
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
        :autocomplete="autocomplete"
        wrapper-class="grow"
        :state="state"
        :size="size"
        :skeleton="skeleton"
        :step="effectiveSteps"
        :min="onlyInteger ? effectiveMin : min"
        :max="onlyInteger ? effectiveMax : max"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder || label"
        :show-icon="false"
        v-bind="$attrs"
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
