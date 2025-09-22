<script lang="ts" setup>
import {
  computed, onMounted, ref,
} from 'vue';
import AntBaseInput from './Elements/AntBaseInput.vue';
import {
  Size,
} from '../../enums/Size.enum';
import {
  handleEnumValidation,
} from '../../handler';
import {
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import {
  BaseInputType,
} from './Elements/__types';
import AntField from '../forms/AntField.vue';
import {
  useVModel,
} from '@vueuse/core';

const emit = defineEmits([
  'update:modelValue',
  'update:inputRef',
]);
const props = withDefaults(defineProps<{
  modelValue: string | null;
  label?: string;
  placeholder?: string;
  description?: string;
  size?: Size;
  disabled?: boolean;
  readonly?: boolean;
  skeleton?: boolean;
  inputTimeout?: number;
  query?: string;
  inputRef?: null | HTMLInputElement;
}>(), {
  disabled: false,
  inputRef: null,
  skeleton: false,
  readonly: false,
  size: Size.md,
  inputTimeout: 300,
  placeholder: 'Search',
});

const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

// TODO:: implement query prop. Find a way to use vue router in Storybook.
const _value = computed<string | null>({
  get: () => props.modelValue,
  set: (val: string | null) => {
    if (val === null) {
      return emit('update:modelValue', val);
    }

    if (timeout.value) {
      clearTimeout(timeout.value);
    }

    timeout.value = setTimeout(() => {
      emit('update:modelValue', val);
    }, props.inputTimeout);
  },
});
const _inputRef = useVModel(props, 'inputRef', emit);

onMounted(() => handleEnumValidation(props.size, Size, 'size'));
</script>

<template>
  <AntField
    :label="label"
    :size="size"
    :skeleton="skeleton"
    :description="description"
    data-e2e="search"
  >
    <AntBaseInput
      v-model="_value"
      v-model:input-ref="_inputRef"
      :type="BaseInputType.search"
      :size="size"
      :skeleton="skeleton"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :icon-left="faSearch"
      nullable
      v-bind="$attrs"
    />
  </AntField>
</template>
