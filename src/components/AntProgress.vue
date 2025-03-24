<script setup lang="ts">
import {
  computed,
} from 'vue';
import {
  State,
} from '../enums/State.enum';

const props = withDefaults(defineProps<{
  /**
   * Represent the value in percentage
   * Should be a number from 0 to 100
   */
  progress: number | null;
  /**
   * Takes string with height and the value e.g. '16px' or '1rem'
   */
  height: string;
  state?: State;
}>(),{
  state: State.primary,
});

const progressWidth = computed(() => {
  if (!props.progress || props.progress <= 0) {
    return '0%';
  } else if (props.progress && props.progress <= 100) {
    return `${props.progress}%`;
  } else {
    return '100%';
  }
});

const progressState = computed(() => {
  const variants: Record<State, string> = {
    [State.base]: 'bg-base-300',
    [State.primary]: 'bg-primary-500',
    [State.secondary]: 'bg-secondary-500',
    [State.info]: 'bg-info-500',
    [State.success]: 'bg-success-500',
    [State.warning]: 'bg-warning-500',
    [State.danger]: 'bg-danger-500',
  };

  return {
    [variants[props.state]]: true,
  };
});
</script>

<template>
  <div
    class="relative bg-base-100 w-full rounded-md"
    :style="{ height: height }"
  >
    <div
      class="absolute rounded-md"
      :class="progressState"
      :style="{ width: progressWidth, height: height }"
    />
  </div>
</template>
