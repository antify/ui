<script setup lang="ts">
import AntField from '../../forms/AntField.vue';
import AntButton from '../../AntButton.vue';
import {
  faMultiply,
} from '@fortawesome/free-solid-svg-icons';
import AntSkeleton from '../../AntSkeleton.vue';
import {
  Grouped, InputState, Size, State,
} from '../../../enums';
import {
  computed, nextTick, onMounted, ref, watch,
} from 'vue';
import Color from './Color.vue';
import AntDropdown from '../../AntDropdown.vue';
import ColorSelection from './ColorSelection.vue';
import {
  ColorButtonSize,
} from './AntColorInput.types';

const emit = defineEmits([
  'update:modelValue',
  'validate',
  'blur',
]);
const props = withDefaults(defineProps<{
  modelValue: string | null;
  options: string[];
  label?: string;
  description?: string;
  skeleton?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  state?: InputState;
  size?: Size;
  colorSize?: ColorButtonSize;
  messages?: string[];
  nullable?: boolean;
  colorsPerRow?: number;
  dropdownWrapperClass?: string | Record<string, boolean>;
}>(), {
  state: InputState.base,
  size: Size.md,
  colorSize: ColorButtonSize.md,
  messages: () => [],
  nullable: false,
  colorsPerRow: 4,
});
const _value = computed({
  get() {
    const found = props.options.find((option: string) => option === props.modelValue);

    if (!found) {
      return props.options[0];
    }

    return found;
  },
  set(val: string) {
    emit('update:modelValue', val);
  },
});
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);
const containerClasses = computed(() => {
  const classes: {
    [key: string]: boolean;
  } = {
    'flex relative w-fit ring-primary/25 rounded-md outline-hidden': true,
  };
  const colorVariant = {
    [InputState.base]: 'focus:ring-primary-200',
    [InputState.danger]: 'focus:ring-danger-200',
    [InputState.info]: 'focus:ring-info-200',
    [InputState.success]: 'focus:ring-success-200',
    [InputState.warning]: 'focus:ring-warning-200',
  };

  classes[colorVariant[props.state]] = true;

  return classes;
});
const hasRemoveButton = computed<boolean>(() => {
  if (props.nullable) {
    return props.modelValue !== null;
  }

  return false;
});
const itemClasses = computed(() => {
  const classes: {
    [key: string]: boolean;
  } = {
    'relative outline outline-1 -outline-offset-1 rounded-l-md cursor-pointer': true,
    'focus:ring-2': (props.size === Size.xs2 || props.size === Size.xs || props.size === Size.sm) && !hasInputState.value,
    'focus:ring-4': (props.size === Size.md || props.size === Size.lg) && !hasInputState.value,
    'rounded-r-md': !hasRemoveButton.value,
    'p-1': true,
    invisible: props.skeleton,
    'opacity-50 cursor-not-allowed': props.disabled,
  };

  const colorVariant = {
    [InputState.base]: 'outline-base-300 bg-white focus:ring-primary-200',
    [InputState.success]: 'outline-success-500 bg-success-100 focus:ring-success-200',
    [InputState.info]: 'outline-info-500 bg-info-100 focus:ring-info-200',
    [InputState.warning]: 'outline-warning-500 bg-warning-100 focus:ring-warning-200',
    [InputState.danger]: 'outline-danger-500  bg-danger-100 focus:ring-danger-200',
  };

  classes[colorVariant[props.state]] = true;

  return classes;
});
const inputButtonSize = computed(() => {
  switch(props.size) {
    case Size.xs2:
      return ColorButtonSize.xs4;
    case Size.xs:
      return ColorButtonSize.xs3;
    case Size.sm:
      return ColorButtonSize.xs2;
    case Size.md:
      return ColorButtonSize.xs;
    default:
      return ColorButtonSize.sm;
  }
});
const showDropdown = ref<boolean>(false);
const itemRef = ref<HTMLDivElement | null>(null);

/**
 * Validate default value if given after delayed data fetching.
 */
watch(() => props.skeleton, (val) => {
  if (!val && props.modelValue !== null) {
    emit('validate', props.modelValue);
  }
});
watch(_value, () => {
  if (props.messages.length > 0) {
    emit('validate', props.modelValue);
  }
});

function onBlur(e: FocusEvent) {
  emit('validate', props.modelValue);
  emit('blur', e);
}

function onColorSelect(val: string | null) {
  emit('update:modelValue', val);
  nextTick(() => showDropdown.value = false);
  itemRef.value?.focus();
}

function onClick() {
  if (props.readonly || props.disabled) {
    return;
  }

  showDropdown.value = true;
}

function onKeyDown(e: KeyboardEvent) {
  if (props.readonly || props.disabled) {
    return;
  }

  if (e.key === 'Enter') {
    showDropdown.value = true;
  }
}

onMounted(() => {
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
    :messages="messages"
    label-for="noop"
    data-e2e="color-input"
  >
    <AntDropdown
      v-model:show-dropdown="showDropdown"
      :content-padding="false"
    >
      <div
        :class="containerClasses"
      >
        <AntSkeleton
          :visible="skeleton"
          :grouped="hasRemoveButton ? Grouped.left : Grouped.none"
          rounded
        >
          <div
            ref="itemRef"
            :class="itemClasses"
            :tabindex="disabled || readonly ? -1 : 0"
            @click="onClick"
            @keydown="onKeyDown"
            @blur="onBlur"
          >
            <Color
              :value="modelValue"
              :size="inputButtonSize"
              readonly
            />
          </div>
        </AntSkeleton>

        <AntButton
          v-if="hasRemoveButton"
          :icon-left="faMultiply"
          :grouped="Grouped.right"
          :state="state as unknown as State"
          :size="size"
          :skeleton="skeleton"
          :readonly="readonly"
          :disabled="disabled"
          @click="() => emit('update:modelValue', null)"
          @blur="onBlur"
        />
      </div>

      <template #content>
        <div :class="dropdownWrapperClass">
          <ColorSelection
            :value="modelValue"
            :colors="props.options"
            :colors-per-row="colorsPerRow"
            :color-size="colorSize"
            @select="onColorSelect"
          />
        </div>
      </template>
    </AntDropdown>
  </AntField>
</template>
