<script lang="ts" setup>
import {
  useVModel,
} from '@vueuse/core';
import {
  AntField,
} from './Elements';
import {
  InputState, Size,
} from '../../enums';
import AntSkeleton from '../AntSkeleton.vue';
import {
  computed, onMounted, ref, watch,
} from 'vue';
import {
  handleEnumValidation,
} from '../../handler';
import {
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import AntIcon from '../AntIcon.vue';
import {
  IconSize,
} from '../__types';

const emit = defineEmits([
  'update:modelValue',
  'update:skeleton',
  'validate',
  'blur',
]);
const props =
  withDefaults(defineProps<{
    modelValue: boolean | null;
    label?: string;
    description?: string;
    state?: InputState;
    size?: Size;
    skeleton?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    messages?: string[];
  }>(), {
    state: InputState.base,
    size: Size.md,
    skeleton: false,
    disabled: false,
    readonly: false,
    messages: () => [],
  });
const _modelValue = useVModel(props, 'modelValue', emit);
const delayedValue = ref(_modelValue.value);
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);
const inputClasses = computed(() => {
  const focusColorVariant: Record<InputState, string> = {
    [InputState.base]: 'focus:ring-primary-200',
    [InputState.danger]: 'focus:ring-danger-200',
    [InputState.info]: 'focus:ring-info-200',
    [InputState.success]: 'focus:ring-success-200',
    [InputState.warning]: 'focus:ring-warning-200',
  };
  const activeColorVariant: Record<InputState, string> = {
    [InputState.base]: 'text-primary-500',
    [InputState.danger]: 'text-danger-500',
    [InputState.info]: 'text-info-500',
    [InputState.success]: 'text-success-500',
    [InputState.warning]: 'text-warning-500',
  };
  const inactiveColorVariant: Record<InputState, string> = {
    [InputState.base]: 'outline-base-300',
    [InputState.danger]: 'outline-danger-500',
    [InputState.info]: 'outline-info-500',
    [InputState.success]: 'outline-success-500',
    [InputState.warning]: 'outline-warning-500',
  };

  return {
    'relative inline-flex flex-shrink-0 bg-base-100 border-0': true,
    'outline outline-1 outline-offset-[-1px] rounded': true,
    'focus:ring-offset-0': true,
    invisible: props.skeleton,
    'cursor-pointer': !hasInputState.value,
    'focus:ring-2': !hasInputState.value && (props.size === Size.sm || props.size === Size.xs || props.size === Size.xs2),
    'focus:ring-4': !hasInputState.value && (props.size === Size.lg || props.size === Size.md),
    'h-5 w-5': props.size === Size.lg || props.size === Size.md || props.size === Size.sm,
    'h-4 w-4': props.size === Size.xs || props.size === Size.xs2,
    'cursor-not-allowed opacity-50': props.disabled,
    [focusColorVariant[props.state]]: !hasInputState.value,
    [activeColorVariant[props.state]]: delayedValue.value,
    [inactiveColorVariant[props.state]]: !_modelValue.value,
  };
});
const contentClasses = computed(() => ({
  'text-for-white-bg-font': true,
  'cursor-pointer': !hasInputState.value,
  'cursor-not-allowed opacity-50': props.disabled,
  'text-sm': props.size === Size.lg || props.size === Size.md || props.size === Size.sm,
  'text-xs': props.size === Size.xs || props.size === Size.xs2,
}));
const itemSize = computed(() => {
  if (props.size === Size.xs || props.size === Size.xs2) {
    return IconSize.xs;
  } else {
    return IconSize.sm;
  }
});
const iconColor = computed(() => {
  switch (props.state) {
    case InputState.base:
      return 'text-primary-500-font';
    case InputState.info:
      return 'text-info-500-font';
    case InputState.success:
      return 'text-success-500-font';
    case InputState.warning:
      return 'text-warning-500-font';
    default:
      return 'text-danger-500-font';
  }
});

/**
 * Delay value to change the checkboxes background color after
 * animation is finished.
 */
watch(_modelValue, (val) => {
  if (val === false) {
    setTimeout(() => delayedValue.value = false, 120);
  } else {
    delayedValue.value = true;
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

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.state, InputState, 'state');

  if (!props.skeleton && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});
</script>

<template>
  <AntField
    data-e2e="checkbox"
    :label="label"
    :description="description"
    :skeleton="skeleton"
    :state="state"
    :size="size"
    :expanded="false"
    :messages="messages"
  >
    <div class="flex items-center gap-1.5">
      <div class="relative full-height flex items-center">
        <input
          v-model="_modelValue"
          :class="inputClasses"
          type="checkbox"
          :aria-checked="_modelValue"
          :disabled="disabled || readonly"
          @blur="onBlur"
        >

        <div
          class="absolute flex items-center justify-center !text-white pointer-events-none"
          :class="size === Size.lg || size === Size.md || size === Size.sm ? 'h-5 w-5' : 'h-4 w-4'"
        >
          <AntIcon
            v-if="_modelValue"
            :icon="faCheck"
            :size="itemSize"
            :color="iconColor"
          />
        </div>

        <AntSkeleton
          v-if="skeleton"
          absolute
          rounded
        />
      </div>

      <div
        class="relative flex items-center"
        :class="props.size === Size.md ? 'h-5' : 'h-4'"
      >
        <span :class="contentClasses">
          <slot />
        </span>

        <AntSkeleton
          v-if="skeleton"
          absolute
          rounded
        />
      </div>
    </div>
  </AntField>
</template>

<style scoped>
input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  position: relative;
}

input[type="checkbox"]::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  transform: scale(0);
  transition: 120ms transform;
  background: currentColor;
  border-radius: inherit;
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}
</style>
