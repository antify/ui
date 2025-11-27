<script setup lang="ts">
import {
  AntField,
} from './Elements';
import type {
  SelectOption,
} from './__types';
import {
  Grouped, InputState, Size,
} from '../../enums';
import {
  useVModel,
} from '@vueuse/core';
import {
  faChevronRight, type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import {
  computed, onMounted, type Ref, ref, watch,
} from 'vue';
import AntTag from '../AntTag.vue';
import AntIcon from '../AntIcon.vue';
import {
  AntTagSize, IconSize,
} from '../__types';
import AntSelectMenu from './Elements/AntSelectMenu.vue';
import AntSkeleton from '../AntSkeleton.vue';
import {
  vOnClickOutside,
} from '@vueuse/components';
import {
  AntTagInputSize,
} from './__types/AntTagInput.types';
import type {
  TagState,
} from '../__types/AntTag.types';

const emit = defineEmits([
  'update:modelValue',
  'blur',
  'validate',
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
});

const _modelValue: Ref<(string | number)[] | null> = useVModel(props, 'modelValue', emit);
const _skeleton = useVModel(props, 'skeleton', emit);
const dropDownOpen = ref(false);
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);
const focusedDropDownItem: Ref<string | number | null> = ref(null);
const tagInput = ref('');
const inputRef: Ref<HTMLElement | null> = ref(null);
const inputContainerClasses = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'outline-base-300 focus-within:outline-base-300 focus-within:ring-primary-200 bg-white',
    [InputState.danger]: 'outline-danger-500 focus-within:outline-danger-500 focus-within:ring-danger-200 bg-danger-100',
    [InputState.info]: 'outline-info-500 focus-within:outline-info-500 focus-within:ring-info-200 bg-info-100',
    [InputState.success]: 'outline-success-500 focus-within:outline-success-500 focus-within:ring-success-200 bg-success-100',
    [InputState.warning]: 'outline-warning-500 focus-within:outline-warning-500 focus-within:ring-warning-200 bg-warning-100',
  };

  return {
    'flex items-center flex-wrap': true,
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
    'outline-0 bg-transparent w-full': true,
    'opacity-50 cursor-not-allowed': props.disabled,
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
const filteredOptions = computed(() => {
  return props.options.filter(option => {
    // Remove all elements that are in modelValue from the filtered options
    if (_modelValue.value && !props.allowDuplicates) {
      return !_modelValue.value?.includes(option.value) && !option.deleted;
    }

    return option.label.toLowerCase().includes(tagInput.value.toLowerCase()) && !option.deleted;
  });
});

function onClickOutside() {
  if (!dropDownOpen.value) {
    return;
  }
  // dropDownOpen.value = false;
}

async function checkCreateTag(item: string): Promise<void> {
  if (props.allowCreate && focusedDropDownItem.value) {
    // If allowCreate is active but a item is focused inside the dropdown do nothing here.
    return;
  }

  if (item && props.allowCreate && props.createCallback) {
    const newOption: SelectOption = await props.createCallback(item);

    addTag(newOption.value);
  }
}

function addTagFromOptions(item: string | number) {
  if (props.allowCreate && !focusedDropDownItem.value) {
    // If allowCreate is active we don't need to add it here.
    return;
  }

  const option = props.options?.find(option => option.value === item);

  if (option) {
    addTag(item);

    if (props.autoCloseAfterSelection) {
      dropDownOpen.value = false;
    }
  }
}

function addTag(tagValue: string | number): void {
  if (!props.allowDuplicates && _modelValue.value?.includes(tagValue) || !tagValue) {
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
  if (tagInput.value === '' && Array.isArray(_modelValue.value) && _modelValue.value.length > 0) {
    _modelValue.value = _modelValue.value.filter((element) => element !== _modelValue.value?.pop());
  }
}

function removeTag(tag: string | number) {
  if (_modelValue.value && !props.disabled && !props.skeleton && !props.readonly) {
    _modelValue.value = _modelValue.value.filter((element) => element !== tag);
  }
}

function changeFocus() {
  dropDownOpen.value = true;
}

function closeDropdown() {
  dropDownOpen.value = false;
}

function onBlur(e: FocusEvent) {
  emit('validate', props.modelValue);
  emit('blur', e);
}

/**
 * Validate default value if given after delayed data fetching.
 */
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

onMounted(() => {
  /**
   * Validate default value without delayed data fetching.
   */
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
      data-e2e="tag-input"
    >
      <AntSkeleton
        :visible="skeleton"
        rounded
        :grouped="skeletonGrouped"
        class="w-full"
      >
        <div
          v-on-click-outside="onClickOutside"
          :class="inputContainerClasses"
          class="w-full flex items-center"
        >
          <div
            class="flex flex-wrap gap-2.5 items-center"
          >
            <AntTag
              v-for="(tag, index) in _modelValue"
              :key="`tag-input-tag-${index}`"
              :size="AntTagSize.xs3"
              :state="state as unknown as TagState"
              :dismiss="!readonly"
              @close="removeTag(tag)"
            >
              <span
                :class="{
                  'line-through': options.find((option: SelectOption) => option.value === tag)?.deleted
                }"
              >
                {{ options.find((option: SelectOption) => option.value === tag)?.label }}
              </span>
            </AntTag>
          </div>

          <!-- Input -->
          <div class="flex items-center w-32 shrink grow">
            <AntIcon
              :icon="icon"
              :size="size === AntTagInputSize.sm ? IconSize.xs : IconSize.sm"
            />

            <input
              ref="inputRef"
              v-model="tagInput"
              type="text"
              :placeholder="placeholder"
              :class="inputClasses"
              :disabled="disabled"
              :readonly="readonly"
              @click="changeFocus"
              @focus="changeFocus"
              @keydown.delete="removeLastTag"
              @keydown.enter.prevent="checkCreateTag(tagInput)"
              @keydown.esc.prevent="closeDropdown"
              @blur="onBlur"
            >
          </div>
        </div>

        <AntSelectMenu
          v-if="!disabled && !readonly"
          v-model:focused="focusedDropDownItem"
          v-model:open="dropDownOpen"
          :model-value="null"
          :auto-select-first-on-open="!allowCreate"
          :options="filteredOptions"
          :input-ref="inputRef"
          :size="size as unknown as Size"
          :state="state"
          :focus-on-open="false"
          :close-on-select-item="false"
          @select-element="addTagFromOptions"
        >
          <template #empty>
            <span v-if="allowCreate">
              No tag found, create now
            </span>
          </template>
        </AntSelectMenu>
      </AntSkeleton>
    </AntField>
  </div>
</template>
