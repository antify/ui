<script setup lang="ts">
/**
 * This is the custom DropDown for each element (like select / tag-select)
 *
 * TODO:: add screen reader support
 * Fix overflow bug (See Ellipsis Text story)
 * TODO:: if the dropdown is open and the user types something, the element with a matching value should be focused.
 */

import {computed, nextTick, onMounted, onUnmounted, ref, watch} from 'vue';
import {InputState, Size} from '../../../enums';
import type {SelectOption} from '../__types';
import {useVModel} from '@vueuse/core';
import type {Validator} from '@antify/validate';

const emit = defineEmits(['update:open', 'update:modelValue', 'update:focused', 'selectElement']);
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
}>(), {
  state: InputState.base,
  focusOnOpen: true,
  closeOnEnter: false,
  autoSelectFirstOnOpen: true
});

const _modelValue = useVModel(props, 'modelValue', emit);
const isOpen = useVModel(props, 'open', emit);
const focusedDropDownItem = useVModel(props, 'focused', emit);

const dropdownClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'bg-neutral-300 border-neutral-300',
    [InputState.success]: 'bg-success-500 border-success-500',
    [InputState.info]: 'bg-info-500 border-info-500',
    [InputState.warning]: 'bg-warning-500 border-warning-500',
    [InputState.danger]: 'bg-danger-500 border-danger-500',
  };

  return {
    'absolute w-full border flex flex-col gap-px outline-none -mt-px overflow-hidden shadow-md z-40': true,
    'rounded-bl-md rounded-br-md': true,
    [variants[props.state]]: true,
    // Size
    'text-sm': props.size === Size.sm || props.size === Size.md
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
    'select-none text-ellipsis overflow-hidden whitespace-nowrap': true,
    [variants[props.state]]: true,
    // Size
    'p-1.5': props.size === Size.sm,
    'p-2': props.size === Size.md,
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
    props.inputRef?.addEventListener('keydown', onKeyDownDropDown);
  });
});

onUnmounted(() => {
  props.inputRef?.removeEventListener('keydown', onKeyDownDropDown);
});

function onKeyDownDropDown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    if (props.closeOnEnter) {
      isOpen.value = false;
    }

    emit('selectElement', focusedDropDownItem.value);
  }

  if (e.key === 'Escape') {
    isOpen.value = false;
  }

  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
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
    [InputState.base]: 'bg-neutral-50/25',
    [InputState.success]: 'bg-success-100/25',
    [InputState.info]: 'bg-info-100/25',
    [InputState.warning]: 'bg-warning-100/25',
    [InputState.danger]: 'bg-danger-100/25',
  };

  return option.value === focusedDropDownItem.value ? {[variants[props.state]]: true} : {};
}

function onClickDropDownItem(e: MouseEvent, value: string | number | null) {
  e.preventDefault();
  props.inputRef?.focus();

  isOpen.value = false;
  emit('selectElement', value);
  _modelValue.value = value;
}

watch(_modelValue, (val) => {
  focusedDropDownItem.value = Array.isArray(val) ? val[0] : val;
});
</script>

<template>
  <div
    v-if="isOpen"
    :class="dropdownClasses"
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
</template>
