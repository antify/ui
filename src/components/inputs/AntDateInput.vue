<script lang="ts" setup>
import {
  computed, onMounted, ref,
} from 'vue';
import AntField from '../forms/AntField.vue';
import AntBaseInput from './Elements/AntBaseInput.vue';
import AntButton from '../AntButton.vue';
import AntIcon from '../AntIcon.vue';
import {
  Size,
} from '../../enums/Size.enum';
import {
  useVModel,
} from '@vueuse/core';
import {
  Grouped, InputState, State,
} from '../../enums';
import {
  BaseInputType,
} from './Elements/__types';
import {
  handleEnumValidation,
} from '../../handler';
import {
  AntDateInputTypes,
} from './__types/AntDateInput.types';
import {
  faCalendar, faClock, faMultiply,
} from '@fortawesome/free-solid-svg-icons';
import {
  IconSize,
} from '../__types/AntIcon.types';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<{
  modelValue: string | null;
  label?: string;
  description?: string;
  size?: Size;
  type?: AntDateInputTypes;
  state?: InputState;
  disabled?: boolean;
  readonly?: boolean;
  skeleton?: boolean;
  messages?: string[];
  min?: string;
  max?: string;
  nullable?: boolean;
}>(), {
  state: InputState.base,
  type: AntDateInputTypes.date,
  disabled: false,
  readonly: false,
  skeleton: false,
  size: Size.md,
  messages: () => [],
  nullable: false,
});
const emit = defineEmits([
  'update:modelValue',
  'validate',
]);
const _modelValue = useVModel(props, 'modelValue', emit);
const inputRef = ref<null | HTMLInputElement>(null);
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
      return 'text-for-white-bg-font';
  }
});
const iconSize = computed(() => props.size === Size.xs || props.size === Size.xs2 ? IconSize.xs : IconSize.sm);
const _icon = computed(() => props.type === AntDateInputTypes.time ? faClock : faCalendar);
const _nullable = computed(() => props.nullable && props.modelValue);

onMounted(() => {
  handleEnumValidation(props.state, InputState, 'state');
  handleEnumValidation(props.size, Size, 'size');
});

function onClickCalendar() {
  if (!props.disabled && !props.readonly) {
    inputRef.value?.showPicker();
  } else {
    return;
  }
}
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
    <div class="flex">
      <AntBaseInput
        v-model="_modelValue"
        v-model:input-ref="inputRef"
        :type="type as unknown as BaseInputType"
        :state="state"
        :size="size"
        :skeleton="skeleton"
        :disabled="disabled"
        :readonly="readonly"
        :show-icon="false"
        :min="min"
        :max="max"
        :grouped="_nullable ? Grouped.left : Grouped.none"
        v-bind="$attrs"
        @validate="val => $emit('validate', val)"
      >
        <template #icon-right>
          <AntIcon
            :icon="_icon"
            :color="iconColor"
            :size="iconSize"
            :class="{'cursor-pointer': !disabled && !readonly, 'opacity-50': disabled}"
            @click="onClickCalendar"
          />
        </template>
      </AntBaseInput>

      <AntButton
        v-if="_nullable"
        :disabled="disabled"
        :icon-left="faMultiply"
        :grouped="Grouped.right"
        :state="state as unknown as State"
        :skeleton="skeleton"
        :size="size"
        @click="_modelValue = null"
      />
    </div>
  </AntField>
</template>
