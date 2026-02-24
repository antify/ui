<script setup lang="ts">
/**
 * This is the custom DropDown for each element (like select / tag-select)
 *
 * TODO:: add screen reader support
 * Fix overflow bug (See Ellipsis Text story)
 * TODO:: if the dropdown is open and the user types something, the element with a matching value should be focused.
 */
import {
  computed, nextTick, onMounted, onUnmounted, ref, watch,
} from 'vue';
import {
  InputState, Size,
} from '../../../enums';
import type {
  SelectOption,
} from '../__types';
import {
  onClickOutside, useElementSize, useVModel,
} from '@vueuse/core';
import type {
  Validator,
} from '@antify/validate';
import {
  autoPlacement, autoUpdate, flip, offset, useFloating,
} from '@floating-ui/vue';

const emit = defineEmits([
  'update:open',
  'update:modelValue',
  'update:focused',
  'selectElement',
]);
const props = withDefaults(defineProps<{
  modelValue: string | string[] | number | number[] | null;
  focused: string | number | null;
  open: boolean;
  options: SelectOption[];
  state?: InputState;
  validator?: Validator;
  size?: Size;
  inputRef?: HTMLElement | null;
  closeOnEnter?: boolean;
  autoSelectFirstOnOpen?: boolean;
  closeOnSelectItem?: boolean;
  maxHeight?: string;
}>(), {
  state: InputState.base,
  focusOnOpen: true,
  closeOnEnter: false,
  autoSelectFirstOnOpen: true,
  closeOnSelectItem: true,
  maxHeight: '350px',
});
const reference = ref<HTMLElement | null | undefined>(props.inputRef);
const elementSize = useElementSize(reference);
const floating = ref<HTMLElement | null>(null);
const {
  floatingStyles,
} = useFloating(reference, floating, {
  placement: 'bottom-start',
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(8),
    flip({
      fallbackPlacements: [
        'top-start',
      ],
    }),
  ],
});

onClickOutside(floating, () => {
  if (!props.open) {
    return;
  }

  emit('update:open', false);
});

const _modelValue = useVModel(props, 'modelValue', emit);
const isOpen = useVModel(props, 'open', emit);
const focusedDropDownItem = useVModel(props, 'focused', emit);
const dropdownClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'bg-base-300 border-base-300',
    [InputState.success]: 'bg-success-500 border-success-500',
    [InputState.info]: 'bg-info-500 border-info-500',
    [InputState.warning]: 'bg-warning-500 border-warning-500',
    [InputState.danger]: 'bg-danger-500 border-danger-500',
  };

  return {
    'w-fit border outline-none -mt-px overflow-y-auto shadow-md z-[90] max-h-[250px]': true,
    'rounded-md': true,
    [variants[props.state]]: true,
  };
});
const dropDownItemClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'bg-white text-for-white-bg-font',
    [InputState.success]: 'bg-success-100 border-success-100-font',
    [InputState.info]: 'bg-info-100 border-info-100-font',
    [InputState.warning]: 'bg-warning-100 border-warning-100-font',
    [InputState.danger]: 'bg-danger-100 border-danger-100-font',
  };

  return {
    'flex items-center select-none text-ellipsis overflow-hidden whitespace-nowrap min-h-fit': true,
    [variants[props.state]]: true,
    // Size
    'p-1 text-xs gap-1': props.size === Size.xs2,
    'p-1.5 text-xs gap1.5': props.size === Size.xs,
    'p-1.5 text-sm gap-1.5': props.size === Size.sm,
    'p-2 text-sm gap-2': props.size === Size.md,
    'p-2.5 text-sm gap-2.5': props.size === Size.lg,
  };
});

watch(isOpen, () => {
  nextTick(() => {
    if (props.autoSelectFirstOnOpen) {
      focusedDropDownItem.value =
        typeof _modelValue.value === 'string' || typeof _modelValue.value === 'number' ? _modelValue.value :
          Array.isArray(_modelValue.value) ? _modelValue.value[0] :
            (props.options[0]?.value || null);
    } else {
      focusedDropDownItem.value = null;
    }
  });
});

onMounted(() => {
  nextTick(() => {
    reference.value?.addEventListener('keydown', onKeyDownDropDown);
  });
});

onUnmounted(() => {
  reference.value?.removeEventListener('keydown', onKeyDownDropDown);
});

/**
 * Get the next focusable select option.
 * It skips group labels and goes to beginning of the list if it reaches the end.
 *
 * @param currentOptionIndex
 */
function getNextFocusableSelectOption(currentOptionIndex: number): number | null {
  for (let i = currentOptionIndex + 1; i < props.options.length; i++) {
    if (!props.options[i].isGroupLabel) {
      return i;
    }
  }

  // If no next option is found, return the first option, but make sure
  // to skip group labels again.
  for (let i = 0; i < props.options.length; i++) {
    if (!props.options[i].isGroupLabel) {
      return i;
    }
  }

  // Seems that the option list is empty or all options are group labels.
  return null;
}

