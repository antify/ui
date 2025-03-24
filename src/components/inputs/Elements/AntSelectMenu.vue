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
  useElementSize, useVModel, onClickOutside,
} from '@vueuse/core';
import type {
  Validator,
} from '@antify/validate';
import {
  autoUpdate, flip, offset, useFloating,
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
}>(), {
  state: InputState.base,
  focusOnOpen: true,
  closeOnEnter: false,
  autoSelectFirstOnOpen: true,
  closeOnSelectItem: true,
});
const reference = ref<HTMLElement | null | undefined>(props.inputRef);
const elementSize = useElementSize(reference);
const floating = ref<HTMLElement | null>(null);
const {
  floatingStyles,
} = useFloating(reference, floating, {
  placement: 'bottom',
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(8),
    flip({
      fallbackPlacements: [
        'top',
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
    'w-full border flex flex-col gap-px outline-none -mt-px overflow-y-auto shadow-md z-[90] max-h-[250px]': true,
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
    'select-none text-ellipsis overflow-hidden whitespace-nowrap min-h-fit': true,
    [variants[props.state]]: true,
    // Size
    'p-1 text-xs': props.size === Size.xs2,
    'p-1.5 text-xs': props.size === Size.xs,
    'p-1.5 text-sm': props.size === Size.sm,
    'p-2 text-sm': props.size === Size.md,
    'p-2.5 text-sm': props.size === Size.lg,
  };
});

watch(isOpen, () => {
  nextTick(() => {
    if (props.autoSelectFirstOnOpen) {
      focusedDropDownItem.value =
        typeof _modelValue.value === 'string' || typeof _modelValue.value === 'number' ? _modelValue.value :
          Array.isArray(_modelValue.value) ? _modelValue.value[0] :
            props.options[0].value;
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
    const option = props.options[index + 1];

    if (index === -1) {
      focusedDropDownItem.value = props.options[0].value;
    } else if (option !== undefined) {
      focusedDropDownItem.value = option.value;
    }
  }

  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault();
    isOpen.value = true;

    const index = props.options.findIndex(option => option.value === focusedDropDownItem.value);
    const option = props.options[index - 1];

    if (option !== undefined) {
      focusedDropDownItem.value = option.value;
    }
  }

  if (e.key === 'Tab') {
    isOpen.value = false;
  }
}

function getActiveDropDownItemClasses(option: SelectOption) {
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

function onClickDropDownItem(e: MouseEvent, value: string | number | null) {
  e.preventDefault();
  reference.value?.focus();

  if (props.closeOnSelectItem) {
    isOpen.value = false;
  }

  emit('selectElement', value);
  _modelValue.value = value;
}

watch(_modelValue, (val) => {
  focusedDropDownItem.value = Array.isArray(val) ? val[0] : val;
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
        :class="dropdownClasses"
        data-e2e="select-menu"
        :style="{width: `${elementSize.width.value}px!important`, ...floatingStyles}"
      >
        <div
          v-for="(option, index) in options"
          :key="`option-${index}`"
          :class="{...dropDownItemClasses, ...getActiveDropDownItemClasses(option)}"
          @mousedown="(e) => onClickDropDownItem(e, option.value)"
          @mouseover="() => focusedDropDownItem = option.value"
        >
          {{ option.label }}
        </div>

        <div
          v-if="options.length === 0"
          :class="{...dropDownItemClasses}"
        >
          <slot name="empty">
            No options available
          </slot>
        </div>
      </div>
    </teleport>
  </div>
</template>
