<script lang="ts" setup>
import {
  computed, onMounted, nextTick,
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
  clearOnFocus?: boolean;
  selectAllOnFocus?: boolean;
  defaultValue?: number | null;
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
  clearOnFocus: false,
  selectAllOnFocus: false,
  defaultValue: null,
});
const emit = defineEmits([
  'update:modelValue',
  'update:inputRef',
  'validate',
  'focus',
  'blur',
]);

const _inputRef = useVModel(props, 'inputRef', emit);

const _modelValue = computed({
  get: () => {
    if (props.modelValue === null || props.modelValue === undefined) {
      return '';
    }

    const dp = getPrecision();

    return new Big(props.modelValue).toFixed(dp);
  },
  set: (val: string | number | null) => {
    if (val === '' || val === null || val === undefined) {
      emit('update:modelValue', null);

      return;
    }

    const stringVal = String(val);

    const num = Number(stringVal);
    if (isNaN(num)) {
      return;
    }

    if (props.max !== undefined && num > props.max) {
      emit('update:modelValue', props.max);

      return;
    }
    if (props.min !== undefined && num < props.min) {
      emit('update:modelValue', props.min);

      return;
    }

    emit('update:modelValue', num);
  },
});

async function onInputFocus(e: FocusEvent) {
  if (props.clearOnFocus) {
    const valueToSet = props.defaultValue !== undefined ? props.defaultValue : null;

    emit('update:modelValue', valueToSet);
    await nextTick();
  }

  const el = e.target as HTMLInputElement;

  if (el) {
    const originalType = el.type;
    el.type = 'text';

    setTimeout(() => {
      if ((props.selectAllOnFocus || props.clearOnFocus) && el.value !== '') {
        el.setSelectionRange(0, el.value.length);
      } else {
        const length = el.value ? String(el.value).length : 0;
        el.setSelectionRange(length, length);
      }

      el.type = originalType;
    }, 0);
  }
  emit('focus', e);
}

function getPrecision() {
  const modelDecimalPlaces = getDecimalPlaces(props.modelValue || 0);
  const stepDecimalPlaces = getDecimalPlaces(props.steps);
  const detectedPrecision = Math.max(modelDecimalPlaces, stepDecimalPlaces);

  return Math.min(detectedPrecision, stepDecimalPlaces);
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

function onButtonBlur() {
  emit('validate', props.modelValue);
  emit('blur');
}

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.state, InputState, 'state');
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
        v-model="_modelValue"
        v-model:input-ref="_inputRef"
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
        @focus="onInputFocus"
        @blur="onButtonBlur"
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

<style scoped>
:deep(input) {
  text-align: right !important;
}

:deep(input::-webkit-outer-spin-button),
:deep(input::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}
:deep(input[type=number]) {
  -moz-appearance: textfield;
}
</style>