/**
 * Get the prev focusable select option.
 * It skips group labels and goes to end of the list if it reaches the end.
 *
 * @param currentOptionIndex
 */
function getPrevFocusableSelectOption(currentOptionIndex: number): number | null {
  for (let i = currentOptionIndex - 1; i >= 0; i--) {
    if (!props.options[i].isGroupLabel) {
      return i;
    }
  }

  // If no previous option is found, return the last option, but make sure
  // to skip group labels again.
  for (let i = props.options.length - 1; i >= 0; i--) {
    if (!props.options[i].isGroupLabel) {
      return i;
    }
  }

  // Seems that the option list is empty or all options are group labels.
  return null;
}

function onKeyDownDropDown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    if (props.closeOnEnter) {
      isOpen.value = false;
    }

    if (!isOpen.value) {
      isOpen.value = true;
    }

    emit('selectElement', focusedDropDownItem.value);
  }

  if (e.key === 'Escape') {
    isOpen.value = false;
  }

  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    e.preventDefault();
    isOpen.value = true;

    const index = props.options.findIndex(option => option.value === focusedDropDownItem.value);
    const nextOptionIndex = getNextFocusableSelectOption(index);

    if (nextOptionIndex !== null) {
      focusedDropDownItem.value = props.options[nextOptionIndex].value || null;
      _modelValue.value = props.options[nextOptionIndex].value || null;
    }
  }

  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault();
    isOpen.value = true;

    const index = props.options.findIndex(option => option.value === focusedDropDownItem.value);
    const prevOptionIndex = getPrevFocusableSelectOption(index);

    if (prevOptionIndex !== null) {
      focusedDropDownItem.value = props.options[prevOptionIndex].value || null;
      _modelValue.value = props.options[prevOptionIndex].value || null;
    }
  }

  if (e.key === 'Tab') {
    isOpen.value = false;
  }
}

function getActiveDropDownItemClasses(option: SelectOption) {
  if (option.isGroupLabel) {
    return {};
  }

  const variants: Record<InputState, string> = {
    [InputState.base]: '!bg-base-100',
    [InputState.success]: 'bg-success-200',
    [InputState.info]: 'bg-info-200',
    [InputState.warning]: 'bg-warning-200',
    [InputState.danger]: 'bg-danger-200',
  };

  return option.value === focusedDropDownItem.value ? {
    'bg-white': false,
    [variants[props.state]]: true,
  } : {};
}

function onClickDropDownItem(e: MouseEvent, option: SelectOption) {
  e.preventDefault();

  if (option.isGroupLabel) {
    return;
  }

  reference.value?.focus();

  if (props.closeOnSelectItem) {
    isOpen.value = false;
  }

  emit('selectElement', option.value);
  _modelValue.value = option.value || null;
}

watch(_modelValue, (val) => {
  focusedDropDownItem.value = Array.isArray(val) ? val[0] : val;
});

defineExpose({
  floating,
});
</script>

<template>
  <div
    ref="reference"
    class="relative"
  >
    <slot />

    <teleport to="body">
      <div
        v-if="isOpen"
        ref="floating"
        :class="[
          dropdownClasses,
          'flex flex-col overflow-hidden'
        ]"
        :style="{
          minWidth: `${elementSize.width.value}px`,
          maxHeight: props.maxHeight,
          ...floatingStyles}"
        data-e2e="select-menu"
        :data-e2e-state="state"
      >
        <div
          v-if="$slots.contentBefore"
          class="flex-shrink-0 z-30"
        >
          <slot name="contentBefore" />
        </div>

        <div class="flex-grow overflow-y-auto min-h-0">
          <div class="flex flex-col gap-px">
            <div
              v-for="(option, index) in options"
              :key="`option-${index}`"
              data-e2e="select-menu-item"
              :class="{
                ...dropDownItemClasses,
                ...getActiveDropDownItemClasses(option),
                'font-bold': option.isGroupLabel,
                'sticky top-0 z-20 border-base-300 font-bold': option.isGroupLabel,
                'cursor-pointer': !option.isGroupLabel
              }"
              @click="(e) => onClickDropDownItem(e, option)"
              @mouseover="() => focusedDropDownItem = !option.isGroupLabel && option.value !== undefined ? option.value : null"
            >
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center gap-2">
                  <slot
                    name="contentLeft"
                    v-bind="option"
                  />
                  <span>{{ option.label }}</span>
                </div>

                <div
                  v-if="option.tag"
                >
                  <span class="px-1 py-0.5 rounded bg-base-200 text-[12px]">
                    {{ option.tag }}
                  </span>
                </div>

                <slot
                  name="contentRight"
                  v-bind="option"
                />
              </div>
            </div>
          </div>

          <div
            v-if="options.length === 0"
            :class="[
              dropDownItemClasses,
              {
                'flex items-center justify-center p-2 pt-2 bg-white font-medium italic text-center': $slots.contentBefore
              }
            ]"
          >
            <slot name="empty">
              Keine Einträge vorhanden
            </slot>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>
