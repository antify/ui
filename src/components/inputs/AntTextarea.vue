<script lang="ts" setup>
import {
  computed, onMounted, ref, watch,
} from 'vue';
import {
  Size,
} from '../../enums/Size.enum';
import AntSkeleton from '../AntSkeleton.vue';
import AntIcon from '../AntIcon.vue';
import {
  Grouped,
} from '../../enums/Grouped.enum';
import {
  faExclamationTriangle,
  faExclamationCircle,
  faCircleCheck,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import {
  handleEnumValidation,
} from '../../handler';
import {
  classesToObjectSyntax,
} from '../../utils';
import AntField from '../forms/AntField.vue';
import {
  useVModel,
} from '@vueuse/core';
import {
  InputState,
} from '../../enums';
import {
  IconSize,
} from '../__types';

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits([
  'update:modelValue',
  'update:inputRef',
  'validate',
  'blur',
]);
const props = withDefaults(defineProps<{
  modelValue: string | null;
  size?: Size;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  skeleton?: boolean;
  grouped?: Grouped;
  wrapperClass?: string | Record<string, boolean>;
  showIcon?: boolean;
  label?: string;
  placeholder?: string;
  description?: string;
  limiter?: boolean;
  max?: number;
  messages?: string[];
  resize?: boolean;
  inputRef?: HTMLInputElement | null;
}>(), {
  state: InputState.base,
  disabled: false,
  readonly: false,
  size: Size.md,
  skeleton: false,
  grouped: Grouped.none,
  showIcon: true,
  limiter: false,
  resize: true,
  messages: () => [],
  inputRef: null,
});

const _modelValue = useVModel(props, 'modelValue', emit);
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);
const icons = {
  [InputState.info]: faCircleInfo,
  [InputState.warning]: faExclamationTriangle,
  [InputState.danger]: faExclamationCircle,
  [InputState.success]: faCircleCheck,
  [InputState.base]: null,
};
/*TODO #59:: If the scrollbar is showing than the pr is moving and the gap between icon and text is bigger and the icon is stuck in the scrollbar*/
const inputClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'outline-base-300 focus:ring-primary-200 bg-white placeholder:text-base-500',
    [InputState.danger]: 'outline-danger-500 focus:ring-danger-200 bg-danger-100 placeholder:text-danger-700',
    [InputState.info]: 'outline-info-500 focus:ring-info-200 bg-info-100 placeholder:text-info-700',
    [InputState.success]: 'outline-success-500 focus:ring-success-200 bg-success-100 placeholder:text-success-700',
    [InputState.warning]: 'outline-warning-500 focus:ring-warning-200 bg-warning-100 placeholder:text-warning-700',
  };

  return {
    'block transition-colors relative border-none outline w-full h-full text-black': true,
    'outline-offset-[-1px] outline-1 focus:outline-offset-[-1px] focus:outline-1': true,
    'disabled:opacity-50 disabled:cursor-not-allowed': props.disabled,
    [variants[props.state]]: true,
    // Size
    'p-1 text-xs': props.size === Size.xs2,
    'p-1.5 text-xs': props.size === Size.xs,
    'p-1.5 text-sm': props.size === Size.sm,
    'p-2 text-sm': props.size === Size.md,
    'p-2.5 text-sm': props.size === Size.lg,
    'focus:ring-2': !hasInputState.value && (props.size === Size.sm || props.size === Size.xs || props.size === Size.xs2),
    'focus:ring-4': !hasInputState.value && (props.size === Size.lg || props.size === Size.md),
    // Icon right
    'pr-6': props.size === Size.xs2 && props.showIcon && icon.value,
    'pr-7': props.size === Size.xs && props.showIcon && icon.value,
    'pr-8': props.size === Size.sm && props.showIcon && icon.value,
    'pr-9': props.size === Size.md && props.showIcon && icon.value,
    'pr-10': props.size === Size.lg && props.showIcon && icon.value,
    // Grouped
    'rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none': props.grouped === Grouped.left,
    'rounded-none': props.grouped === Grouped.center,
    'rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md': props.grouped === Grouped.right,
    'rounded-md': props.grouped === Grouped.none,
    invisible: props.skeleton,
    'resize-none': !props.resize,
  };
});
const iconColor = computed(() => {
  const variants = {
    base: undefined,
    danger: 'text-danger-500',
    info: 'text-info-500',
    primary: 'text-primary-500',
    secondary: 'text-secondary-500',
    success: 'text-success-500',
    warning: 'text-warning-500',
  };

  return variants[props.state];
});
const _wrapperClass = computed(() => classesToObjectSyntax(props.wrapperClass));
const icon = computed(() => icons[props.state]);
const _inputRef = useVModel(props, 'inputRef', emit);
const getIconSize = computed(() => {
  if (props.size === Size.xs || props.size === Size.xs2) {
    return IconSize.xs;
  } else {
    return IconSize.sm;
  }
});

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.grouped, Grouped, 'grouped');
  handleEnumValidation(props.state, InputState, 'state');

  if (!props.skeleton && props.modelValue !== null) {
    emit('validate', props.modelValue);
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
watch(() => props.skeleton, (val) => {
  if (!val && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});

function onBlur(e: FocusEvent) {
  emit('validate', props.modelValue);
  emit('blur', e);
}

defineExpose({
  getTextAreaRef: () => _inputRef.value,
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
    :limiter-value="limiter ? _modelValue?.length : undefined"
    :messages="messages"
    :expanded-height="!resize"
    data-e2e="textarea"
  >
    <AntSkeleton
      :visible="skeleton"
      :grouped="grouped"
      rounded
      class="block relative w-full h-full"
      :class="{...{'-mr-px': grouped !== Grouped.none}, ..._wrapperClass}"
    >
      <textarea
        ref="_inputRef"
        v-model="_modelValue"
        :class="inputClasses"
        :placeholder="placeholder !== undefined ? placeholder : label"
        :disabled="disabled || skeleton"
        :readonly="readonly"
        v-bind="$attrs"
        @blur="onBlur"
      />

      <div
        v-if="showIcon && icon"
        class="absolute flex h-[95%] right-0 top-0 transition-all z-20"
        :class="{'p-1': size === Size.xs2, 'p-1.5': size === Size.sm || size === Size.xs, 'p-2': size === Size.md, 'p-2.5': size === Size.lg}"
      >
        <AntIcon
          :icon="icon"
          :size="getIconSize"
          :color="iconColor"
        />
      </div>
    </AntSkeleton>
  </AntField>
</template>
