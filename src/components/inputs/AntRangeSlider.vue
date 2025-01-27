<script setup lang="ts">
import AntField from '../forms/AntField.vue';
import {useVModel} from '@vueuse/core';
import {computed, onMounted, watch} from 'vue';
import {InputState, Size} from '../../enums';
import {handleEnumValidation} from '../../handler';

defineOptions({inheritAttrs: false});

const emit = defineEmits(['update:modelValue', 'update:skeleton', 'validate', 'blur']);
const props = withDefaults(defineProps<{
  modelValue: number | number[] | null;
  label?: string;
  description?: string;
  state?: InputState;
  size?: Size,
  disabled?: boolean;
  skeleton?: boolean;
  min?: number;
  max?: number;
  messages?: string[];
}>(), {
  state: InputState.base,
  size: Size.md,
  disabled: false,
  skeleton: false,
  limiter: false,
  messages: () => []
});
const _modelValue = useVModel(props, 'modelValue', emit);
const inputClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'text-base-base',
    [InputState.danger]: 'text-danger-base',
    [InputState.info]: 'text-info-base',
    [InputState.success]: 'text-success-base',
    [InputState.warning]: 'text-warning-base',
  };

  return {
    'ant-range-slider transition-colors relative border-none w-full h-2 bg-base-300 rounded-md outline-none': true,
    'disabled:opacity-50 disabled:cursor-not-allowed': props.disabled,
    'invisible': props.skeleton,
    [variants[props.state]]: true
  };
});

/**
 * Validate default value if given after delayed data fetching.
 */
watch(() => props.skeleton, (val) => {
  if (!val && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});
watch(_modelValue, (val) => {
  if ([InputState.danger, InputState.warning, InputState.info].includes(props.state)) {
    emit('validate', val);
  }
});

function onBlur(e: FocusEvent) {
  emit('validate', props.modelValue);
  emit('blur', e);
}

onMounted(() => {
  handleEnumValidation(props.state, InputState, 'state');
  handleEnumValidation(props.size, Size, 'size');

  if (!props.skeleton && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});
</script>

<template>
  <AntField
    :label="label"
    :size="size"
    :skeleton="skeleton"
    :description="description"
    :state="state"
    :messages="messages"
  >
    <input
      v-model.number="_modelValue"
      :class="inputClasses"
      type="range"
      :disabled="disabled || skeleton"
      :min="min"
      :max="max"
      v-bind="$attrs"
      @blur="onBlur"
    >
  </AntField>
</template>

<style scoped>
.ant-range-slider {
  -webkit-appearance: none;
}

.ant-range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  border-radius: 100%;
  appearance: none;
  width: 14px;
  height: 14px;
  background: #fff;
  border: 1px solid #CBD5E1;
  cursor: pointer;
}

.ant-range-slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: #04AA6D;
  cursor: pointer;
}
</style>
