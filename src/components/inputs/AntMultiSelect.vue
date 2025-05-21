<script lang="ts" setup>
import AntField from '../forms/AntField.vue';
import {
  type MultiSelectOption,
} from './__types/AntMultiSelect.types';
import {
  computed, onMounted, ref, watch,
} from 'vue';
import {
  Size,
} from '../../enums/Size.enum';
import {
  handleEnumValidation,
} from '../../handler';
import {
  Grouped,
} from '../../enums/Grouped.enum';
import AntIcon from '../AntIcon.vue';
import {
  faChevronDown, faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import AntSkeleton from '../AntSkeleton.vue';
import AntDropdown from '../AntDropdown.vue';
import {
  State, InputState,
} from '../../enums';
import {
  IconSize,
} from '../__types';
import AntCheckboxGroup from './AntCheckboxGroup.vue';
import type {
  AntCheckboxType,
} from './__types/AntCheckbox.types';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  modelValue: string[] | null;
  options: MultiSelectOption[];
  label?: string;
  description?: string;
  placeholder?: string;
  size?: Size;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  skeleton?: boolean;
  grouped?: Grouped;
  name?: string;
  wrapperClass?: string | Record<string, boolean>;
  expanded?: boolean;
  messages?: string[];
}>(), {
  state: InputState.base,
  grouped: Grouped.none,
  size: Size.md,
  disabled: false,
  readonly: false,
  skeleton: false,
  expanded: true,
  messages: () => [],
});
const emit = defineEmits([
  'update:modelValue',
  'blur',
  'validate',
]);
const isOpen = ref(false);
const _modelValue = computed<string[]>(() => [
  ...props.modelValue || [],
]);
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);
const inputClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'outline-base-300 bg-white focus:ring-primary-200',
    [InputState.success]: 'outline-success-500 bg-success-100 focus:ring-success-200',
    [InputState.info]: 'outline-info-500 bg-info-100 focus:ring-info-200',
    [InputState.warning]: 'outline-warning-500 bg-warning-100 focus:ring-warning-200',
    [InputState.danger]: 'outline-danger-500  bg-danger-100 focus:ring-danger-200',
  };

  return {
    'flex items-center transition-colors border-none outline relative': true,
    'outline-offset-[-1px] outline-1 focus:outline-offset-[-1px] focus:outline-1': true,
    'w-full': props.expanded,
    [variants[props.state]]: true,
    'cursor-pointer': !props.skeleton && !props.readonly,
    // Skeleton
    invisible: props.skeleton,
    // Disabled
    'disabled:opacity-50 disabled:cursor-not-allowed': true,
    // Size
    'p-1 text-xs': props.size === Size.xs2,
    'p-1.5 text-xs': props.size === Size.xs,
    'p-1.5 text-sm': props.size === Size.sm,
    'p-2 text-sm': props.size === Size.md,
    'p-2.5 text-sm': props.size === Size.lg,
    'focus:ring-2': !hasInputState.value && (props.size === Size.sm || props.size === Size.xs || props.size === Size.xs2),
    'focus:ring-4': !hasInputState.value && (props.size === Size.lg || props.size === Size.md),
    // Grouped
    'rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none': props.grouped === Grouped.left,
    'rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md': props.grouped === Grouped.right,
    'rounded-none': props.grouped === Grouped.center,
    'rounded-md': props.grouped === Grouped.none,
    // Disabled
    'opacity-50 cursor-not-allowed': props.disabled,
  };
});
const placeholderClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'text-base-500',
    [InputState.success]: 'text-success-700',
    [InputState.info]: 'text-info-700',
    [InputState.warning]: 'text-warning-700',
    [InputState.danger]: 'text-danger-700',
  };

  return {
    'select-none text-ellipsis overflow-hidden whitespace-nowrap w-full': true,
    [variants[props.state]]: true,
  };
});
const arrowClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'text-for-white-bg-font',
    [InputState.success]: 'text-success-100-font',
    [InputState.info]: 'text-info-100-font',
    [InputState.warning]: 'text-warning-100-font',
    [InputState.danger]: 'text-danger-100-font',
  };

  return {
    [variants[props.state]]: true,
  };
});
const valueLabel = computed(() => {
  if (!_modelValue.value) {
    return;
  }

  if (_modelValue.value.length === 0) {
    return props.label || props.placeholder;
  }

  if (_modelValue.value.length === 1) {
    return `${_modelValue.value.length} item selected`;
  }

  return `${_modelValue.value.length} items selected`;
});
const skeletonGrouped = computed(() => {
  if (_modelValue.value === null) {
    return props.grouped;
  }

  if (props.grouped === Grouped.right || props.grouped === Grouped.center) {
    return Grouped.center;
  } else {
    return Grouped.left;
  }
});
const iconSize = computed(() => {
  if (props.size === Size.lg || props.size === Size.md || props.size === Size.sm) {
    return IconSize.sm;
  }

  return IconSize.xs;
});
const selectedCheckboxes = ref<string[]>( [
  ..._modelValue.value,
]);
const inputRef = ref<HTMLElement | null>(null);

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.state, InputState, 'state');
  handleEnumValidation(props.grouped, Grouped, 'grouped');

  if (!props.skeleton && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});

