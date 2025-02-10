<script setup lang="ts">
import AntField from '../forms/AntField.vue';
import AntButton from '../buttons/AntButton.vue';
import {
  faChevronLeft, faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import AntSkeleton from '../AntSkeleton.vue';
import {
  type SwitcherOption,
} from './__types/AntSwitcher.types';
import {
  State, Grouped, InputState, Size,
} from '../../enums';
import {
  computed, onMounted, watch,
} from 'vue';

const emit = defineEmits([
  'update:modelValue',
  'validate',
  'blur',
]);
const props = withDefaults(defineProps<{
  modelValue: string | null;
  options: string[] | SwitcherOption[];
  label?: string;
  description?: string;
  skeleton?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  state?: InputState;
  size?: Size;
  messages?: string[];
}>(), {
  state: InputState.base,
  size: Size.md,
  messages: () => [],
});
const _value = computed({
  get() {
    const found = props.options.find((option: string | SwitcherOption) => typeof option === 'string' ? option === props.modelValue : option.value === props.modelValue);

    if (!found) {
      return props.options[0];
    }

    return found;
  },
  set(val: string | SwitcherOption) {
    emit('update:modelValue', typeof val === 'string' ? val : val.value);
  },
});
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);
const containerClasses = computed(() => {
  const classes: {
    [key: string]: boolean;
  } = {
    'flex relative ring-primary/25 rounded-md outline-hidden': true,
    'focus-within:ring-2': (props.size === Size.xs2 || props.size === Size.xs || props.size === Size.sm) && !hasInputState.value,
    'focus-within:ring-4': (props.size === Size.md || props.size === Size.lg) && !hasInputState.value,
  };
  const colorVariant = {
    [InputState.base]: 'focus-within:ring-primary-200',
    [InputState.danger]: 'focus-within:ring-danger-200',
    [InputState.info]: 'focus-within:ring-info-200',
    [InputState.success]: 'focus-within:ring-success-200',
    [InputState.warning]: 'focus-within:ring-warning-200',
  };

  classes[colorVariant[props.state]] = true;

  return classes;
});
const itemClasses = computed(() => {
  const classes: {
    [key: string]: boolean;
  } = {
    'grow text-center text-black relative outline outline-1 -outline-offset-1': true,
    'p-1 text-xs ': props.size === Size.xs2,
    'p-1.5 text-xs ': props.size === Size.xs,
    'p-1.5 text-sm ': props.size === Size.sm,
    'p-2 text-sm ': props.size === Size.md,
    'p-2.5 text-sm ': props.size === Size.lg,
    invisible: props.skeleton,
    'opacity-50 cursor-not-allowed': props.disabled,
  };

  const colorVariant = {
    [InputState.danger]: 'outline-danger-500 bg-danger-100',
    [InputState.base]: 'outline-base-300 bg-white',
    [InputState.info]: 'outline-info-500 bg-info-100',
    [InputState.success]: 'outline-success-500 bg-success-100',
    [InputState.warning]: 'outline-warning-500 bg-warning-100',
  };

  classes[colorVariant[props.state]] = true;

  return classes;
});

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

function prevOption() {
  if (props.readonly || props.disabled) {
    return;
  }

  const index = props.options.findIndex((option) => option === _value.value);

  if (index !== -1 && props.options[index - 1]) {
    _value.value = props.options[index - 1];
  } else {
    _value.value = props.options[props.options.length - 1];
  }
}

function nextOption() {
  if (props.readonly || props.disabled) {
    return;
  }

  const index = props.options.findIndex((option) => option === _value.value);

  if (index !== -1 && props.options[index + 1]) {
    _value.value = props.options[index + 1];
  } else {
    _value.value = props.options[0];
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
  >
    <div
      :class="containerClasses"
      tabindex="0"
      @blur="onBlur"
      @keydown.left.prevent="prevOption()"
      @keydown.right.prevent="nextOption()"
    >
      <AntButton
        :icon-left="faChevronLeft"
        :grouped="Grouped.left"
        :no-focus="true"
        :state="state as unknown as State"
        :size="size"
        :skeleton="skeleton"
        :readonly="readonly"
        :disabled="disabled"
        @click="prevOption"
        @blur="onBlur"
      />
      <div class="grow relative">
        <div :class="itemClasses">
          {{ typeof _value === 'string' ? _value : _value.label }}
        </div>

        <AntSkeleton
          v-if="skeleton"
          absolute
          :grouped="Grouped.center"
          rounded
        />
      </div>

      <AntButton
        :icon-left="faChevronRight"
        :grouped="Grouped.right"
        :no-focus="true"
        :state="state as unknown as State"
        :size="size"
        :skeleton="skeleton"
        :readonly="readonly"
        :disabled="disabled"
        @click="nextOption"
        @blur="onBlur"
      />
    </div>
  </AntField>
</template>
