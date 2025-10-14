<script lang="ts" setup>
import {
  computed, onMounted, useSlots,
} from 'vue';
import {
  handleEnumValidation,
} from '../handler';
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import AntIcon from './AntIcon.vue';
import AntButton from './AntButton.vue';
import {
  InputState, State,
} from '../enums';
import {
  IconSize,
} from './__types/AntIcon.types';

const props = withDefaults(defineProps<{
  title?: string;
  state?: InputState;
  showUndo?: boolean;
  icon?: boolean;
}>(), {
  state: InputState.base,
  showUndo: false,
  icon: true,
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
    [InputState.base]: 'bg-base-300 text-base-300-font',
    [InputState.danger]: 'bg-danger-500 text-danger-500-font',
    [InputState.info]: 'bg-info-500 text-info-500-font',
    [InputState.success]: 'bg-success-500 text-success-500-font',
    [InputState.warning]: 'bg-warning-500 text-warning-500-font',
  };

  return {
    'inline-flex flex-col gap-2.5 rounded-md p-2.5 transition-colors shadow-md': true,
    [variants[props.state]]: true,
  };
});
const hasDefaultSlot = computed(() => useSlots()['default'] || false);
const iconColor = computed(() => {
  const variants = {
    [InputState.base]: 'text-base-300-font',
    [InputState.danger]: 'text-danger-500-font',
    [InputState.info]: 'text-info-500-font',
    [InputState.success]: 'text-success-500-font',
    [InputState.warning]: 'text-warning-500-font',
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
    <div class="inline-flex items-start justify-between min-w-[260px] w-content gap-2.5">
      <div class="inline-flex items-start gap-2.5">
        <AntIcon
          v-if="icon"
          :icon="_icon"
          :size="IconSize.md"
          :color="iconColor"
        />

        <div
          class="whitespace-pre"
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
        :size="IconSize.md"
        @click="() => $emit('close')"
      />
    </div>

    <div v-if="hasDefaultSlot">
      <slot />
    </div>

    <div
      v-if="showUndo"
      class="flex justify-end"
    >
      <AntButton
        :state="props.state as unknown as State"
        @click="() => $emit('undo')"
      >
        undo
      </AntButton>
    </div>
  </div>
</template>
