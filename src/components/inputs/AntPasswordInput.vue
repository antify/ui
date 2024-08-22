<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue';
import AntField from '../forms/AntField.vue';
import AntBaseInput from './Elements/AntBaseInput.vue';
import AntIcon from '../AntIcon.vue';
import {Size} from '../../enums/Size.enum';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {useVModel} from '@vueuse/core';
import {InputState} from '../../enums';
import {BaseInputType} from './Elements/__types';
import {handleEnumValidation} from '../../handler';
import {IconSize} from '../__types/AntIcon.types';

defineOptions({inheritAttrs: false});

const props = withDefaults(defineProps<{
  modelValue: string | null;
  label?: string;
  placeholder?: string;
  description?: string;
  size?: Size;
  state?: InputState;
  disabled?: boolean;
  skeleton?: boolean;
  messages?: string[];
}>(), {
  state: InputState.base,
  disabled: false,
  skeleton: false,
  size: Size.md,
  messages: () => []
});
const emit = defineEmits(['update:modelValue', 'validate']);
const _modelValue = useVModel(props, 'modelValue', emit);
const isVisible = ref(false);
const iconSize = computed(() => {
  if (props.size === Size.xs2 || props.size === Size.xs) {
    return IconSize.xs;
  }

  return IconSize.sm;
});
const iconColor = computed(() => {
  switch (props.state) {
    case InputState.info:
      return 'text-info-700';
    case InputState.success:
      return 'text-success-700';
    case InputState.warning:
      return 'text-warning-700';
    case InputState.danger:
      return 'text-danger-700';
    default:
      return 'text-neutral-500';
  }
});

onMounted(() => {
  handleEnumValidation(props.state, InputState, 'state');
  handleEnumValidation(props.size, Size, 'size');
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
  >
    <div class="flex relative">
      <AntBaseInput
        v-model="_modelValue"
        :type="isVisible ? BaseInputType.text : BaseInputType.password"
        :state="state"
        :size="size"
        :skeleton="skeleton"
        :disabled="disabled"
        :placeholder="placeholder || label"
        :show-icon="false"
        v-bind="$attrs"
        @validate="val => $emit('validate', val)"
      >
        <template #icon-right>
          <AntIcon
            v-if="!isVisible"
            class="cursor-pointer"
            :icon="faEye"
            :color="iconColor"
            :size="iconSize"
            @click="() => isVisible = !isVisible"
          />

          <AntIcon
            v-else
            class="cursor-pointer"
            :icon="faEyeSlash"
            :color="iconColor"
            @click="() => isVisible = !isVisible"
          />
        </template>
      </AntBaseInput>
    </div>
  </AntField>
</template>
