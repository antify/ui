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
  faChevronDown, faChevronUp, faMultiply,
} from '@fortawesome/free-solid-svg-icons';
import AntSkeleton from '../AntSkeleton.vue';
import AntDropdown from '../AntDropdown.vue';
import AntButton from '../AntButton.vue';
import {
  InputState,
} from '../../enums';
import {
  IconSize,
} from '../__types';
import AntCheckboxGroup from './AntCheckboxGroup.vue';
import type {
  AntCheckboxType,
} from './__types/AntCheckbox.types';
import {
  useVModel,
} from '@vueuse/core';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  modelValue: string[] | null;
  options: MultiSelectOption[];
  nullable?: boolean;
  label?: string;
  description?: string;
  placeholder?: string;
  size?: Size;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  skeleton?: boolean;
  grouped?: Grouped;
  singularValueLabel?: string;
  pluralValueLabel?: string;
  name?: string;
  wrapperClass?: string | Record<string, boolean>;
  expanded?: boolean;
  messages?: string[];
  inputRef?: HTMLInputElement | null;
}>(), {
  state: InputState.base,
  grouped: Grouped.none,
  size: Size.md,
  nullable: false,
  disabled: false,
  readonly: false,
  skeleton: false,
  expanded: true,
  singularValueLabel: 'item selected',
  pluralValueLabel: 'items selected',
  messages: () => [],
  inputRef: null,
});
const emit = defineEmits([
  'update:modelValue',
  'update:inputRef',
  'blur',
  'validate',
]);
const isOpen = ref(false);
const _modelValue = computed<string[]>(() => [
  ...props.modelValue || [],
]);
const _inputRef = useVModel(props, 'inputRef', emit);
let actuallyValueLength = ref<number>(0);

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
    'cursor-pointer': !props.skeleton && !props.readonly && !props.disabled,
    // Skeleton
    invisible: props.skeleton,
    // Disabled
    'disabled:opacity-50 disabled:cursor-not-allowed': props.disabled,
    // Size
    'p-1 gap-1 text-xs': props.size === Size.xs2,
    'p-1.5 gap-1.5 text-xs': props.size === Size.xs,
    'p-1.5 gap-1.5 text-sm': props.size === Size.sm,
    'p-2 gap-2 text-sm': props.size === Size.md,
    'p-2.5 gap-2.5 text-sm': props.size === Size.lg,
    'focus:ring-2': !hasInputState.value && (props.size === Size.sm || props.size === Size.xs || props.size === Size.xs2),
    'focus:ring-4': !hasInputState.value && (props.size === Size.lg || props.size === Size.md),
    // Grouped
    'rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none': props.grouped === Grouped.left ||
      props.nullable && props.modelValue && props.modelValue.length > 0,
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

  if (actuallyValueLength.value === 0) {
    return props.label || props.placeholder;
  }

  if (actuallyValueLength.value === 1) {
    return `${actuallyValueLength.value} ${props.singularValueLabel}`;
  }

  return `${actuallyValueLength.value} ${props.pluralValueLabel}`;
});
const iconSize = computed(() => {
  if (props.size === Size.lg || props.size === Size.md || props.size === Size.sm) {
    return IconSize.sm;
  }

  return IconSize.xs;
});
const selectedCheckboxes = ref<string[]>([
  ..._modelValue.value,
]);

watch(isOpen, (val) => {
  if (!val) {
    emit('update:modelValue', selectedCheckboxes.value);
  }
});

watch(() => props.modelValue, (val) => selectedCheckboxes.value = val as string[], {
  deep: true,
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
  getActuallySelectedItems();

  if (props.messages.length > 0) {
    emit('validate', props.modelValue);
  }
});
watch(() => props.options, () => getActuallySelectedItems());

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
    _inputRef.value?.focus();
  }

  isOpen.value = !isOpen.value;
}

function onClickClear() {
  const optionValues = props.options.map(option => option.value);
  const clearedValue = _modelValue.value.filter((value) => !optionValues.includes(value));

  emit('update:modelValue', clearedValue);
}

function getActuallySelectedItems() {
  actuallyValueLength.value = 0;

  _modelValue.value.forEach((value) => {
    props.options.forEach((option) => {
      if (value === option.value) {
        actuallyValueLength.value++;
      }
    });
  });
}

onMounted(() => {
  getActuallySelectedItems();
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.state, InputState, 'state');
  handleEnumValidation(props.grouped, Grouped, 'grouped');

  if (!props.skeleton && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});
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
    data-e2e="multi-select"
    @click-label="() => _inputRef?.focus()"
  >
    <AntDropdown
      v-model:show-dropdown="isOpen"
      :expanded="expanded"
      :content-padding="false"
    >
      <AntSkeleton
        :visible="skeleton"
        rounded
        :grouped="grouped"
        class="w-full"
      >
        <!-- Input -->
        <div class="flex">
          <div
            ref="_inputRef"
            :class="inputClasses"
            :tabindex="disabled || readonly ? -1 : 0"
            v-bind="$attrs"
            @mousedown="onClickSelectInput"
            @click="() => _inputRef?.focus()"
            @blur="onBlur"
          >
            <slot name="icon" />

            <div
              v-if="(_modelValue === null || actuallyValueLength === 0) && placeholder !== undefined"
              :class="placeholderClasses"
            >
              {{ placeholder }}
            </div>

            <div
              v-else-if="(_modelValue === null || actuallyValueLength === 0) && label !== undefined"
              :class="placeholderClasses"
            >
              {{ label }}
            </div>

            <div
              v-else
              class="flex items-center select-none overflow-hidden w-full"
            >
              <slot
                v-bind="props"
                name="value-label"
              >
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

          <AntButton
            v-if="props.nullable && props.modelValue && props.modelValue.length > 0"
            data-e2e="clear-button"
            :icon-left="faMultiply"
            :grouped="Grouped.right"
            :size="size"
            @click="onClickClear"
          />
        </div>
      </AntSkeleton>

      <template #content>
        <div class="max-h-[250px] overflow-auto">
          <AntCheckboxGroup
            v-model="selectedCheckboxes"
            class="p-2"
            :size="size"
            :checkboxes="options as AntCheckboxType[]"
          />
        </div>
      </template>
    </AntDropdown>
  </AntField>
</template>
