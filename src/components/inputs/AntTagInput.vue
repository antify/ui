<script setup lang="ts">
import {
  AntField,
} from './Elements';
import type {
  SelectOption,
} from './__types';
import {
  Grouped, InputState, Size, State,
} from '../../enums';
import {
  useVModel,
} from '@vueuse/core';
import {
  faChevronRight, faMultiply, type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  computed, onMounted, nextTick, type Ref, ref, watch,
} from 'vue';
import AntTag from '../AntTag.vue';
import AntIcon from '../AntIcon.vue';
import AntButton from '../AntButton.vue';
import {
  AntTagSize, IconSize,
} from '../__types';
import AntSelectMenu from './Elements/AntSelectMenu.vue';
import AntSkeleton from '../AntSkeleton.vue';
import {
  AntTagInputSize,
} from './__types/AntTagInput.types';
import type {
  TagState,
} from '../__types/AntTag.types';

const emit = defineEmits([
  'update:modelValue',
  'update:inputRef',
  'update:open',
  'blur',
  'validate',
  'create-tag',
]);

const props = withDefaults(defineProps<{
  modelValue: (string | number)[] | null;
  options: SelectOption[];
  label?: string;
  description?: string;
  placeholder?: string;
  size?: AntTagInputSize;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  skeleton?: boolean;
  name?: string;
  expanded?: boolean;
  icon?: IconDefinition;
  grouped?: Grouped;
  nullable?: boolean;
  messages?: string[];
  allowCreate?: boolean;
  allowDuplicates?: boolean;
  openOnFocus?: boolean;
  autoCloseAfterSelection?: boolean;
  createCallback?: (item: string) => Promise<SelectOption>;
  inputRef?: HTMLInputElement | null;
  dropDownMaxHeight?: string;
  open?: boolean;
  allOptions?: SelectOption[];
  maxTagsHeight?: string;
}>(), {
  size: AntTagInputSize.md,
  state: InputState.base,
  icon: () => faChevronRight,
  messages: () => [],
  grouped: Grouped.none,
  allowCreate: false,
  allowDuplicates: false,
  openOnFocus: true,
  readonly: false,
  disabled: false,
  skeleton: false,
  autoCloseAfterSelection: false,
  placeholder: 'Add new tag',
  inputRef: null,
  dropDownMaxHeight: '350px',
  open: false,
  maxTagsHeight: undefined,
});

const _modelValue: Ref<(string | number)[] | null> = useVModel(props, 'modelValue', emit);
const _skeleton = useVModel(props, 'skeleton', emit);
const _open = useVModel(props, 'open', emit, {
  passive: true,
  defaultValue: false,
});
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);
const focusedDropDownItem: Ref<string | number | null> = ref(null);
const tagInput = ref('');
const internalInputRef = ref<HTMLInputElement | null>(null);
const _inputRef = useVModel(props, 'inputRef', emit);
const _isNullableActive = computed(() => props.nullable && !props.readonly && Array.isArray(_modelValue.value) && _modelValue.value.length > 0);

const localCreatedOptions = ref<SelectOption[]>([]);

const allAvailableOptions = computed(() => {
  const baseOptions = props.options || [];
  const extraCreated = localCreatedOptions.value.filter((createdOpt) => !baseOptions.some((opt) => opt.value === createdOpt.value));

  return [
    ...baseOptions,
    ...extraCreated,
  ];
});

const mergedAllOptions = computed(() => {
  const base = props.allOptions || allAvailableOptions.value;
  const extraCreated = localCreatedOptions.value.filter((createdOpt) => !base.some((opt) => opt.value === createdOpt.value));

  return [
    ...base,
    ...extraCreated,
  ];
});

const inputContainerClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'outline-base-300 focus-within:outline-base-300 focus-within:ring-primary-200 bg-white',
    [InputState.danger]: 'outline-danger-500 focus-within:outline-danger-500 focus-within:ring-danger-200 bg-danger-100',
    [InputState.info]: 'outline-info-500 focus-within:outline-info-500 focus-within:ring-info-200 bg-info-100',
    [InputState.success]: 'outline-success-500 focus-within:outline-success-500 focus-within:ring-success-200 bg-success-100',
    [InputState.warning]: 'outline-warning-500 focus-within:outline-warning-500 focus-within:ring-warning-200 bg-warning-100',
  };

  return {
    'flex items-center': true,
    'transition-colors relative border-none outline w-full focus-within:z-10': true,
    'outline-offset-[-1px] outline-1 focus-within:outline-offset-[-1px] focus-within:outline-1': true,
    'opacity-50 cursor-not-allowed': props.disabled,
    [variants[props.state]]: true,
    // AntTagInputSize
    'p-1.5 text-sm': props.size === AntTagInputSize.sm,
    'p-2 text-sm': props.size === AntTagInputSize.md,
    'p-2.5 text-sm': props.size === AntTagInputSize.lg,
    'focus-within:ring-2': !hasInputState.value && props.size === AntTagInputSize.sm,
    'focus-within:ring-4': !hasInputState.value && (props.size === AntTagInputSize.lg || props.size === AntTagInputSize.md),
    // Grouping
    'rounded-tl-md rounded-bl-md rounded-tr-none rounded-br-none': props.grouped === Grouped.left,
    'rounded-none': props.grouped === Grouped.center,
    'rounded-tl-none rounded-bl-none rounded-tr-md rounded-br-md': props.grouped === Grouped.right,
    'rounded-md': props.grouped === Grouped.none,
    'rounded-tr-none rounded-br-none': _isNullableActive.value,
    invisible: props.skeleton,
  };
});

const inputClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'placeholder:text-base-500',
    [InputState.danger]: 'placeholder:text-danger-700',
    [InputState.info]: 'placeholder:text-info-700',
    [InputState.success]: 'placeholder:text-success-700',
    [InputState.warning]: 'placeholder:text-warning-700',
  };

  return {
    'outline-0 bg-transparent w-full min-w-0': true,
    'opacity-50 cursor-not-allowed': props.disabled,
    'cursor-default': props.readonly,
    [variants[props.state]]: true,
  };
});

const skeletonGrouped = computed(() => {
  if (!_isNullableActive.value) {
    return props.grouped;
  }

  if (props.grouped === Grouped.right || props.grouped === Grouped.center) {
    return Grouped.center;
  } else {
    return Grouped.left;
  }
});

const filteredOptions = computed(() => {
  const searchTerm = tagInput.value.toLowerCase();

  return allAvailableOptions.value.filter(option => {
    if (option.isDeleted) {
      return false;
    }

    if (!props.allowDuplicates && _modelValue.value?.includes(option.value)) {
      return false;
    }

    return option.label.toLowerCase().includes(searchTerm);
  });
});

function onClickOutside() {
  if (!_open.value) {
    return;
  }

  _open.value = false;
}

function handleContainerClick() {
  if (props.disabled || props.readonly) {
    return;
  }

  _open.value = true;
  internalInputRef.value?.focus();
}

async function checkCreateTag(item: string): Promise<void> {
  const trimmed = item.trim();

  if (!trimmed || !props.allowCreate) {
    return;
  }

  const existingOption = allAvailableOptions.value.find((opt) => opt.label.toLowerCase() === trimmed.toLowerCase() || String(opt.value).toLowerCase() === trimmed.toLowerCase());

  if (existingOption) {
    if (!props.allowDuplicates && _modelValue.value?.includes(existingOption.value)) {
      tagInput.value = '';

      return;
    }

    addTag(existingOption.value);

    if (props.autoCloseAfterSelection) {
      _open.value = false;
    }

    nextTick(() => {
      internalInputRef.value?.focus();
    });

    return;
  }

  if (!props.allowDuplicates && _modelValue.value && _modelValue.value.length > 0) {
    const isAlreadySelected = _modelValue.value.some((val) => {
      const opt = mergedAllOptions.value.find((o) => o.value === val);

      return opt ? opt.label.toLowerCase() === trimmed.toLowerCase() : String(val).toLowerCase() === trimmed.toLowerCase();
    });

    if (isAlreadySelected) {
      tagInput.value = '';

      return;
    }
  }

  let newOption: SelectOption;

  if (props.createCallback) {
    newOption = await props.createCallback(trimmed);
  } else {
    newOption = {
      label: trimmed,
      value: trimmed,
    };
  }

  if (!props.allowDuplicates && _modelValue.value?.includes(newOption.value)) {
    tagInput.value = '';

    return;
  }

  if (!localCreatedOptions.value.some((opt) => opt.value === newOption.value)) {
    localCreatedOptions.value.push(newOption);
  }

  emit('create-tag', newOption);

  addTag(newOption.value);

  if (props.autoCloseAfterSelection) {
    _open.value = false;
  }

  nextTick(() => {
    internalInputRef.value?.focus();
  });
}

