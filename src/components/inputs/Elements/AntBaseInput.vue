<script lang="ts" setup>
import {computed, onMounted, watch, useSlots} from 'vue';
import {Size} from '../../../enums/Size.enum';
import AntSkeleton from '../../AntSkeleton.vue';
import AntIcon from '../../AntIcon.vue';
import {BaseInputType} from './__types/AntBaseInput.types';
import {Grouped} from '../../../enums/Grouped.enum';
import {
  faCircleCheck,
  faCircleInfo,
  faExclamationCircle,
  faExclamationTriangle,
  faXmark,
  type IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import {handleEnumValidation} from '../../../handler';
import {classesToObjectSyntax, hasSlotContent} from '../../../utils';
import {InputState} from '../../../enums';
import {IconSize} from '../../__types';

defineOptions({inheritAttrs: false});

const emit = defineEmits(['update:modelValue', 'blur', 'validate', 'update:inputRef']);
const props = withDefaults(defineProps<{
  modelValue: string | number | null;
  size?: Size;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  skeleton?: boolean;
  type?: BaseInputType;
  grouped?: Grouped;
  wrapperClass?: string | Record<string, boolean>;
  showIcon?: boolean;
  iconLeft?: IconDefinition;
  nullable?: boolean;
  inputRef?: null | HTMLInputElement;
}>(), {
  state: InputState.base,
  disabled: false,
  readonly: false,
  size: Size.md,
  skeleton: false,
  type: BaseInputType.text,
  grouped: Grouped.none,
  showIcon: true,
  default: false,
  nullable: false,
  inputRef: null
});
const slot = useSlots();
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);
const icons = {
  [InputState.info]: faCircleInfo,
  [InputState.warning]: faExclamationTriangle,
  [InputState.danger]: faExclamationCircle,
  [InputState.success]: faCircleCheck,
  [InputState.base]: null,
};
const inputClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'outline-base-300 focus:ring-primary-200 bg-white placeholder:text-base-500',
    [InputState.danger]: 'outline-danger-500 focus:ring-danger-200 bg-danger-100 placeholder:text-danger-700',
    [InputState.info]: 'outline-info-500 focus:ring-info-200 bg-info-100 placeholder:text-info-700',
    [InputState.success]: 'outline-success-500 focus:ring-success-200 bg-success-100 placeholder:text-success-700',
    [InputState.warning]: 'outline-warning-500 focus:ring-warning-200 bg-warning-100 placeholder:text-warning-700',
  };

  return {
    'block transition-colors relative border-none outline w-full text-black font-regular': true,
    'outline-offset-[-1px] outline-1 focus:outline-offset-[-1px] focus:outline-1': true,
    'disabled:opacity-50 disabled:cursor-not-allowed': props.disabled,
    'text-right': props.type === BaseInputType.number,
    [variants[props.state]]: true,
    // Size
    'p-1 text-xs': props.size === Size.xs2,
    'p-1.5 text-xs': props.size === Size.xs,
    'p-1.5 text-sm': props.size === Size.sm,
    'p-2 text-sm': props.size === Size.md,
    'p-2.5 text-sm': props.size === Size.lg,
    'focus:ring-2': !hasInputState.value && (props.size === Size.sm || props.size === Size.xs || props.size === Size.xs2),
    'focus:ring-4': !hasInputState.value && (props.size === Size.lg || props.size === Size.md),

    // Icon left
    'pl-6': props.size === Size.xs2 && props.iconLeft,
    'pl-7': props.size === Size.sm && props.iconLeft || props.size === Size.xs && props.iconLeft,
    'pl-8': props.size === Size.md && props.iconLeft,
    'pl-9': props.size === Size.lg && props.iconLeft,
    // Icon right
    'pr-6': props.size === Size.xs2 && props.showIcon && icon.value ||
      props.size === Size.xs2 && props.nullable ||
      props.size === Size.xs2 && hasSlotContent(slot['icon-right']),
    'pr-7': props.size === Size.xs && props.showIcon && icon.value ||
      props.size === Size.xs && props.nullable ||
      props.size === Size.xs && hasSlotContent(slot['icon-right']),
    'pr-8': props.size === Size.sm && props.showIcon && icon.value ||
      props.size === Size.sm && props.nullable ||
      props.size === Size.sm && hasSlotContent(slot['icon-right']),
    'pr-9': props.size === Size.md && props.showIcon && icon.value ||
      props.size === Size.md && props.nullable ||
      props.size === Size.md && hasSlotContent(slot['icon-right']),
    'pr-10': props.size === Size.lg && props.showIcon && icon.value ||
      props.size === Size.lg && props.nullable ||
      props.size === Size.lg && hasSlotContent(slot['icon-right']),
    // Grouped
    'rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none': props.grouped === Grouped.left,
    'rounded-none': props.grouped === Grouped.center,
    'rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md': props.grouped === Grouped.right,
    'rounded-md': props.grouped === Grouped.none,
    'invisible': props.skeleton,
  };
});
const iconClasses = computed(() => ({
  'transition-[height]': true,
  'opacity-50': props.disabled
}));
const iconColorClass = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'text-for-white-bg-font',
    [InputState.danger]: 'text-danger-700',
    [InputState.info]: 'text-info-700',
    [InputState.success]: 'text-success-700',
    [InputState.warning]: 'text-warning-700',
  };

  return variants[props.state];
});
const _wrapperClass = computed(() => ({
  '-mr-px': props.grouped !== Grouped.none,
  'cursor-not-allowed': props.disabled,
  ...classesToObjectSyntax(props.wrapperClass)
}));
const icon = computed(() => icons[props.state]);
const _modelValue = computed<string | number | null>({
  get: () => props.modelValue,
  set: (val: string | number | null) => {
    if (props.type === BaseInputType.number && typeof val !== 'number') {
      return emit('update:modelValue', null);
    }

    emit('update:modelValue', val);
  },
});
const inputIconSize = computed(() => {
  if (props.size === Size.xs || props.size === Size.xs2) {
    return IconSize.xs;
  }

  return IconSize.sm;
});
const _inputRef = computed({
  get() {
    return props.inputRef;
  },
  set(val) {
    emit('update:inputRef', val);
  }
});

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

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.state, InputState, 'state');
  handleEnumValidation(props.type, BaseInputType, 'type');
  handleEnumValidation(props.grouped, Grouped, 'grouped');

  /**
   * Validate default value without delayed data fetching.
   */
  if (!props.skeleton && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});

