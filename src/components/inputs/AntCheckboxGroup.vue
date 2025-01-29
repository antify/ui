<script setup lang="ts">
import {type AntCheckboxType} from './__types/AntCheckbox.types';
import {AntField} from './Elements';
import {useVModel} from '@vueuse/core';
import AntCheckbox from './AntCheckbox.vue';
import {computed, onMounted, ref, watch} from 'vue';
import {Direction} from '../../enums/Direction.enum';
import {InputState, Size} from '../../enums';

const emit = defineEmits(['update:modelValue', 'validate', 'blur']);
const props = withDefaults(
  defineProps<{
    modelValue: string[] | null;
    checkboxes?: AntCheckboxType[];
    label?: string;
    description?: string;
    direction?: Direction;
    state?: InputState;
    size?: Size,
    skeleton?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    messages?: string[]
  }>(),
  {
    direction: Direction.column,
    state: InputState.base,
    size: Size.md,
    skeleton: false,
    readonly: false,
    disabled: false,
    messages: () => []
  }
);
const _modelValue = useVModel(props, 'modelValue', emit);
const containerClasses = computed(() => ({
  'flex gap-2.5': true,
  'flex-row': props.direction === Direction.row,
  'flex-col': props.direction === Direction.column
}));
const containerRef = ref<null | HTMLElement>(null);

watch(_modelValue, (val) => {
  if ([InputState.danger, InputState.warning, InputState.info].includes(props.state)) {
    emit('validate', val);
  }
}, {deep: true});
watch(() => props.skeleton, (val) => {
  if (!val && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});

function updateValue(value: string) {
  if (_modelValue.value === null) {
    return _modelValue.value = [value];
  }

  const index = _modelValue.value.indexOf(value);

  if (index === -1) {
    _modelValue.value.push(value);
  } else {
    _modelValue.value.splice(index, 1);
  }
}

function hasFocusedCheckbox() {
  return !!containerRef.value?.querySelector('input[type="checkbox"]:focus');
}

function onBlurCheckbox() {
  setTimeout(() => {
    if (!hasFocusedCheckbox()) {
      emit('validate', _modelValue.value);
    }
  }, 100);
}

onMounted(() => {
  if (!props.skeleton && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});
</script>

<template>
  <AntField
    data-e2e="checkbox-group"
    :label="label"
    :description="description"
    :skeleton="skeleton"
    :state="state"
    :size="size"
    :messages="messages"
    label-for="noop"
  >
    <div
      ref="containerRef"
      :class="containerClasses"
    >
      <AntCheckbox
        v-for="(checkbox, index) in checkboxes"
        :key="`checkbox-group-${index}`"
        :model-value="_modelValue !== null ? _modelValue?.indexOf(checkbox.value) !== -1 : null"
        :size="size"
        :state="state"
        :skeleton="skeleton"
        :disabled="disabled || checkbox.disabled"
        :readonly="readonly || checkbox.readonly"
        @update:model-value="updateValue(checkbox.value)"
        @blur="() => onBlurCheckbox()"
      >
        {{ checkbox.label }}
      </AntCheckbox>
    </div>
  </AntField>
</template>
