<script setup lang="ts">
import AntField from '../../forms/AntField.vue';
import AntButton from '../../buttons/AntButton.vue';
import {
  faMultiply,
} from '@fortawesome/free-solid-svg-icons';
import AntSkeleton from '../../AntSkeleton.vue';
import {
  Size,
  State,
  Grouped,
  InputState,
} from '../../../enums';
import {
  ref,
  watch,
  computed,
  onMounted, nextTick,
} from 'vue';
import Color from './Color.vue';
import AntDropdown from '../../AntDropdown.vue';
import ColorSelection from './ColorSelection.vue';
import type {
  ColorInputSize,
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
  messages?: string[];
  nullable?: boolean;
}>(), {
  state: InputState.base,
  size: Size.md,
  messages: () => [],
  nullable: false,
});
const _value = computed({
  get() {
    const found = props.options.find((option: string | ColorOption) => typeof option === 'string' ? option === props.modelValue : option.value === props.modelValue);

    if (!found) {
      return props.options[0];
    }

    return found;
  },
  set(val: string | ColorOption) {
    emit('update:modelValue', typeof val === 'string' ? val : val.value);
  },
});
const hasInputState = computed(() => props.skeleton || props.readonly || props.disabled);
const containerClasses = computed(() => {
  const classes: {
    [key: string]: boolean;
  } = {
    'flex relative w-fit ring-primary/25 rounded-md outline-hidden': true,
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
    'rounded-r-md': !hasRemoveButton.value,
    'p-1': props.size === Size.xs2,
    'p-1.5': props.size === Size.xs || props.size === Size.sm,
    'p-2': props.size === Size.md,
    'p-2.5': props.size === Size.lg,
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
const showDropdown = ref<boolean>(false);

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
    <AntDropdown
      v-model:show-dropdown="showDropdown"
      :content-padding="false"
    >
      <div
        :class="containerClasses"
        tabindex="0"
        @blur="onBlur"
      >
        <div class="relative">
          <div :class="itemClasses">
            <Color
              :value="modelValue"
              :size="size as unknown as ColorInputSize"
              @click="showDropdown = true"
            />
          </div>

          <AntSkeleton
            v-if="skeleton"
            absolute
            :grouped="hasRemoveButton ? Grouped.left : Grouped.none"
            rounded
          />
        </div>

        <AntButton
          v-if="hasRemoveButton"
          :icon-left="faMultiply"
          :grouped="Grouped.right"
          :no-focus="true"
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
        <ColorSelection
          :value="modelValue"
          :colors="props.options"
          @select="(val) => {
            $emit('update:modelValue', val);
            nextTick(() => showDropdown = false);
          }"
        />
      </template>
    </AntDropdown>
  </AntField>
</template>