function onBlur(e: FocusEvent) {
  emit('validate', props.modelValue);
  emit('blur', e);
}

function onClickClearIcon() {
  if (!props.disabled) {
    _modelValue.value = null;
  }
}
</script>

<template>
  <div
    class="block relative w-full h-fit"
    :class="_wrapperClass"
  >
    <div
      v-if="iconLeft"
      class="absolute h-full flex items-center justify-center z-20"
      :class="{
        'w-6': size === Size.xs2,
        'w-7': size === Size.sm,
        'w-8': size === Size.xs,
        'w-9': size === Size.md,
        'w-10': size === Size.lg,
        'opacity-50': disabled,
      }"
    >
      <AntIcon
        :icon="iconLeft"
        :size="inputIconSize"
        color="text-for-white-bg-font"
      />
    </div>

    <input
      ref="_inputRef"
      v-model="_modelValue"
      :class="inputClasses"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled || skeleton"
      :readonly="readonly"
      :tabindex="hasInputState ? -1 : 0"
      title=""
      v-bind="$attrs"
      @blur="onBlur"
    >

    <div
      v-if="(nullable && _modelValue !== null && _modelValue !== '') || (showIcon && icon) || hasSlotContent(slot['icon-right'])"
      class="absolute h-full flex items-center justify-center right-0 top-0 transition-all z-20"
      :class="{'w-6': size === Size.xs2, 'w-7': size === Size.xs, 'w-8': size === Size.sm, 'w-9': size === Size.md, 'w-10': size === Size.lg}"
    >
      <slot name="icon-right">
        <AntIcon
          v-if="nullable && _modelValue !== null && _modelValue !== ''"
          :icon="faXmark"
          :class="{'cursor-pointer': !disabled, ...iconClasses}"
          :color="iconColorClass"
          :size="inputIconSize"
          @click="() => onClickClearIcon()"
        />

        <AntIcon
          v-else-if="showIcon && icon"
          :icon="icon"
          :color="iconColorClass"
          :class="iconClasses"
          :size="inputIconSize"
        />
      </slot>
    </div>

    <AntSkeleton
      v-if="skeleton"
      absolute
      :grouped="grouped"
      rounded
    />
  </div>
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

/* clears the "X" from Internet Explorer */
input[type=search]::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}

input[type=search]::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}

/* clears the "X" from Chrome */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}

/* Remove calendar icon in Chrome */
input[type="date"]::-webkit-datetime-edit-fields-wrapper,
input[type="datetime-local"]::-webkit-datetime-edit-fields-wrapper,
input[type="month"]::-webkit-datetime-edit-fields-wrapper,
input[type="time"]::-webkit-datetime-edit-fields-wrapper,
input[type="week"]::-webkit-datetime-edit-fields-wrapper {
  padding: 0;
}

input[type="date"]::-webkit-calendar-picker-indicator,
input[type="datetime-local"]::-webkit-calendar-picker-indicator,
input[type="month"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator,
input[type="week"]::-webkit-calendar-picker-indicator {
  display: none;
}
</style>
