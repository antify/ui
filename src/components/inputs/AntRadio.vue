<script lang="ts" setup>
import {AntField} from './Elements';
import {InputState, Size} from '../../enums';
import AntSkeleton from '../AntSkeleton.vue';
import {computed, onMounted, watch} from 'vue';
import {type AntRadioTypes} from './__types/AntRadio.types';
import {handleEnumValidation} from '../../handler';

defineOptions({inheritAttrs: false});

const emit = defineEmits(['update:modelValue', 'update:skeleton', 'validate', 'blur']);
const props = withDefaults(
  defineProps<{
    modelValue: string | null;
    value: AntRadioTypes;
    description?: string;
    skeleton?: boolean;
    state?: InputState;
    size?: Size;
    readonly?: boolean;
    disabled?: boolean;
    messages?: string[];
  }>(), {
    state: InputState.base,
    size: Size.md,
    readonly: false,
    disabled: false,
    messages: () => []
  }
);
const _modelValue = computed({
  get(): string | null | AntRadioTypes {
    return props.modelValue;
  },
  set(val: string | null | AntRadioTypes) {
    emit('update:modelValue', val ? typeof val === 'string' ? val : val.value : null);
  }
});
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);
const isActive = computed(() => _modelValue.value === props.value.value);
const inputClasses = computed(() => {
  const classes: { [key: string]: boolean } = {
    'relative inline-flex flex-shrink-0': true,
    'focus:ring-offset-0 outline outline-offset-[-1px] outline-1 focus:outline-offset-[-1px] focus:outline-1 rounded-full': true,
    'flex items-center justify-center rounded-full appearance-none': true,
    'cursor-pointer': !hasInputState.value,
    'rounded-full transition-colors ease-in-out duration-200 disabled:opacity-50': true,
    'focus:ring-2': !hasInputState.value && (props.size === Size.sm || props.size === Size.xs || props.size === Size.xs2),
    'focus:ring-4': !hasInputState.value && (props.size === Size.lg || props.size === Size.md),
    'outline-neutral-300': props.state === InputState.base,
    'outline-primary-500': props.state === InputState.base && isActive.value,
    'outline-info-500': props.state === InputState.info,
    'outline-success-500': props.state === InputState.success,
    'outline-warning-500': props.state === InputState.warning,
    'outline-danger-500': props.state === InputState.danger,
    'h-4 w-4 small': props.size === Size.xs || props.size === Size.xs2,
    'h-5 w-5': props.size === Size.lg || props.size === Size.md || props.size === Size.sm,
  };

  const focusColorVariant = {
    [InputState.base]: 'focus:ring-primary-200',
    [InputState.danger]: 'focus:ring-danger-200',
    [InputState.info]: 'focus:ring-info-200',
    [InputState.success]: 'focus:ring-success-200',
    [InputState.warning]: 'focus:ring-warning-200',
  };

  classes[focusColorVariant[props.state]] = !hasInputState.value;

  return classes;
});
const valueClass = computed(() => ({
  'relative w-fit full-height text-for-white-bg-font': true,
  'cursor-pointer': !hasInputState.value,
  'cursor-not-allowed opacity-50': props.disabled,
  'text-sm': props.size === Size.lg || props.size === Size.md || props.size === Size.sm,
  'text-xs': props.size === Size.xs || props.size === Size.xs2,
}));
const gapSize = computed(() => {
  switch (props.size) {
    case Size.lg:
      return 'gap-2.5';
    case Size.md:
      return 'gap-2';
    case Size.sm:
      return 'gap-1.5';
    case Size.xs:
      return 'gap-1.5';
    default:
      return 'gap-1';
  }
});
const valueSize = computed(() => {
  if (props.size === Size.xs || props.size === Size.xs2) {
    return 'h-4';
  } else {
    return 'h-5';
  }
});
const innerRadioClass = computed(() => (
  {
    'bg-primary-500': props.state === InputState.base,
    'bg-info-500': props.state === InputState.info,
    'bg-success-500': props.state === InputState.success,
    'bg-warning-500': props.state === InputState.warning,
    'bg-danger-500': props.state === InputState.danger,
    'h-3 w-3': props.size === Size.lg || props.size === Size.md || props.size === Size.sm,
    'h-2 w-2': props.size === Size.xs || props.size === Size.xs2,
  }
));

/**
 * Validate default value if given after delayed data fetching.
 */
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

function onBlur(e: FocusEvent) {
  emit('validate', props.modelValue);
  emit('blur', e);
}

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.state, InputState, 'state');

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
    :description="description"
    :state="state"
    class="cursor-pointer"
    :skeleton="skeleton"
    :size="size"
    :expanded="false"
    :messages="messages"
  >
    <div
      class="flex items-center"
      :class="gapSize"
    >
      <div class="relative full-height flex items-center">
        <div class="absolute flex items-center justify-center w-full h-full">
          <Transition name="fade-radio">
            <div
              v-if="isActive"
              class="rounded-full transition-all"
              :class="innerRadioClass"
            />
          </Transition>
        </div>

        <input
          v-model="_modelValue"
          :value="value.value"
          :class="inputClasses"
          type="radio"
          :aria-checked="isActive"
          :disabled="disabled || readonly"
          @blur="onBlur"
        />

        <AntSkeleton
          v-if="skeleton"
          absolute
          rounded-full
        />
      </div>

      <div
        class="relative flex items-center"
        :class="valueSize"
      >
        <span :class="valueClass">
          {{ value.label }}
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
.fade-radio-enter-active,
.fade-radio-leave-active {
  @apply transition-opacity;
}

.fade-radio-enter-from,
.fade-radio-leave-to {
  opacity: 0;
}
</style>
