<script setup lang="ts">
import {
  type AntCheckboxType,
} from './__types/AntCheckbox.types';
import {
  AntField,
} from './Elements';
import AntCheckbox from './AntCheckbox.vue';
import {
  computed, onMounted, ref, watch,
} from 'vue';
import {
  Direction,
} from '../../enums/Direction.enum';
import {
  InputState, Size,
} from '../../enums';

const emit = defineEmits([
  'update:modelValue',
  'validate',
  'blur',
]);
const props = withDefaults(
  defineProps<{
    modelValue: string[] | null;
    checkboxes?: AntCheckboxType[];
    label?: string;
    description?: string;
    direction?: Direction;
    state?: InputState;
    size?: Size;
    skeleton?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    messages?: string[];
    /**
     * Tailwind ring class with focus prefix e.g. focus:ring-primary-200
     */
    focusColorClass?: string;
    /**
     * Tailwind outline class e.g. outline-primary-300
     */
    inactiveColorClass?: string;
    /**
     * Tailwind text class e.g. text-primary-500
     */
    activeColorClass?: string;
  }>(),
  {
    direction: Direction.column,
    state: InputState.base,
    size: Size.md,
    skeleton: false,
    readonly: false,
    disabled: false,
    messages: () => [],
    focusColorClass: 'focus:ring-primary-200',
    inactiveColorClass: 'outline-base-300',
    activeColorClass: 'text-primary-500',
  },
);
const containerClasses = computed(() => ({
  'flex gap-2.5': true,
  'flex-row': props.direction === Direction.row,
  'flex-col': props.direction === Direction.column,
}));
const containerRef = ref<null | HTMLElement>(null);

watch(() => props.modelValue, (val) => {
  if ([
    InputState.danger,
    InputState.warning,
    InputState.info,
  ].includes(props.state)) {
    emit('validate', val);
  }
}, {
  deep: true,
});
watch(() => props.skeleton, (val) => {
  if (!val && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});

function updateValue(value: string) {
  if (props.modelValue === null) {
    return emit('update:modelValue', [
      value,
    ]);
  }

  const index = props.modelValue.indexOf(value);

  if (index === -1) {
    emit('update:modelValue', [
      ...(props.modelValue || []),
      value,
    ]);
  } else {
    emit('update:modelValue', (props.modelValue || []).filter((item, i) => i !== index));
  }
}

function hasFocusedCheckbox() {
  return !!containerRef.value?.querySelector('input[type="checkbox"]:focus');
}

function onBlurCheckbox() {
  setTimeout(() => {
    if (!hasFocusedCheckbox()) {
      emit('validate', props.modelValue);
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
        :model-value="modelValue !== null ? modelValue?.indexOf(checkbox.value) !== -1 : null"
        :size="size"
        :state="state"
        :skeleton="skeleton"
        :disabled="disabled || checkbox.disabled"
        :readonly="readonly || checkbox.readonly"
        :active-color-class="activeColorClass"
        :inactive-color-class="inactiveColorClass"
        :focus-color-class="focusColorClass"
        @update:model-value="updateValue(checkbox.value)"
        @blur="() => onBlurCheckbox()"
      >
        {{ checkbox.label }}
      </AntCheckbox>
    </div>
  </AntField>
</template>
