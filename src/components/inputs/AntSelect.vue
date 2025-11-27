<script lang="ts" setup>
/**
 * This select is a custom component instead of a native <select> because the dropdown is not good
 * customizable with css.
 *
 * Known problem using a custom select instead of a native one:
 * - Label tags does not trigger the custom select by containing the select input or using the for attribute.
 * This means, this select is not usable in a custom field with multiple elements in there.
 * If the user clicks on the label, this select will not be focused.
 *
 * TODO:: add screen reader support
 * Fix overflow bug (See Ellipsis Text story)
 * TODO:: if the dropdown is open and the user types something, the element with a matching value should be focused.
 */
import AntField from '../forms/AntField.vue';
import {
  type SelectOption,
} from './__types/AntSelect.types';
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
import {
  vOnClickOutside,
} from '@vueuse/components';
import AntButton from '../AntButton.vue';
import {
  State, InputState,
} from '../../enums';
import {
  IconSize,
} from '../__types';
import AntSelectMenu from './Elements/AntSelectMenu.vue';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  modelValue: string | number | null;
  options: SelectOption[];
  label?: string;
  description?: string;
  placeholder?: string;
  size?: Size;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  skeleton?: boolean;
  nullable?: boolean;
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
  nullable: false,
  expanded: true,
  messages: () => [],
});
const emit = defineEmits([
  'update:modelValue',
  'blur',
  'validate',
]);
const isOpen = ref(false);
const _modelValue = computed({
  get: () => props.modelValue,
  set: (val: string | number | null) => {
    emit('update:modelValue', val);
  },
});
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);
const valueLabel = computed(() => props.options.find(option => option.value === _modelValue.value)?.label || null);
const selectedOption = computed(() => props.options.find(option => option.value === _modelValue.value) || null);
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
    [variants[props.state]]: true,
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
    'rounded-tr-none rounded-br-none': props.nullable && _modelValue.value !== null,
    // Disabled
    'opacity-50 cursor-not-allowed': props.disabled,
    // Option deleted
    'line-through': selectedOption.value?.isDeleted,
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
const skeletonGrouped = computed(() => {
  if (!props.nullable || (props.nullable && _modelValue.value === null)) {
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
const inputRef = ref<HTMLElement | null>(null);
const dropDownRef = ref<HTMLElement | null>(null);
const focusedDropDownItem = ref<string | number | null>(null);
// TODO:: Hotfix to prevent missing required prop warning. Fix it with https://github.com/antify/ui-module/issues/52
const dropDownFocused = ref(null);

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.state, InputState, 'state');
  handleEnumValidation(props.grouped, Grouped, 'grouped');

  focusedDropDownItem.value = _modelValue.value;

  if (!props.skeleton && props.modelValue !== null) {
    emit('validate', props.modelValue);
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
  if (isOpen.value) {
    return;
  }

  emit('validate', props.modelValue);
  emit('blur', e);
}

function onClickOutside() {
  if (!isOpen.value) {
    return;
  }

  isOpen.value = false;
  inputRef.value?.focus();
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

function onClickRemoveButton() {
  inputRef.value?.focus();
  _modelValue.value = null;
}
</script>

<template>
  <AntField
    data-e2e="select"
    :label="label"
    :size="size"
    :skeleton="skeleton"
    :description="description"
    :state="state"
    :class="wrapperClass"
    :expanded="expanded"
    :messages="messages"
    label-for="noop"
    @click-label="() => inputRef?.focus()"
  >
    <div
      class="h-fit flex flex-row w-full"
    >
      <div
        v-on-click-outside="onClickOutside"
        class="relative w-full"
        :class="{'cursor-pointer': !skeleton && !readonly}"
      >
        <input
          v-model="_modelValue"
          type="hidden"
          :name="name"
        >

        <!-- Dropdown -->
        <AntSelectMenu
          ref="dropDownRef"
          v-model="_modelValue"
          v-model:open="isOpen"
          v-model:focused="dropDownFocused"
          :options="(options || []).filter(option => !option.isDeleted)"
          :size="size"
          :state="state"
          :close-on-enter="true"
        >
          <template #contentLeft="props">
            <slot
              name="contentLeft"
              v-bind="{...props}"
            />
          </template>

          <template #contentRight="props">
            <slot
              name="contentRight"
              v-bind="{...props}"
            />
          </template>

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
                v-if="_modelValue === null && placeholder !== undefined"
                :class="placeholderClasses"
              >
                {{ placeholder }}
              </div>

              <div
                v-else-if="_modelValue === null && label !== undefined"
                :class="placeholderClasses"
              >
                {{ label }}
              </div>

              <div
                v-else
                class="flex items-center select-none overflow-hidden w-full"
                :class="{
                  'gap-1': size === Size.xs2,
                  'gap1.5': size === Size.xs,
                  'gap-1.5': size === Size.sm,
                  'gap-2': size === Size.md,
                  'gap-2.5': size === Size.lg,
                }"
              >
                <slot
                  v-if="selectedOption !== null"
                  name="contentLeft"
                  v-bind="selectedOption"
                />
                <div class="text-ellipsis overflow-hidden whitespace-nowrap w-full text-black">
                  {{ valueLabel }}
                </div>
                <slot
                  v-if="selectedOption !== null"
                  name="contentRight"
                  v-bind="selectedOption"
                />
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
        </AntSelectMenu>
      </div>

      <AntButton
        v-if="nullable && _modelValue !== null"
        data-e2e="clear-button"
        :icon-left="faMultiply"
        :state="state as unknown as State"
        :grouped="[Grouped.left, Grouped.center].some(item => item === grouped) ? Grouped.center : Grouped.right"
        :size="size"
        :skeleton="skeleton"
        :disabled="disabled"
        @click="onClickRemoveButton"
      />
    </div>
  </AntField>
</template>