function addTagFromOptions(item: string | number) {
  const option = allAvailableOptions.value?.find((opt) => opt.value === item);

  if (option) {
    const currentIndex = filteredOptions.value.findIndex((opt) => opt.value === item);

    addTag(item);

    nextTick(() => {
      if (filteredOptions.value.length > 0) {
        const nextIndex = Math.min(Math.max(currentIndex, 0), filteredOptions.value.length - 1);

        focusedDropDownItem.value = filteredOptions.value[nextIndex]?.value ?? null;
      } else {
        focusedDropDownItem.value = null;
      }
    });

    if (props.autoCloseAfterSelection) {
      _open.value = false;
    }

    nextTick(() => {
      internalInputRef.value?.focus();
    });
  }
}

function addTag(tagValue: string | number): void {
  if (props.readonly || props.disabled) {
    return;
  }

  if ((!props.allowDuplicates && _modelValue.value?.includes(tagValue)) || !tagValue) {
    return;
  }

  if (Array.isArray(_modelValue.value)) {
    _modelValue.value = [
      ..._modelValue.value,
      tagValue,
    ];
  } else {
    _modelValue.value = [
      tagValue,
    ];
  }

  tagInput.value = '';
}

function removeLastTag() {
  if (props.readonly || props.disabled) {
    return;
  }

  if (tagInput.value === '' && Array.isArray(_modelValue.value) && _modelValue.value.length > 0) {
    _modelValue.value = _modelValue.value.slice(0, -1);
  }
}

function removeTag(tag: string | number) {
  if (_modelValue.value && !props.disabled && !props.skeleton && !props.readonly) {
    _modelValue.value = _modelValue.value.filter((element) => element !== tag);

    nextTick(() => {
      internalInputRef.value?.focus();
    });
  }
}

function onClickRemoveButton() {
  if (!props.disabled && !props.readonly) {
    _modelValue.value = null;
    tagInput.value = '';

    emit('validate', _modelValue.value);
    nextTick(() => {
      internalInputRef.value?.focus();
    });
  }
}

function changeFocus() {
  if (!props.readonly && !props.disabled) {
    _open.value = true;
  }
}

function closeDropdown() {
  _open.value = false;
}

function onBlur(e: FocusEvent) {
  emit('validate', props.modelValue);
  emit('blur', e);
}

function handleEnter(e: KeyboardEvent) {
  e.stopImmediatePropagation();

  if (props.readonly || props.disabled) {
    return;
  }

  if (!_open.value) {
    _open.value = true;

    return;
  }

  if (props.allowCreate && !focusedDropDownItem.value) {
    checkCreateTag(tagInput.value);
  } else if (focusedDropDownItem.value !== null && focusedDropDownItem.value !== undefined) {
    addTagFromOptions(focusedDropDownItem.value);
  }
}

function onKeyDownInput(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.stopImmediatePropagation();
  }
}

