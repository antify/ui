<script lang="ts" setup>
import {
  onMounted,
} from 'vue';
import AntField from '../forms/AntField.vue';
import AntBaseInput from './Elements/AntBaseInput.vue';
import {
  Size,
} from '../../enums/Size.enum';
import {
  TextInputType,
} from './__types/AntTextInput.types';
import {
  handleEnumValidation,
} from '../../handler';
import {
  useVModel,
} from '@vueuse/core';
import {
  InputState,
} from '../../enums';
import {
  BaseInputType,
} from './Elements/__types';

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits([
  'update:modelValue',
  'update:skeleton',
  'validate',
]);
const props = withDefaults(defineProps<{
  modelValue: string | null;
  label?: string;
  placeholder?: string;
  description?: string;
  size?: Size;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  skeleton?: boolean;
  type?: TextInputType;
  limiter?: boolean;
  max?: number;
  messages?: string[];
}>(), {
  state: InputState.base,
  disabled: false,
  readonly: false,
  skeleton: false,
  size: Size.md,
  type: TextInputType.text,
  limiter: false,
  messages: () => [],
});

const _value = useVModel(props, 'modelValue', emit);

onMounted(() => {
  handleEnumValidation(props.size, Size, 'size');
  handleEnumValidation(props.state, InputState, 'state');
  handleEnumValidation(props.type, TextInputType, 'type');
});
</script>

<template>
  <AntField
    :label="label"
    :size="size"
    :skeleton="skeleton"
    :description="description"
    :state="state"
    :limiter-max-value="limiter && max !== undefined ? max : undefined"
    :limiter-value="limiter ? _value?.length : undefined"
    :messages="messages"
  >
    <AntBaseInput
      v-model="_value"
      :type="type as unknown as BaseInputType"
      wrapper-class="grow"
      :state="state"
      :size="size"
      :skeleton="skeleton"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder !== undefined ? placeholder : label"
      :show-icon="true"
      v-bind="$attrs"
      @validate="val => $emit('validate', val)"
    />
  </AntField>
</template>
