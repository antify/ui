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
  InputState, LayoutVariant, Size,
} from '../../enums';
import AntSkeleton from '../AntSkeleton.vue';

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
    layoutVariant?: LayoutVariant;
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
    checkboxes: () => [],
    direction: Direction.column,
    state: InputState.base,
    layoutVariant: LayoutVariant.default,
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
const blockContainerClasses = computed(() => ({
  'flex flex-col gap-px rounded-md border overflow-hidden': true,
  'bg-base-300 border-base-300': props.state === InputState.base,
  'bg-info-500 border-info-500': props.state === InputState.info,
  'bg-success-500 border-success-500': props.state === InputState.success,
  'bg-warning-500 border-warning-500': props.state === InputState.warning,
  'bg-danger-500 border-danger-500': props.state === InputState.danger,
  'cursor-not-allowed': props.disabled,
}));
const blockItemClasses = computed(() => ({
  'p-2.5': props.size === Size.lg,
  'p-2': props.size === Size.md,
  'p-1.5': props.size === Size.sm || props.size === Size.xs,
  'p-1': props.size === Size.xs2,
}));
const tabContainerClasses = computed(() => ({
  'flex rounded-md overflow-hidden': true,
  'cursor-not-allowed': props.disabled,
}));
const tabItemClasses = computed(() => ({
  'flex justify-center grow transition-colors': true,
  'text-sm': props.size === Size.lg || props.size === Size.md || props.size === Size.sm,
  'text-xs': props.size === Size.xs || props.size === Size.xs2,
  'p-2.5': props.size === Size.lg,
  'p-2': props.size === Size.md,
  'p-1.5': props.size === Size.sm || props.size === Size.xs,
  'p-1': props.size === Size.xs2,
}));
const getTabItemColorClasses = (checkbox: AntCheckboxType, index: number) => {
  const borderClasses = {
    'border-base-300': props.modelValue?.includes(checkbox.value) || (!props.modelValue?.includes(checkbox.value) && props.state === InputState.base),
    'border-info-500': !props.modelValue?.includes(checkbox.value) && props.state === InputState.info,
    'border-success-500': !props.modelValue?.includes(checkbox.value) && props.state === InputState.success,
    'border-warning-500': !props.modelValue?.includes(checkbox.value) && props.state === InputState.warning,
    'border-danger-500': !props.modelValue?.includes(checkbox.value) && props.state === InputState.danger,
  };

  return {
    ...borderClasses,
    'border-y': true,
    'border-l': index !== props.checkboxes.length - 1,
    'border-x': index === props.checkboxes.length - 1,
    'rounded-l-md': index === 0,
    'rounded-r-md': index === props.checkboxes.length - 1,
    'opacity-50': props.disabled || checkbox.disabled,
    'bg-white text-for-white-bg-font': !props.modelValue?.includes(checkbox.value),
    '!bg-primary-500 text-primary-500-font': !props.skeleton && props.modelValue?.includes(checkbox.value) && props.state === InputState.base,
    '!bg-info-500 text-info-500-font': !props.skeleton && props.modelValue?.includes(checkbox.value) && props.state === InputState.info,
    '!bg-success-500 text-success-500-font': !props.skeleton && props.modelValue?.includes(checkbox.value) && props.state === InputState.success,
    '!bg-warning-500 text-warning-500-font': !props.skeleton && props.modelValue?.includes(checkbox.value) && props.state === InputState.warning,
    '!bg-danger-500 text-danger-500-font': !props.skeleton && props.modelValue?.includes(checkbox.value) && props.state === InputState.danger,
  };
};
const containerRef = ref<null | HTMLElement>(null);
const checkboxRef = ref<Array<InstanceType<typeof AntCheckbox>>>([]);

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

const onClickBlockItem = (checkbox: AntCheckboxType, index: number) => {
  if (props.skeleton || props.disabled || props.readonly || checkbox.disabled || checkbox.readonly) {
    return;
  }

  updateValue(checkbox.value);

  setTimeout(() => {
    const checkboxComponent = checkboxRef.value[index];

    if (checkboxComponent && checkboxComponent.$el) {
      const input = checkboxComponent.$el.querySelector('input[type="checkbox"]');

      if (input) {
        input.focus();
      }
    }
  });
};

const onClickTabItem = (checkbox: AntCheckboxType) => {
  if (props.skeleton || props.disabled || props.readonly || checkbox.disabled || checkbox.readonly) {
    return;
  }

  updateValue(checkbox.value);
};

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
      v-if="layoutVariant === LayoutVariant.default"
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

    <div
      v-if="layoutVariant === LayoutVariant.block"
      ref="containerRef"
      :class="blockContainerClasses"
    >
      <div
        v-for="(checkbox, index) in checkboxes"
        :key="`checkbox-widget_${checkbox.value}-${index}`"
        :class="{
          ...blockItemClasses,
          'cursor-not-allowed': props.disabled || checkbox.disabled,
          'cursor-pointer hover:bg-base-50': !props.skeleton && !props.disabled && !props.readonly && !checkbox.disabled && !checkbox.readonly,
          'bg-base-100': !skeleton && modelValue?.includes(checkbox.value),
          'bg-white': skeleton || !modelValue?.includes(checkbox.value),
        }"
        @click="onClickBlockItem(checkbox, index)"
      >
        <AntCheckbox
          :ref="el => checkboxRef[index] = el"
          :model-value="modelValue !== null ? modelValue?.indexOf(checkbox.value) !== -1 : null"
          :skeleton="skeleton"
          :disabled="disabled || checkbox.disabled"
          :readonly="readonly || checkbox.readonly"
          :state="state"
          :size="size"
          @update:model-value="updateValue(checkbox.value)"
          @blur="() => onBlurCheckbox()"
          @click.stop
        >
          {{ checkbox.label }}
        </AntCheckbox>
      </div>
    </div>

    <div
      v-if="layoutVariant === LayoutVariant.tab"
      :class="tabContainerClasses"
    >
      <div
        v-for="(checkbox, index) in checkboxes"
        :key="`checkbox-widget_${checkbox.value}-${index}`"
        :class="{
          ...tabItemClasses,
          ...getTabItemColorClasses(checkbox, index),
          'cursor-not-allowed': props.disabled || checkbox.disabled,
          'cursor-pointer hover:bg-base-50': !props.skeleton && !props.disabled && !props.readonly && !checkbox.disabled && !checkbox.readonly,
          'bg-base-100': !skeleton && modelValue?.includes(checkbox.value),
          'bg-white': skeleton || !modelValue?.includes(checkbox.value),
        }"
        @click="onClickTabItem(checkbox)"
      >
        <AntSkeleton
          :visible="skeleton"
          rounded
        >
          {{ checkbox.label }}
        </AntSkeleton>
      </div>
    </div>
  </AntField>
</template>