watch(() => props.skeleton, (val) => {
  if (!val && props.modelValue !== null) {
    emit('validate', props.modelValue);
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

watch(internalInputRef, (el) => {
  _inputRef.value = el;
}, {
  immediate: true,
});

watch(filteredOptions, (newOptions) => {
  if (newOptions.length > 0) {
    const exists = newOptions.some((opt) => opt.value === focusedDropDownItem.value);

    if (!exists) {
      if (!props.allowCreate) {
        focusedDropDownItem.value = newOptions[0]?.value ?? null;
      } else if (tagInput.value !== '') {
        focusedDropDownItem.value = null;
      }
    }
  } else {
    focusedDropDownItem.value = null;
  }
}, {
  immediate: true,
});

onMounted(() => {
  if (!props.skeleton && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});
</script>

<template>
  <div>
    <AntField
      :label="label"
      :size="size as unknown as Size"
      :skeleton="_skeleton"
      :description="description"
      :state="state"
      :expanded="expanded"
      :messages="messages"
      label-for="noop"
      data-e2e="tag-input"
      @click-label="handleContainerClick"
    >
      <div class="h-fit flex flex-row w-full">
        <div class="relative w-full">
          <AntSelectMenu
            v-model:open="_open"
            v-model:focused="focusedDropDownItem"
            :model-value="null"
            :auto-select-first-on-open="!allowCreate"
            :options="filteredOptions"
            :input-ref="internalInputRef"
            :size="size as unknown as Size"
            :state="state"
            :max-height="dropDownMaxHeight"
            :focus-on-open="false"
            :close-on-select-item="false"
            @select-element="addTagFromOptions"
            @click-outside="onClickOutside"
          >
            <template #contentBefore>
              <slot name="contentBefore" />
            </template>

            <template #empty>
              <slot name="empty">
                <span v-if="allowCreate">No tag found, create now</span>
              </slot>
            </template>

            <AntSkeleton
              :visible="skeleton"
              rounded
              :grouped="skeletonGrouped"
              class="w-full"
            >
              <div
                :class="[inputContainerClasses, { 'cursor-pointer': !disabled && !readonly }]"
                class="w-full"
                @click="handleContainerClick"
              >
                <div
                  class="flex flex-wrap gap-2 items-center w-full"
                  :class="{ 'overflow-y-auto': !!maxTagsHeight }"
                  :style="maxTagsHeight ? { maxHeight: maxTagsHeight } : {}"
                >
                  <AntTag
                    v-for="(tag, index) in _modelValue"
                    :key="`tag-input-tag-${index}`"
                    :size="AntTagSize.xs3"
                    :state="state as unknown as TagState"
                    :dismiss="!readonly"
                    @mousedown.prevent
                    @click.stop
                    @close="removeTag(tag)"
                  >
                    <span :class="{ 'line-through': mergedAllOptions.find((option: SelectOption) => option.value === tag)?.isDeleted }">
                      {{ mergedAllOptions.find((option: SelectOption) => option.value === tag)?.label ?? tag }}
                    </span>
                  </AntTag>

                  <div class="flex-1 flex items-center min-w-[60px] gap-1.5">
                    <AntIcon
                      :icon="icon"
                      :size="size === AntTagInputSize.sm ? IconSize.xs : IconSize.sm"
                      class="shrink-0"
                    />

                    <input
                      ref="internalInputRef"
                      v-model="tagInput"
                      type="text"
                      :placeholder="placeholder"
                      :class="inputClasses"
                      :disabled="disabled"
                      :readonly="readonly"
                      @click.stop="changeFocus"
                      @focus="changeFocus"
                      @keydown="onKeyDownInput"
                      @keydown.delete="removeLastTag"
                      @keydown.enter.prevent="handleEnter"
                      @keydown.esc.prevent="closeDropdown"
                      @blur="onBlur"
                    >
                  </div>
                </div>
              </div>
            </AntSkeleton>
          </AntSelectMenu>
        </div>

        <AntButton
          v-if="_isNullableActive"
          data-e2e="clear-button"
          :icon-left="faMultiply"
          :state="state as unknown as State"
          :grouped="[Grouped.left, Grouped.center].some((item) => item === grouped) ? Grouped.center : Grouped.right"
          :size="size as any"
          :skeleton="skeleton"
          :disabled="disabled"
          @mousedown.prevent
          @click="onClickRemoveButton"
        />
      </div>
    </AntField>
  </div>
</template>
