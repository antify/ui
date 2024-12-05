<script lang="ts" setup>
import {computed, onMounted, useSlots} from 'vue';
import {handleEnumValidation} from '../handler';
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import AntIcon from './AntIcon.vue';
import AntButton from './buttons/AntButton.vue';
import {State, InputState, Size} from '../enums';
import {IconSize} from './__types/AntIcon.types';

const props = withDefaults(defineProps<{
  title?: string,
  state?: InputState,
  showUndo?: boolean,
  icon?: boolean
}>(), {
  state: InputState.base,
  showUndo: false,
  icon: true
});

const icons = {
  [InputState.base]: faInfoCircle,
  [InputState.info]: faInfoCircle,
  [InputState.danger]: faExclamationCircle,
  [InputState.warning]: faExclamationTriangle,
  [InputState.success]: faCheckCircle,
};

const _icon = computed(() => icons[props.state]);
const classes = computed(() => {
  const variants: Record<InputState, string> = {
    [InputState.base]: 'bg-base-100 border-base-500 text-base-500',
    [InputState.danger]: 'bg-danger-100 border-danger-500 text-danger-500',
    [InputState.info]: 'bg-info-100 border-info-500 text-info-500',
    [InputState.success]: 'bg-success-100 border-success-500 text-success-500',
    [InputState.warning]: 'bg-warning-100 border-warning-500 text-warning-500',
  };

  return {
    'inline-flex flex-col gap-2 rounded-md p-2 border transition-colors shadow-md': true,
    [variants[props.state]]: true,
  };
});
const hasDefaultSlot = computed(() => useSlots()['default'] || false);
const iconColor = computed(() => {
  const variants = {
    [InputState.base]: 'text-base-100-font',
    [InputState.danger]: 'text-danger-500',
    [InputState.info]: 'text-info-500',
    [InputState.success]: 'text-success-500',
    [InputState.warning]: 'text-warning-500',
  };

  return variants[props.state];
});

onMounted(() => {
  handleEnumValidation(props.state, InputState, 'state');
});
</script>

<template>
  <div
    :class="classes"
    data-e2e="toast"
    :data-e2e-state="props.state"
  >
    <div class="inline-flex items-center justify-between w-content gap-2">
      <div class="inline-flex items-center gap-2">
        <AntIcon
          v-if="icon"
          :icon="_icon"
          :color="iconColor"
          :size="IconSize.sm"
        />

        <div
          class="whitespace-pre text-sm"
          :class="{'font-semibold': hasDefaultSlot}"
        >
          <slot name="title">
            {{ title }}
          </slot>
        </div>
      </div>

      <AntIcon
        :icon="faXmark"
        class="cursor-pointer"
        :color="iconColor"
        @click="() => $emit('close')"
      />
    </div>

    <div v-if="hasDefaultSlot">
      <slot/>
    </div>

    <div
      v-if="showUndo"
      class="flex justify-end"
    >
      <AntButton
        :state="props.state as unknown as State"
        :size="Size.md"
        filled
        @click="() => $emit('undo')"
      >
        undo
      </AntButton>
    </div>
  </div>
</template>