watch(isOpen, (val) => {
  if (!val) {
    emit('update:modelValue', selectedCheckboxes.value);
  }
});

/**
 * Validate default value if given after delayed data fetching.
 */
watch(() => props.skeleton, (val) => {
  if (!val && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});
watch(_modelValue, () => {
  if (props.messages.length > 0) {
    emit('validate', props.modelValue);
  }
});

function onBlur(e: FocusEvent) {
  emit('validate', props.modelValue);
  emit('blur', e);
}

function onClickSelectInput(e: MouseEvent) {
  e.preventDefault();

  if (props.disabled || props.readonly) {
    return;
  }

  if (isOpen.value) {
    inputRef.value?.focus();
  }

  isOpen.value = !isOpen.value;
}
</script>

<template>
  <AntField
    :label="label"
    :size="size"
    :skeleton="skeleton"
    :description="description"
    :state="state"
    :class="wrapperClass"
    :expanded="expanded"
    :messages="messages"
    label-for="noop"
    data-e2e="select"
    @click-label="() => inputRef?.focus()"
  >
    <AntDropdown
      v-model:show-dropdown="isOpen"
      :expanded="expanded"
      :content-padding="false"
    >
      <AntSkeleton
        :visible="skeleton"
        rounded
        :grouped="skeletonGrouped"
        class="w-full"
      >
        <!-- Input -->
        <div
          ref="inputRef"
          :class="inputClasses"
          :tabindex="disabled || readonly ? -1 : 0"
          v-bind="$attrs"
          @mousedown="onClickSelectInput"
          @click="() => inputRef?.focus()"
          @blur="onBlur"
        >
          <div
            v-if="(_modelValue === null || _modelValue.length === 0) && placeholder !== undefined"
            :class="placeholderClasses"
          >
            {{ placeholder }}
          </div>

          <div
            v-else-if="(_modelValue === null || _modelValue.length === 0) && label !== undefined"
            :class="placeholderClasses"
          >
            {{ label }}
          </div>

          <div
            v-else
            class="flex items-center select-none overflow-hidden w-full"
          >
            <slot name="value-label">
              <div class="text-ellipsis overflow-hidden whitespace-nowrap w-full text-black">
                {{ valueLabel }}
              </div>
            </slot>
          </div>

          <AntIcon
            v-if="isOpen"
            :icon="faChevronUp"
            :size="iconSize"
            :class="arrowClasses"
          />

          <AntIcon
            v-else
            :icon="faChevronDown"
            :size="iconSize"
            :class="arrowClasses"
          />
        </div>
      </AntSkeleton>

      <template #content>
        <div class="max-h-[500px] overflow-auto">
          <AntCheckboxGroup
            v-model="selectedCheckboxes"
            class="p-2"
            :checkboxes="options as AntCheckboxType[]"
          />
        </div>
      </template>
    </AntDropdown>
  </AntField>
</template>
