<script lang="ts" setup>
import AntRadio from './AntRadio.vue';
import {
  useVModel,
} from '@vueuse/core';
import {
  AntField,
} from './Elements';
import AntSkeleton from '../AntSkeleton.vue';
import {
  type AntRadioTypes,
} from './__types/AntRadio.types';
import {
  InputState, LayoutVariant, Size,
} from '../../enums';
import {
  computed, onMounted, ref, watch,
} from 'vue';
import {
  Direction,
} from '../../enums/Direction.enum';
import {
  handleEnumValidation,
} from '../../handler';

const emit = defineEmits([
  'update:modelValue',
  'update:skeleton',
  'validate',
]);
const props = withDefaults(defineProps<{
  modelValue: string | null;
  radioButtons: AntRadioTypes[];
  label?: string;
  description?: string;
  direction?: Direction;
  state?: InputState;
  size?: Size;
  layoutVariant?: LayoutVariant;
  skeleton?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  messages?: string[];
}>(), {
  direction: Direction.column,
  state: InputState.base,
  layoutVariant: LayoutVariant.default,
  size: Size.md,
  skeleton: false,
  disabled: false,
  readonly: false,
  messages: () => [],
});
const _modelValue = useVModel(props, 'modelValue', emit);
const radioRef = ref<Array<InstanceType<typeof AntRadio>>>([]);
const containerClasses = computed(() => ({
  'flex justify-start': true,
  'flex-row': props.direction === Direction.row,
  'flex-col': props.direction === Direction.column,
  'gap-2.5': props.size === Size.lg,
  'gap-2': props.size === Size.md,
  'gap-1.5': props.size === Size.sm || props.size === Size.xs,
  'gap-1': props.size === Size.xs2,
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
  'flex gap-px rounded-md border overflow-hidden': true,
  'bg-base-300 border-base-300': props.state === InputState.base,
  'bg-info-500 border-info-500': props.state === InputState.info,
  'bg-success-500 border-success-500': props.state === InputState.success,
  'bg-warning-500 border-warning-500': props.state === InputState.warning,
  'bg-danger-500 border-danger-500': props.state === InputState.danger,
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
const getTabItemColorClasses = (radio: AntRadioTypes) => {
  return {
    'opacity-50': props.disabled || radio.disabled,
    'bg-white text-for-white-bg-font': radio.value !== _modelValue.value,
    '!bg-primary-500 text-primary-500-font': !props.skeleton && radio.value === _modelValue.value && props.state === InputState.base,
    '!bg-info-500 text-info-500-font': !props.skeleton && radio.value === _modelValue.value && props.state === InputState.info,
    '!bg-success-500 text-success-500-font': !props.skeleton && radio.value === _modelValue.value && props.state === InputState.success,
    '!bg-warning-500 text-warning-500-font': !props.skeleton && radio.value === _modelValue.value && props.state === InputState.warning,
    '!bg-danger-500 text-danger-500-font': !props.skeleton && radio.value === _modelValue.value && props.state === InputState.danger,
  };
};
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
watch(_modelValue, (val) => {
  if ([
    InputState.danger,
    InputState.warning,
    InputState.info,
  ].includes(props.state)) {
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

const onClickBlockItem = (radio: AntRadioTypes, index: number) => {
  if (props.skeleton || props.disabled || props.readonly || radio.disabled || radio.readonly) {
    return;
  }

  _modelValue.value = radio.value;

  setTimeout(() => {
    const radioComponent = radioRef.value[index];

    if (radioComponent && radioComponent.$el) {
      const input = radioComponent.$el.querySelector('input[type="radio"]');

      if (input) {
        input.focus();
      }
    }
  });
};

const onClickTabItem = (radio: AntRadioTypes) => {
  if (props.skeleton || props.disabled || props.readonly || radio.disabled || radio.readonly) {
    return;
  }

  _modelValue.value = radio.value;
};

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
    data-e2e="radio-group"
  >
    <div
      v-if="layoutVariant === LayoutVariant.default"
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

    <div
      v-if="layoutVariant === LayoutVariant.block"
      ref="containerRef"
      :class="blockContainerClasses"
    >
      <div
        v-for="(radio, index) in radioButtons"
        :key="`radio-button-widget_${radio.value}-${index}`"
        :class="{
          ...blockItemClasses,
          'cursor-not-allowed': props.disabled || radio.disabled,
          'cursor-pointer hover:bg-base-50': !props.skeleton && !props.disabled && !props.readonly && !radio.disabled && !radio.readonly,
          'bg-base-100': !skeleton && _modelValue === radio.value,
          'bg-white': skeleton || _modelValue !== radio.value,
        }"
        @click="onClickBlockItem(radio, index)"
      >
        <AntRadio
          :ref="el => radioRef[index] = el"
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
    </div>

    <div
      v-if="layoutVariant === LayoutVariant.tab"
      :class="tabContainerClasses"
    >
      <div
        v-for="(radio, index) in radioButtons"
        :key="`radio-button-widget_${radio.value}-${index}`"
        :class="{
          ...tabItemClasses,
          ...getTabItemColorClasses(radio),
          'cursor-not-allowed': props.disabled || radio.disabled,
          'cursor-pointer hover:bg-base-50': !props.skeleton && !props.disabled && !props.readonly && !radio.disabled && !radio.readonly,
          'bg-base-100': !skeleton && _modelValue === radio.value,
          'bg-white': skeleton || _modelValue !== radio.value,
        }"
        @click="onClickTabItem(radio)"
      >
        <AntSkeleton
          :visible="skeleton"
          rounded
        >
          {{ radio.label }}
        </AntSkeleton>
      </div>
    </div>
  </AntField>
</template>
