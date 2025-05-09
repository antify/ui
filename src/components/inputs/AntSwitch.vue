<script setup lang="ts">
import AntField from '../forms/AntField.vue';
import {
  computed, watch,
} from 'vue';
import AntSkeleton from '../AntSkeleton.vue';
import {
  InputState, Size,
} from '../../enums';
import {
  hasSlotContent,
} from '../../utils';

const emit = defineEmits([
  'update:modelValue',
  'input',
  'blur',
  'validate',
]);
const props = withDefaults(defineProps<{
  modelValue: boolean | null;
  label?: string;
  description?: string;
  skeleton?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  size?: Size;
  state?: InputState;
  messages?: string[];
}>(), {
  size: Size.md,
  state: InputState.base,
  messages: () => [],
});
const _value = computed({
  get: () => props.modelValue,
  set: (val: boolean | null) => {
    emit('update:modelValue', val);
    emit('input', val);
  },
});
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);
const buttonClasses = computed(() => {
  const classes: {
    [key: string]: boolean;
  } = {
    'relative inline-flex shrink-0': true,
    'focus:outline-hidden': true,
    'rounded-full ease-in-out duration-200': true,
    'cursor-pointer': !hasInputState.value,
    'focus-within:ring-4': !hasInputState.value && (props.size === Size.lg || props.size === Size.md),
    'focus-within:ring-2': !hasInputState.value && (props.size === Size.sm || props.size === Size.xs || props.size === Size.xs2),
    'h-5 w-9': props.size === Size.lg || props.size === Size.md || props.size === Size.sm,
    'h-4 w-[30px]': props.size === Size.xs || props.size === Size.xs2,
    'bg-base-300': !_value.value,
    invisible: props.skeleton,
    // Disabled
    'opacity-50 cursor-not-allowed': props.disabled,
    'cursor-default': props.readonly,
  };
  const colorVariant = {
    [InputState.base]: 'focus-within:ring-primary-200',
    [InputState.danger]: 'focus-within:ring-danger-200 outline outline-1 -outline-offset-1 outline-danger-500',
    [InputState.info]: 'focus-within:ring-info-200 outline outline-1 -outline-offset-1 outline-info-500',
    [InputState.success]: 'focus-within:ring-success-200 outline outline-1 -outline-offset-1 outline-success-500',
    [InputState.warning]: 'focus-within:ring-warning-200 outline outline-1 -outline-offset-1 outline-warning-500',
  };
  const activeColorVariant = {
    [InputState.base]: 'bg-primary-500',
    [InputState.danger]: 'bg-danger-500',
    [InputState.info]: 'bg-info-500',
    [InputState.success]: 'bg-success-500',
    [InputState.warning]: 'bg-warning-500',
  };

  classes[colorVariant[props.state]] = !hasInputState.value;
  classes[activeColorVariant[props.state]] = !!_value.value;

  return classes;
});
const ballClasses = computed(() => ({
  'pointer-events-none inline-block rounded-full bg-base-100 shadow-sm transform ring-0 transition ease-in-out duration-200': true,
  'h-4 w-4 translate-y-0.5': props.size === Size.lg || props.size === Size.md || props.size === Size.sm,
  'translate-x-[1.125rem]': _value.value && (props.size === Size.lg || props.size === Size.md || props.size === Size.sm),
  'translate-x-0.5': !_value.value && (props.size === Size.lg || props.size === Size.md || props.size === Size.sm),
  'h-3.5 w-3.5  translate-y-[1px]': props.size === Size.xs || props.size === Size.xs2,
  'translate-x-[.925rem]': _value.value && (props.size === Size.xs || props.size === Size.xs2),
  'translate-x-[1px]': !_value.value && (props.size === Size.xs || props.size === Size.xs2),
  invisible: props.skeleton,
}));
const valueClasses = computed(() => ({
  'text-for-white-bg-font': true,
  'text-sm': props.size === Size.lg || props.size === Size.md || props.size === Size.sm,
  'text-xs': props.size === Size.xs || props.size === Size.xs2,
  'opacity-50 cursor-not-allowed': props.disabled,
  'cursor-pointer': !hasInputState.value,
}));
const fieldSize = computed(() => {
  if (props.size === Size.lg) {
    return Size.lg;
  }

  if (props.size === Size.md) {
    return Size.md;
  }

  if (props.size === Size.sm) {
    return Size.sm;
  }

  if (props.size === Size.xs) {
    return Size.xs;
  }

  return Size.xs2;

});

/**
 * Validations
 */
watch(() => props.skeleton, (val) => {
  if (!val && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});
watch(_value, () => {
  if ([
    InputState.danger,
    InputState.info,
    InputState.warning,
  ].includes(props.state)) {
    emit('validate', props.modelValue);
  }
});

function changeValue() {
  if (!hasInputState.value) {
    _value.value = !_value.value;
  }
}

function onBlur(e: FocusEvent) {
  emit('validate', props.modelValue);
  emit('blur', e);
}
</script>

<template>
  <AntField
    data-e2e="switch"
    :label="label"
    :size="size"
    :description="description"
    :skeleton="skeleton"
    :state="state"
    :messages="messages"
    :expanded="false"
  >
    <div class="w-fit flex items-center gap-1.5">
      <AntSkeleton
        :visible="skeleton"
        rounded-full
      >
        <div class="relative w-fit flex items-center">
          <button
            v-bind="$attrs"
            type="button"
            :class="buttonClasses"
            role="switch"
            :aria-checked="!!_value"
            :disabled="disabled"
            :tabindex="hasInputState ? -1 : 0"
            @click="changeValue"
            @blur="onBlur"
          >
            <span
              aria-hidden="true"
              :class="ballClasses"
            >
              <slot name="icon" />
            </span>
          </button>
        </div>
      </AntSkeleton>

      <div
        v-if="hasSlotContent($slots['default'])"
        class="relative flex items-center"
        :class="props.size === Size.lg || props.size === Size.md ||props.size === Size.sm ? 'h-5' : 'h-4'"
      >
        <span :class="valueClasses">
          <slot />
        </span>

        <AntSkeleton
          :visible="skeleton"
          absolute
          rounded
          class="l-1.5"
        />
      </div>
    </div>
  </AntField>
</template>
