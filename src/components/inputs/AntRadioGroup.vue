<script lang="ts" setup>
import AntRadio from './AntRadio.vue';
import {useVModel} from '@vueuse/core';
import {AntField} from './Elements';
import {type AntRadioTypes} from './__types/AntRadio.types';
import {InputState, Size} from '../../enums';
import {computed, onMounted, ref, watch} from 'vue';
import {Direction} from '../../enums/Direction.enum';
import {handleEnumValidation} from '../../handler';

defineOptions({inheritAttrs: false});

const emit = defineEmits(['update:modelValue', 'update:skeleton', 'validate']);
const props = withDefaults(
  defineProps<{
    modelValue: string | null;
    radioButtons: AntRadioTypes[];
    label?: string;
    description?: string;
    direction?: Direction;
    state?: InputState;
    size?: Size;
    skeleton?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    messages?: string[];
  }>(), {
    direction: Direction.column,
    state: InputState.base,
    size: Size.md,
    skeleton: false,
    disabled: false,
    readonly: false,
    messages: () => []
  });
const _modelValue = useVModel(props, 'modelValue', emit);
const containerClasses = computed(() => ({
  'flex justify-start': true,
  'flex-row': props.direction === Direction.row,
  'flex-col': props.direction === Direction.column,
  'gap-2.5': props.size === Size.lg,
  'gap-2': props.size === Size.md,
  'gap-1.5': props.size === Size.sm || props.size === Size.xs,
  'gap-1': props.size === Size.xs2,
}));
const containerRef = ref<null | HTMLElement>(null);
const fieldSize = computed(() => {
  switch (props.size) {
    case Size.lg:
      return Size.lg;
    case Size.md:
      return Size.md;
    case Size.sm:
      return Size.sm;
    case Size.xs:
      return Size.xs;
    default:
      return Size.xs2;
  }
});

watch(_modelValue, (val) => {
  if ([InputState.danger, InputState.warning, InputState.info].includes(props.state)) {
    emit('validate', val);
  }
}, {deep: true});
watch(_modelValue, (val) => {
  if ([InputState.danger, InputState.warning, InputState.info].includes(props.state)) {
    emit('validate', val);
  }
});

function hasFocusedRadio() {
  return !!containerRef.value?.querySelector('input[type="radio"]:focus');
}

function onBlurRadio() {
  setTimeout(() => {
    if (!hasFocusedRadio()) {
      emit('validate', _modelValue.value);
    }
  }, 100);
}

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.state, InputState, 'state');
  handleEnumValidation(props.direction, Direction, 'direction');

  /**
   * Validate default value without delayed data fetching.
   */
  if (!props.skeleton && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});
</script>

<template>
  <AntField
    :label="label"
    :description="description"
    :state="state"
    :skeleton="skeleton"
    :messages="messages"
    :size="fieldSize"
    label-for="noop"
  >
    <div
      ref="containerRef"
      :class="containerClasses"
    >
      <AntRadio
        v-for="(radio, index) in radioButtons"
        :key="`radio-button-widget_${radio.value}-${index}`"
        v-model="_modelValue"
        :value="radio"
        :skeleton="skeleton"
        :disabled="disabled || radio.disabled"
        :readonly="readonly || radio.readonly"
        :state="radio.state || state"
        :size="size"
        @blur="onBlurRadio"
      />
    </div>
  </AntField>
</template>
