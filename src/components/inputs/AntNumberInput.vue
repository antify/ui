<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import AntButton from '../buttons/AntButton.vue';
import AntField from '../forms/AntField.vue';
import AntBaseInput from './Elements/AntBaseInput.vue';
import {Size} from '../../enums/Size.enum';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import {State, InputState} from '../../enums/State.enum';
import {handleEnumValidation} from '../../handler';
import {useVModel} from '@vueuse/core';
import {Grouped} from '../../enums/Grouped.enum';
import {BaseInputType} from './Elements/__types';

defineOptions({inheritAttrs: false});

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
  indicators: false
});
const emit = defineEmits(['update:modelValue', 'validate']);
const _modelValue = useVModel(props, 'modelValue', emit);
const isPrevButtonDisabled = computed(() => {
  if (props.disabled) {
    return true;
  }

  if (_modelValue.value === null) {
    return false;
  }

  return props.min !== undefined ? _modelValue.value <= props.min : false;
});
const isNextButtonDisabled = computed(() => {
  if (props.disabled) {
    return true;
  }

  if (_modelValue.value === null) {
    return false;
  }

  return props.max !== undefined ? _modelValue.value >= props.max : false;
});

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.state, InputState, 'state');
});

function subtract() {
  if (_modelValue.value === null) {
    _modelValue.value = props.max || 0;
  } else if (props.max !== undefined && _modelValue.value - props.steps > props.max) {
    _modelValue.value = props.max;
  } else {
    _modelValue.value -= props.steps;
  }
}

function add() {
  if (_modelValue.value === null) {
    return _modelValue.value = props.min || 0;
  } else if (props.min !== undefined && _modelValue.value + props.steps < props.min) {
    return _modelValue.value = props.min;
  } else {
    _modelValue.value += props.steps;
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
    :limiter-value="limiter && _modelValue !== undefined && _modelValue !== null ? _modelValue : undefined"
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
        wrapper-class="flex-grow"
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
